import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("WebKit mobile mantém a nitidez e a sequência de capítulos",async({page},testInfo)=>{
  test.setTimeout(60_000);
  const errors:string[]=[];page.on("pageerror",error=>errors.push(error.message));
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/");
  await expect.poll(()=>page.locator(".focus-experience").evaluate(el=>el.getAttribute("data-3d")==="ready" || el.getAttribute("data-renderer")==="css"),{timeout:25_000}).toBe(true);
  const renderer=await page.locator(".focus-experience").getAttribute("data-3d");
  testInfo.annotations.push({type:"renderer",description:renderer==="ready" ? "WebGL ativo" : "Fallback CSS: ambiente WebKit sem WebGL"});
  await expect(page.locator('[data-lens-clip="0"]')).not.toHaveAttribute("points","0,0");
  await expect(page.locator(".focus-clear")).toHaveCSS("clip-path",/loomy-focus-lenses/);
  await page.getByRole("navigation",{name:"Navegação principal"}).getByRole("link",{name:"Design",exact:true}).click();
  await expect(page.locator(".caption-title")).toHaveText("Design");
  for(const index of [4,5,6,7]) {
    await page.locator(".focus-scroll").evaluate((el,n)=>el.scrollTo({top:el.clientHeight*n,behavior:"instant"}),index);
    await expect(page.locator(".focus-experience")).toHaveAttribute("data-stage",String(index));
    await page.screenshot({path:`test-results/webkit-focus-${index}.png`});
  }
  await expect(page.getByRole("heading",{name:"Vamos criar juntos.",exact:true})).toBeVisible();
  expect(errors).toEqual([]);
});

test("WebKit mobile permite preparar a conversa e atende à acessibilidade AA",async({page})=>{
  test.setTimeout(45_000);
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/#contato");
  await page.getByLabel("Conte um pouco da sua ideia").fill("Vamos criar uma campanha.");
  const results=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa"]).analyze();
  expect(results.violations).toEqual([]);
  await page.getByRole("button",{name:"Preparar conversa"}).click();
  await expect(page.getByLabel("Seu briefing")).toHaveValue(/Vamos criar uma campanha/);
  await expect(page.getByRole("link",{name:/Abrir Instagram/})).toHaveAttribute("href","https://www.instagram.com/loomycomunica/");
});
