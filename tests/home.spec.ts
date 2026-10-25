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

  const play = page.getByRole("button", { name: "Ver motion: A identidade em movimento" });
  await play.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect.poll(() => page.locator("video").evaluate((video: HTMLVideoElement) => video.readyState)).toBeGreaterThanOrEqual(2);
  await expect.poll(() => page.locator("video").evaluate((video: HTMLVideoElement) => video.currentTime)).toBeGreaterThan(0);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(play).toBeFocused();
  await expect.poll(() => page.locator("video").evaluate((video: HTMLVideoElement) => video.paused)).toBe(true);

  const contact = page.locator("#contato").getByRole("link", { name: /Vamos conversar/ });
  await expect(contact).toHaveAttribute("href", "https://www.instagram.com/loomycomunica/");
  await expect(contact).toHaveAttribute("target", "_blank");
  expect(errors).toEqual([]);
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
