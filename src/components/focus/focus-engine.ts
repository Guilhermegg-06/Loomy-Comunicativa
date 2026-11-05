import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { chapters, poseAt, type FocusPose } from "./focus-content";
import type { FocusScene, LensProjection } from "./focus-scene";

function fallbackProjection(pose:FocusPose,width:number,height:number):LensProjection[] {
  const unit=pose.size*width/4.25;
  return [-1.08,1.08].map(offset=>{
    const x=pose.x*width+offset*unit*Math.cos(pose.yaw),y=pose.y*height-offset*unit*Math.sin(pose.roll);
    const rw=unit*.758*Math.cos(pose.yaw),rh=unit*.787*Math.cos(pose.pitch);
    const points=Array.from({length:48},(_,i)=>{const angle=i/48*Math.PI*2;return `${(x+Math.cos(angle)*rw).toFixed(2)},${(y+Math.sin(angle)*rh).toFixed(2)}`;}).join(" ");
    return {points,x,y,width:rw*2,height:rh*2,outerWidth:unit*2,outerHeight:unit*2.07};
  });
}

export function initializeFocus(root:HTMLDivElement,scroller:HTMLElement,onActive:(index:number)=>void,onReady:()=>void) {
  gsap.registerPlugin(ScrollTrigger);
  const state={progress:0};
  const preference=matchMedia("(prefers-reduced-motion: reduce)");
  const panels=Array.from(root.querySelectorAll<HTMLElement>("[data-world-panel]"));
  const clips=Array.from(root.querySelectorAll<SVGPolygonElement>("[data-lens-clip]"));
  const labels=Array.from(root.querySelectorAll<HTMLElement>("[data-lens-label]"));
  const fallback=Array.from(root.querySelectorAll<HTMLElement>("[data-fallback-o]"));
  const host=root.querySelector<HTMLDivElement>(".focus-canvas")!;
  let scene:FocusScene|null=null,disposed=false,lastActive=-1,lastFrame=0,lastProgress=-1,lastText="";
  let width=scroller.clientWidth,height=scroller.clientHeight;
  const pointer={x:0,y:0,actualX:0,actualY:0};
  const quiet=()=>preference.matches || document.documentElement.dataset.motion==="paused";
  const tween=gsap.to(state,{progress:7,ease:"none",scrollTrigger:{scroller,trigger:scroller.querySelector(".focus-waypoint"),start:"top top",end:()=>`+=${scroller.scrollHeight-scroller.clientHeight}`,scrub:.55,invalidateOnRefresh:true}});
  function updatePanels(progress:number) {
    const index=Math.floor(progress),fraction=progress-index;
    const t=gsap.utils.clamp(0,1,(fraction-.14)/.72),blend=t*t*(3-2*t);
    for (const panel of panels) {
      const n=Number(panel.dataset.worldPanel);
      const opacity=n===index ? 1-blend : n===index+1 ? blend : 0;
      panel.style.opacity=String(opacity);
      panel.style.visibility=opacity>0 ? "visible" : "hidden";
      panel.style.transform=`translate3d(0,${n===index ? -blend*18 : (1-blend)*18}px,0)`;
    }
  }
  function draw(time:number,force=false) {
    if (disposed || document.hidden) return;
    const still=quiet(),progress=gsap.utils.clamp(0,7,still ? scroller.scrollTop/height : state.progress);
    if (!force && time-lastFrame<(matchMedia("(pointer:coarse)").matches ? 1/30 : 1/45)) return;
    if (!force && still && Math.abs(progress-lastProgress)<.0001) return;
    lastFrame=time;
    const active=Math.round(progress);
    if (active!==lastActive) {lastActive=active;onActive(active);history.replaceState(null,"",`#${chapters[active].id}`);}
    if (progress!==lastProgress) {updatePanels(progress);lastProgress=progress;}
    const pose=poseAt(progress,width<768);
    pointer.actualX+=(pointer.x-pointer.actualX)*.08;pointer.actualY+=(pointer.y-pointer.actualY)*.08;
    if (!still) {pose.yaw+=pointer.actualX*.12+Math.sin(time*.47)*.018;pose.pitch+=pointer.actualY*.075+Math.sin(time*.36)*.012;}
    const projections=scene?.render(pose,width,height) ?? fallbackProjection(pose,width,height);
    const labelMode=progress<.8 ? "hero" : progress<4.5 ? "film" : "coast";
    const text=labelMode==="hero" ? "Ideias\nem\nfoco." : labelMode==="film" ? "Da ideia\nao último\nframe." : "Ideias que\natravessam.";
    const labelOpacity=labelMode==="hero" ? Math.max(0,1-progress*2) : Math.max(0,1-Math.abs(progress-(labelMode==="film" ? 4 : 5))*2.4);
    if (text!==lastText) { for (const label of labels) label.textContent=text;lastText=text; }
    projections.forEach((lens,index)=>{
      clips[index].setAttribute("points",lens.points);
      labels[index].style.cssText=`left:${lens.x}px;top:${lens.y}px;font-size:${Math.min(lens.width/(labelMode==="hero" ? 4.1 : labelMode==="film" ? 6.2 : 7.6),lens.height/4.1,64)}px;opacity:${labelOpacity};`;
      fallback[index].style.cssText=`left:${lens.x}px;top:${lens.y}px;width:${lens.outerWidth}px;height:${lens.outerHeight}px;transform:translate(-50%,-50%) rotate(${pose.roll}rad);`;
    });
  }
  // GSAP's ticker has its own epoch. Resize/pause callbacks use performance.now;
  // keep one clock so those callbacks cannot stall rendering until it catches up.
  const tick=()=>draw(performance.now()/1000);
  gsap.ticker.add(tick);
  function go(index:number) { scroller.scrollTo({top:index*height,behavior:quiet() ? "instant" : "smooth"});if(quiet())sync(); }
  function keyboard(event:KeyboardEvent) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement || document.querySelector("dialog[open]")) return;
    const current=Math.round(scroller.scrollTop/height);
    if (["ArrowDown","PageDown"].includes(event.key) || (event.key===" " && event.target===scroller)) {event.preventDefault();go(Math.min(7,current+1));}
    else if (["ArrowUp","PageUp"].includes(event.key)) {event.preventDefault();go(Math.max(0,current-1));}
    else if (event.key==="Home") {event.preventDefault();go(0);}
    else if (event.key==="End") {event.preventDefault();go(7);}
  }
  function move(event:PointerEvent) {if (event.pointerType!=="mouse") return;pointer.x=(event.clientX/width-.5)*2;pointer.y=(event.clientY/height-.5)*2;}
  function resetPointer() {pointer.x=0;pointer.y=0;}
  function sync() {lastProgress=-1;draw(performance.now()/1000,true);}
  const resize=new ResizeObserver(()=>{width=scroller.clientWidth;height=scroller.clientHeight;ScrollTrigger.refresh();sync();});resize.observe(scroller);
  window.addEventListener("keydown",keyboard);root.addEventListener("pointermove",move);root.addEventListener("pointerleave",resetPointer);
  preference.addEventListener("change",sync);window.addEventListener("loomy:motionchange",sync);
  document.addEventListener("visibilitychange",sync);
  const initial=chapters.findIndex(chapter=>`#${chapter.id}`===location.hash);
  if (initial>0) {scroller.scrollTop=initial*height;state.progress=initial;}
  draw(0,true);
  // Both touch and mouse devices get the same live scene. The CSS O's stay usable
  // while loading, when WebGL is unavailable, or if the optional module fails.
  const timer=setTimeout(()=>{void import("./focus-scene").then(async({createFocusScene})=>{
    if (disposed) return;
    try {
      const created=await createFocusScene(host);
      if(disposed) {created.dispose();return;}
      scene=created;sync();root.classList.add("has-webgl");onReady();
    } catch {if(disposed)return;scene?.dispose();scene=null;root.dataset.renderer="css";sync();}
  }).catch(()=>{root.dataset.renderer="css";});},200);
  return {go,dispose(){disposed=true;clearTimeout(timer);gsap.ticker.remove(tick);tween.scrollTrigger?.kill();tween.kill();resize.disconnect();scene?.dispose();window.removeEventListener("keydown",keyboard);root.removeEventListener("pointermove",move);root.removeEventListener("pointerleave",resetPointer);preference.removeEventListener("change",sync);window.removeEventListener("loomy:motionchange",sync);document.removeEventListener("visibilitychange",sync);}};
}
