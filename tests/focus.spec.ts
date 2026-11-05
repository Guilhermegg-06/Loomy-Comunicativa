import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function stage(page:Page,index:number) {
  await page.locator(".focus-scroll").evaluate((element,n)=>element.scrollTo({top:(element as HTMLElement).clientHeight*n,behavior:"instant"}),index);
  await expect(page.locator(".focus-experience")).toHaveAttribute("data-stage",String(index));
}

test("uma rolagem avança a cena; toque e mouse compartilham a experiência 3D",async({page},testInfo)=>{
  test.setTimeout(60_000);
  const errors:string[]=[];
  page.on("pageerror",error=>errors.push(error.message));
  page.on("console",message=>{if(message.type()==="error")errors.push(message.text());});
  await page.goto("/");
  await expect(page.getByRole("heading",{level:1})).toHaveText("Loomy. Ideias em foco.");
  await expect(page.locator(".focus-experience")).toHaveAttribute("data-3d","ready",{timeout:25_000});
  await expect(page.locator(".focus-canvas canvas")).toBeVisible();
  const initial=await page.locator('[data-lens-clip="0"]').getAttribute("points");
  if(testInfo.project.name==="mobile") {
    const session=await page.context().newCDPSession(page);
    await session.send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[{x:190,y:560}]});
    for(let step=1;step<=15;step++) {
      await session.send("Input.dispatchTouchEvent",{type:"touchMove",touchPoints:[{x:190,y:560-step*30}]});
      await page.waitForTimeout(20);
    }
    await session.send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});
    await session.detach();
  } else {await page.mouse.move(600,500);await page.mouse.wheel(0,550);}
  await expect(page.locator(".focus-experience")).toHaveAttribute("data-stage","1",{timeout:12_000});
  await expect(page.locator(".caption-title")).toHaveText("Produção");
  await expect.poll(()=>page.locator('[data-lens-clip="0"]').getAttribute("points")).not.toBe(initial);
  await page.getByRole("button",{name:"Próxima etapa",exact:true}).click();
  await expect(page.locator(".caption-title")).toHaveText("Design");
  await page.getByRole("button",{name:"Etapa anterior",exact:true}).click();
  await expect(page.locator(".caption-title")).toHaveText("Produção");
  expect(errors).toEqual([]);
});

test("navegação, teclado e links diretos percorrem todos os capítulos",async({page})=>{
  test.setTimeout(45_000);
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/");
  await page.getByRole("navigation",{name:"Navegação principal"}).getByRole("link",{name:"Marketing",exact:true}).click();
  await expect(page).toHaveURL(/#marketing$/);
  await expect(page.locator(".caption-title")).toHaveText("Marketing");
  await page.keyboard.press("End");
  await expect(page.getByRole("heading",{name:"Vamos criar juntos.",exact:true})).toBeVisible();
  await page.keyboard.press("PageUp");
  await expect(page.locator(".caption-title")).toHaveText("03. Conectar");
  await page.keyboard.press("Home");
  await expect(page.locator(".focus-experience")).toHaveAttribute("data-stage","0");
  await page.getByRole("link",{name:"Vamos conversar",exact:true}).click();
  await expect(page).toHaveURL(/#contato$/);
  await page.goto("/#design");
  await expect(page.locator(".caption-title")).toHaveText("Design");
});

test("vídeo completo com áudio abre, reproduz e devolve o foco",async({page})=>{
  test.setTimeout(45_000);
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/#projetos");
  const play=page.getByRole("button",{name:"Ver vídeo: Por trás das ideias"});
  await play.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect.poll(()=>page.locator("video").evaluate((v:HTMLVideoElement)=>v.currentTime),{timeout:12_000}).toBeGreaterThan(0);
  const media=await page.locator("video").evaluate((v:HTMLVideoElement)=>({width:v.videoWidth,height:v.videoHeight,duration:v.duration,muted:v.muted}));
  expect(media.width).toBe(720);expect(media.height).toBe(1280);
  expect(media.duration).toBeGreaterThan(20);expect(media.duration).toBeLessThan(22);expect(media.muted).toBe(false);
  await page.keyboard.press("Escape");
  await expect(play).toBeFocused();
  await expect.poll(()=>page.locator("video").evaluate((v:HTMLVideoElement)=>v.paused)).toBe(true);
});

test("briefing é preparado localmente e o contato aponta para o Instagram real",async({page},testInfo)=>{
  const denied=testInfo.project.name==="mobile";
  await page.addInitScript(({denied})=>Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async()=>{if(denied)throw new Error("Clipboard unavailable");}}}),{denied});
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/#contato");
  await page.getByRole("button",{name:"Design",exact:true}).click();
  await page.getByLabel("Conte um pouco da sua ideia").fill("Quero conversar sobre a identidade da minha marca.");
  await page.getByRole("button",{name:"Preparar conversa"}).click();
  await expect(page.getByLabel("Seu briefing")).toHaveValue(/design\.[\s\S]*Quero conversar/);
  await expect(page.getByText(denied ? "Seu briefing está pronto." : "Briefing copiado.",{exact:false})).toBeVisible();
  await expect(page.getByRole("link",{name:/Abrir Instagram/})).toHaveAttribute("href","https://www.instagram.com/loomycomunica/");
  await page.getByRole("button",{name:"Editar minha ideia"}).click();
  await expect(page.getByLabel("Conte um pouco da sua ideia")).toHaveValue("Quero conversar sobre a identidade da minha marca.");
});

test("nitidez, telas claras e escuras, reduced motion e acessibilidade AA",async({page},testInfo)=>{
  test.setTimeout(90_000);
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/");
  await expect(page.locator(".focus-experience")).toHaveAttribute("data-3d","ready",{timeout:25_000});
  await expect(page.locator(".focus-soft")).toHaveCSS("filter",/blur/);
  await expect(page.locator(".focus-clear")).toHaveCSS("clip-path",/loomy-focus-lenses/);
  await expect(page.getByRole("button",{name:"Movimento reduzido"})).toBeDisabled();
  const widths=testInfo.project.name==="mobile" ? [320,390,767] : [768,1024,1440];
  for(const width of widths) {
    await page.setViewportSize({width,height:844});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  await page.setViewportSize(testInfo.project.name==="mobile" ? {width:390,height:844} : {width:1440,height:1000});
  for(const index of [0,1,4,5,6,7]) {
    await stage(page,index);
    const results=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa"]).analyze();
    expect(results.violations,`Capítulo ${index}`).toEqual([]);
    await page.screenshot({path:`test-results/${testInfo.project.name}-focus-${index}.png`});
  }
});

test("sem WebGL as letras e as lentes continuam disponíveis",async({page},testInfo)=>{
  test.skip(testInfo.project.name==="mobile","Fallback compartilhado.");
  await page.addInitScript(()=>{
    const original=HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext=function(this:HTMLCanvasElement,...args:Parameters<typeof original>) {
      if(String(args[0]).startsWith("webgl")) return null;
      return original.apply(this,args);
    } as typeof original;
  });
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/");
  await expect(page.locator(".focus-experience")).toHaveAttribute("data-renderer","css");
  await expect(page.locator(".focus-fallback")).toHaveCSS("opacity","1");
  await expect.poll(()=>page.locator('[data-lens-clip="0"]').getAttribute("points")).not.toBe("0,0");
  await page.getByRole("button",{name:"Explorar Design"}).click();
  await expect(page.locator(".caption-title")).toHaveText("Design");
});

test("pausa global congela o movimento automático e permite navegar",async({page})=>{
  await page.goto("/");
  await expect(page.locator(".focus-experience")).toHaveAttribute("data-3d","ready",{timeout:25_000});
  await page.getByRole("button",{name:"Pausar efeitos",exact:true}).click();
  const points=await page.locator('[data-lens-clip="0"]').getAttribute("points");
  await page.waitForTimeout(300);
  await expect(page.locator('[data-lens-clip="0"]')).toHaveAttribute("points",points!);
  await page.getByRole("button",{name:"Explorar Design"}).click();
  await expect(page.locator(".caption-title")).toHaveText("Design");
  await page.getByRole("button",{name:"Ativar efeitos",exact:true}).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion","playing");
});
