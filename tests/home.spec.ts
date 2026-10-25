import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage, serviços, vídeo e contato funcionam sem erros", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/");
  await expect(page).toHaveTitle(/Loomy/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("óbvio.");
  const services = page.locator("#servicos");
  await services.getByRole("button", { name: /Design/ }).click();
  await expect(services.getByRole("button", { name: /Design/ })).toHaveAttribute("aria-expanded", "true");
  await expect(services.getByRole("region", { name: /Design/ })).toBeVisible();
  await expect(services.getByRole("region", { name: /Produção/ })).toBeHidden();
  await services.getByRole("button", { name: /Marketing/ }).click();
  await expect(services.getByRole("region", { name: /Marketing/ })).toBeVisible();
  await services.getByRole("button", { name: /Marketing/ }).click();
  await expect(services.getByRole("region", { name: /Marketing/ })).toBeHidden();

  const play = page.getByRole("button", { name: "Ver vídeo: Por trás das ideias" });
  await play.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect.poll(() => page.locator("video").evaluate((video: HTMLVideoElement) => video.readyState)).toBeGreaterThanOrEqual(2);
  await expect.poll(() => page.locator("video").evaluate((video: HTMLVideoElement) => video.currentTime)).toBeGreaterThan(0);
  await expect(page.locator("video source")).toHaveAttribute("src", "/media/loomy-film.mp4");
  const media = await page.locator("video").evaluate((video: HTMLVideoElement) => ({ width: video.videoWidth, height: video.videoHeight, duration: video.duration, muted: video.muted }));
  expect(media.width).toBe(720);
  expect(media.height).toBe(1280);
  expect(media.duration).toBeGreaterThan(20);
  expect(media.duration).toBeLessThan(22);
  expect(media.muted).toBe(false);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(play).toBeFocused();
  await expect.poll(() => page.locator("video").evaluate((video: HTMLVideoElement) => video.paused)).toBe(true);

  const contact = page.locator("#contato").getByRole("link", { name: /Vamos conversar/ });
  await expect(contact).toHaveAttribute("href", "https://www.instagram.com/loomycomunica/");
  await expect(contact).toHaveAttribute("target", "_blank");
  expect(errors).toEqual([]);
});

test("logo cristal 3D gira por botão, teclado e arraste; efeitos podem ser pausados", async ({ page }, testInfo) => {
  test.setTimeout(45_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".brand-link img")).toHaveAttribute("src", "/media/loomy-crystal-small.webp");
  await page.getByRole("button",{name:"Explorar 3D",exact:true}).click();
  await expect(page.locator(".crystal-logo")).toHaveAttribute("data-status", "ready", {timeout:20_000});
  const canvas=page.locator(".crystal-canvas canvas");
  await expect(canvas).toBeVisible();
  await expect(canvas).toBeFocused();
  await page.emulateMedia({reducedMotion:"no-preference"});
  await page.getByRole("button",{name:"Pausar efeitos",exact:true}).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion","paused");
  await expect(page.locator(".hero-light")).toHaveCSS("animation-play-state","paused");
  async function settled() {
    let previous: Buffer | undefined;
    await expect.poll(async () => {
      const next=await canvas.screenshot();
      const equal=previous?.equals(next) ?? false;
      previous=next;
      return equal;
    },{intervals:[100,150,200]}).toBe(true);
  }
  await settled();
  const original=await canvas.screenshot();
  await page.getByRole("button",{name:"Girar logo",exact:true}).click();
  await expect.poll(async () => (await canvas.screenshot()).equals(original)).toBe(false);
  await canvas.focus();
  const beforeKey=await canvas.screenshot();
  await page.keyboard.press("ArrowRight");
  await expect.poll(async () => (await canvas.screenshot()).equals(beforeKey)).toBe(false);
  const bounds=await canvas.boundingBox();
  if (!bounds) throw new Error("Canvas missing");
  const beforeDrag=await canvas.screenshot();
  if (testInfo.project.name==="mobile") {
    const session=await page.context().newCDPSession(page);
    const x=bounds.x+bounds.width*.35,y=bounds.y+bounds.height*.5;
    await session.send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[{x,y}]});
    for (let step=1;step<=8;step++) await session.send("Input.dispatchTouchEvent",{type:"touchMove",touchPoints:[{x:x+step*12,y}]});
    await session.send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});
    await session.detach();
  } else {
    await page.mouse.move(bounds.x+bounds.width*.45,bounds.y+bounds.height*.45);
    await page.mouse.down();
    await page.mouse.move(bounds.x+bounds.width*.7,bounds.y+bounds.height*.5,{steps:12});
    await page.mouse.up();
  }
  await expect.poll(async () => (await canvas.screenshot()).equals(beforeDrag)).toBe(false);
  await page.getByRole("button",{name:"Restaurar posição da logo"}).click();
  await settled();
  await page.evaluate(() => window.scrollTo(0,0));
  await page.screenshot({path:`test-results/${testInfo.project.name}-crystal-3d-hero.png`});
  await page.getByRole("button",{name:"Ativar efeitos",exact:true}).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion","playing");
  await page.emulateMedia({reducedMotion:"reduce"});
  await expect(page.getByRole("button",{name:"Movimento reduzido"})).toBeDisabled();
});

test("logo continua disponível sem WebGL", async ({ page },testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Fallback compartilhado.");
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.addInitScript(() => {
    const getContext=HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext=function(this: HTMLCanvasElement,...args: Parameters<typeof getContext>) {
      if (String(args[0]).startsWith("webgl")) return null;
      return getContext.apply(this,args);
    } as typeof getContext;
  });
  await page.goto("/");
  await page.getByRole("button",{name:"Explorar 3D"}).click();
  await expect(page.locator(".crystal-logo")).toHaveAttribute("data-status","unavailable");
  await expect(page.locator(".crystal-fallback img")).toBeVisible();
  await expect(page.getByRole("heading",{level:1})).toBeVisible();
});

test("navegação leva às seções e menu mobile restaura o foco", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    const toggle = page.getByRole("button", { name: "Abrir menu" });
    await toggle.click();
    await expect(page.getByRole("navigation", { name: "Navegação mobile" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await toggle.click();
    await page.getByRole("navigation", { name: "Navegação mobile" }).getByRole("link", { name: "O que fazemos" }).click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  } else {
    await page.getByRole("navigation", { name: "Navegação principal" }).getByRole("link", { name: "O que fazemos" }).click();
  }
  await expect(page).toHaveURL(/#servicos$/);
  await expect(page.locator("#servicos")).toBeInViewport();
  await page.getByRole("link", { name: "Loomy, início", exact: true }).click();
  await expect(page).toHaveURL(/#inicio$/);
});

test("sem overflow, conteúdo legível com reduced motion e acessibilidade AA", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".manifesto-word").first()).toHaveCSS("opacity", "1");
  const widths = testInfo.project.name === "mobile" ? [320, 390, 767] : [768, 1024, 1440];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.setViewportSize(testInfo.project.name === "mobile" ? { width: 390, height: 844 } : { width: 1440, height: 1000 });
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
  await page.locator(".project-preview").scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator(".project-preview img").evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `test-results/${testInfo.project.name}-homepage.png`, fullPage: true });
});

test("parallax responde ao cursor e respeita mudança para reduced motion", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Parallax de cursor somente para ponteiro preciso.");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const media = await page.evaluate(() => ({ fine: matchMedia("(pointer: fine)").matches, hover: matchMedia("(hover: hover)").matches, reduce: matchMedia("(prefers-reduced-motion: reduce)").matches }));
  expect(media).toEqual({ fine: true, hover: true, reduce: false });
  let pointerX = 1250;
  await expect.poll(async () => {
    await page.mouse.move(pointerX += 5, 200);
    return page.locator(".hero-pointer").evaluate((element) => getComputedStyle(element).transform);
  }).not.toBe("none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => page.locator(".hero-pointer").evaluate((element) => getComputedStyle(element).transform)).toBe("none");
  await expect(page.locator(".manifesto-word").first()).toHaveCSS("opacity", "1");
});
