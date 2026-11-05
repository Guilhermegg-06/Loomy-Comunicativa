import {
  AmbientLight, DirectionalLight, ExtrudeGeometry, Group, HemisphereLight,
  Mesh, MeshBasicMaterial, MeshPhysicalMaterial, Path, PerspectiveCamera,
  Scene, Shape, SRGBColorSpace, TextureLoader, WebGLRenderer, PMREMGenerator,
  ACESFilmicToneMapping,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import type { Texture, WebGLRenderTarget } from "three";

type Outline = [number, number][];
type Contours = { width: number; height: number; shapes: { outline: Outline; holes: Outline[] }[] };
export type CrystalController = {
  setMotion: (enabled: boolean) => void;
  rotate: () => void;
  reset: () => void;
  dispose: () => void;
};

export async function createCrystalScene(host: HTMLDivElement, motion: boolean, variant: "crystal"|"field"="crystal"): Promise<CrystalController> {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, matchMedia("(pointer: coarse)").matches ? 1.25 : 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = SRGBColorSpace;
  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", "Logo Loomy em 3D. Arraste para girar ou use as teclas de seta. Home restaura a posição.");
  canvas.style.touchAction = "pan-y";

  let contours: Contours;
  let texture: Texture|null=null;
  try {
    const response = await fetch(variant==="field" ? "/media/loomy-field-contours.json" : "/media/loomy-crystal-contours.json");
    if (!response.ok) throw new Error("Contour unavailable");
    [contours, texture] = await Promise.all([
      response.json() as Promise<Contours>,
      variant==="field" ? Promise.resolve(null) : new TextureLoader().loadAsync("/media/loomy-crystal.webp"),
    ]);
  } catch (error) {
    renderer.dispose();
    throw error;
  }
  if (texture) {
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  }
  const width = 8.3;
  const height = width * contours.height / contours.width;
  function trace(points: Outline, path: Shape | Path) {
    points.forEach(([x,y], index) => {
      const px = (x / contours.width - .5) * width;
      const py = (.5 - y / contours.height) * height;
      if (index === 0) path.moveTo(px,py); else path.lineTo(px,py);
    });
    path.closePath();
    return path;
  }
  const shapes = contours.shapes.map((item) => {
    const shape = trace(item.outline, new Shape()) as Shape;
    shape.holes = item.holes.map((hole) => trace(hole,new Path()) as Path);
    return shape;
  });
  const geometry = new ExtrudeGeometry(shapes, { depth: .38, bevelEnabled: true, bevelSize: variant==="field" ? .085 : .035, bevelThickness: variant==="field" ? .12 : .055, bevelSegments: variant==="field" ? 5 : 3, curveSegments: 4, steps: 1 });
  geometry.translate(0,0,-.19);
  const position = geometry.getAttribute("position");
  const uv = geometry.getAttribute("uv");
  for (let index=0;index<position.count;index++) {
    uv.setXY(index,position.getX(index)/width+.5,position.getY(index)/height+.5);
  }
  const face = variant==="field"
    ? new MeshPhysicalMaterial({color:0xf4f2ef,metalness:1,roughness:.13,clearcoat:1,iridescence:.3,envMapIntensity:1.7})
    : new MeshBasicMaterial({ map: texture, transparent: true, alphaTest: .1, toneMapped: false });
  const edge = new MeshPhysicalMaterial({ color: variant==="field" ? 0xd5d7e4 : 0xa2d8f2, metalness: variant==="field" ? 1 : .35, roughness: .2, clearcoat: 1, clearcoatRoughness: .12, iridescence: .5 });
  const mesh = new Mesh(geometry,[face,edge]);
  const object = new Group();
  object.add(mesh);
  object.rotation.set(variant==="field" ? .01 : .08,variant==="field" ? -.045 : -.12,variant==="field" ? 0 : -.06);
  const scene = new Scene();
  scene.add(object, new AmbientLight(0xe9f6ff,2.2),new HemisphereLight(0xffffff,0x396e94,2.2));
  let environment: WebGLRenderTarget|null=null;
  const chromeTime={value:0};
  if (variant==="field") {
    renderer.toneMapping=ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.65;
    const generator=new PMREMGenerator(renderer);
    const room=new RoomEnvironment();
    environment=generator.fromScene(room,.035);
    scene.environment=environment.texture;
    room.dispose();generator.dispose();
    face.onBeforeCompile=(shader) => {
      shader.uniforms.uChromeTime=chromeTime;
      shader.vertexShader="varying vec3 vChromePosition;\n"+shader.vertexShader;
      shader.vertexShader=shader.vertexShader.replace("#include <begin_vertex>","#include <begin_vertex>\nvChromePosition=position;");
      shader.fragmentShader="uniform float uChromeTime;\nvarying vec3 vChromePosition;\n"+shader.fragmentShader;
      shader.fragmentShader=shader.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
        float wave = sin(vChromePosition.y*1.65 + vChromePosition.x*.2 + uChromeTime*.09);
        float bright = smoothstep(-.68,.52,wave);
        vec3 silver = mix(vec3(.20,.23,.30),vec3(.98),bright);
        float ribbon = exp(-pow((wave+.28)*12.,2.));
        vec3 spectrum = mix(vec3(.13,.35,.95),vec3(1.,.25,.08),smoothstep(-.5,.8,vChromePosition.y));
        diffuseColor.rgb *= mix(silver,spectrum,ribbon*.82);
      `);
    };
    face.customProgramCacheKey=() => "loomy-field-chrome-1";
  }
  const key = new DirectionalLight(0xffffff,4.5);
  key.position.set(3,5,8);
  const rim = new DirectionalLight(0x8bdafa,3);
  rim.position.set(-5,2,-2);
  const lime = new DirectionalLight(0xd6fa00,1.5);
  lime.position.set(5,-3,-4);
  scene.add(key,rim,lime);
  const camera = new PerspectiveCamera(34,1,.1,100);
  camera.position.z = 15.7;
  host.append(canvas);

  let auto = motion;
  let visible = true;
  let disposed = false;
  let frame = 0;
  let previousTime = 0;
  let interactedAt = -10_000;
  let yaw = variant==="field" ? -.045 : -.12;
  let pitch = variant==="field" ? .01 : .08;
  let pointer: { id: number; x: number; y: number; yaw: number; pitch: number; active: boolean; touch: boolean } | null = null;
  const fps = matchMedia("(pointer: coarse)").matches ? 30 : 45;

  function requestFrame() {
    if (!disposed && visible && !document.hidden && !frame) frame = requestAnimationFrame(draw);
  }
  function draw(now: number) {
    frame=0;
    if (disposed || !visible || document.hidden) return;
    if (now-previousTime < 1000/fps) { requestFrame(); return; }
    if (auto) chromeTime.value+=Math.min((now-previousTime)/1000,.05);
    previousTime=now;
    const idle = auto && !pointer?.active && now-interactedAt>4000;
    const targetX=pitch+(idle ? Math.sin(now*.0005)*(variant==="field" ? .025 : .08) : 0);
    const targetY=yaw+(idle ? Math.sin(now*.00032)*(variant==="field" ? .06 : .2) : 0);
    object.rotation.x+=(targetX-object.rotation.x)*.16;
    object.rotation.y+=(targetY-object.rotation.y)*.16;
    object.position.y=idle ? Math.sin(now*.0007)*.065 : 0;
    renderer.render(scene,camera);
    // Frame scheduling stops when paused, hidden, or outside the viewport.
    if (auto || pointer?.active || Math.abs(object.rotation.x-targetX)+Math.abs(object.rotation.y-targetY)>.001) requestFrame();
  }
  function resize() {
    if (disposed) return;
    const bounds=host.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    renderer.setSize(bounds.width,bounds.height,false);
    camera.aspect=bounds.width/bounds.height;
    camera.position.z = variant==="field"
      ? Math.max(height/(2*Math.tan(34*Math.PI/360)),width/(2*camera.aspect*Math.tan(34*Math.PI/360)))*1.16
      : camera.aspect < .9 ? 15.7/.9*1/camera.aspect : 15.7;
    camera.updateProjectionMatrix();
    requestFrame();
  }
  function down(event: PointerEvent) {
    if (!event.isPrimary || event.button>0) return;
    interactedAt=performance.now();
    pointer={id:event.pointerId,x:event.clientX,y:event.clientY,yaw,pitch,active:event.pointerType!=="touch",touch:event.pointerType==="touch"};
    if (pointer.active) { canvas.setPointerCapture(event.pointerId); canvas.classList.add("is-dragging"); }
    requestFrame();
  }
  function move(event: PointerEvent) {
    if (!pointer || pointer.id!==event.pointerId) return;
    const dx=event.clientX-pointer.x;
    const dy=event.clientY-pointer.y;
    if (!pointer.active) {
      if (Math.abs(dy)>Math.abs(dx) && Math.abs(dy)>8) { pointer=null; return; }
      if (Math.abs(dx)<6) return;
      pointer.active=true;
      canvas.setPointerCapture(event.pointerId);
      canvas.classList.add("is-dragging");
    }
    yaw=pointer.yaw+dx*.009;
    pitch=Math.max(-1.2,Math.min(1.2,pointer.pitch+dy*.006));
    interactedAt=performance.now();
    requestFrame();
  }
  function release() { pointer=null; canvas.classList.remove("is-dragging"); interactedAt=performance.now(); requestFrame(); }
  function reset() { yaw=variant==="field" ? -.045 : -.12;pitch=variant==="field" ? .01 : .08;interactedAt=performance.now();requestFrame(); }
  function keyboard(event: KeyboardEvent) {
    if (!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home"].includes(event.key)) return;
    event.preventDefault();
    if (event.key==="Home") { reset();return; }
    if (event.key==="ArrowLeft") yaw-=.22;
    if (event.key==="ArrowRight") yaw+=.22;
    if (event.key==="ArrowUp") pitch=Math.max(-1.2,pitch-.16);
    if (event.key==="ArrowDown") pitch=Math.min(1.2,pitch+.16);
    interactedAt=performance.now();requestFrame();
  }
  function visibility() { if (document.hidden) {cancelAnimationFrame(frame);frame=0;} else requestFrame(); }
  const resizeObserver=new ResizeObserver(resize);
  resizeObserver.observe(host);
  const intersection=new IntersectionObserver(([entry]) => {
    visible=entry.isIntersecting;
    if (visible) requestFrame(); else { cancelAnimationFrame(frame);frame=0; }
  },{threshold:.05});
  intersection.observe(host);
  canvas.addEventListener("pointerdown",down);
  canvas.addEventListener("pointermove",move);
  canvas.addEventListener("pointerup",release);
  canvas.addEventListener("pointercancel",release);
  canvas.addEventListener("keydown",keyboard);
  document.addEventListener("visibilitychange",visibility);
  resize();
  renderer.render(scene,camera);

  return {
    setMotion(enabled) { auto=enabled;requestFrame(); },
    rotate() { yaw+=Math.PI/3;interactedAt=performance.now();requestFrame(); },
    reset,
    dispose() {
      disposed=true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();intersection.disconnect();
      canvas.removeEventListener("pointerdown",down);canvas.removeEventListener("pointermove",move);
      canvas.removeEventListener("pointerup",release);canvas.removeEventListener("pointercancel",release);
      canvas.removeEventListener("keydown",keyboard);document.removeEventListener("visibilitychange",visibility);
      geometry.dispose();face.dispose();edge.dispose();texture?.dispose();environment?.dispose();renderer.dispose();canvas.remove();
    },
  };
}
