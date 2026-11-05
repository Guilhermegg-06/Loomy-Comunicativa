import { ExtrudeGeometry, Group, Mesh, Path, PerspectiveCamera, PlaneGeometry, Scene, ShaderMaterial, Shape, SRGBColorSpace, TextureLoader, Vector3, WebGLRenderer } from "three";
import { crystalWidth, crystalHeight, crystalCenter, crystalO, openingAt, crystalOpacityAt, smoothRange, type FocusPose } from "./focus-content";
import type { Texture } from "three";

export type LensProjection = { points: string; x: number; y: number; width: number; height: number; outerWidth: number; outerHeight: number };
export type FocusScene = { render: (pose:FocusPose,width:number,height:number,progress:number,time:number)=>LensProjection[]; dispose:()=>void };

export async function createFocusScene(host: HTMLDivElement): Promise<FocusScene> {
  const renderer=new WebGLRenderer({alpha:true,antialias:true,powerPreference:"low-power"});
  renderer.setClearColor(0,0);
  renderer.setPixelRatio(Math.min(devicePixelRatio,matchMedia("(pointer:coarse)").matches ? 1.5 : 1.75));
  const scene=new Scene(),object=new Group();
  scene.add(object);
  const outline=new Shape();outline.absellipse(0,0,1,1.035,0,Math.PI*2,false,0);
  const opening=new Path();opening.absellipse(0,0,.765,.795,0,Math.PI*2,true,0);
  outline.holes.push(opening);
  const geometry=new ExtrudeGeometry(outline,{depth:.19,bevelEnabled:true,bevelSegments:4,steps:1,bevelSize:.045,bevelThickness:.045,curveSegments:48});
  geometry.translate(0,0,-.095);
  // Analytical chrome avoids generating and filtering an environment cube at
  // startup. Real geometry/normals still drive perspective, glints and the rim.
  const material=new ShaderMaterial({
    uniforms:{uTint:{value:0},uOpening:{value:1},uOpacity:{value:1}},toneMapped:false,transparent:true,depthWrite:false,
    vertexShader:`uniform float uOpening; varying vec3 vNormal; varying vec3 vView; varying vec3 vLocal;
      void main(){ vec3 point=position; float inner=1.-smoothstep(.81,.94,length(point.xy)); point.xy*=mix(1.,uOpening,inner); vec4 p=modelViewMatrix*vec4(point,1.); vNormal=normalize(normalMatrix*normal); vView=-p.xyz; vLocal=point; gl_Position=projectionMatrix*p; }`,
    fragmentShader:`uniform float uTint; uniform float uOpacity; varying vec3 vNormal; varying vec3 vView; varying vec3 vLocal;
      void main(){
        vec3 n=normalize(vNormal),v=normalize(vView),r=reflect(-v,n);
        float wave=sin(vLocal.y*2.8+vLocal.x*.18+r.y*.8);
        float band=smoothstep(-.72,.55,wave);
        vec3 chrome=mix(vec3(.055,.105,.14),vec3(.73,.86,.92),band);
        float fresnel=pow(1.-max(dot(n,v),0.),2.3);
        float glint=pow(max(dot(reflect(-normalize(vec3(-.4,.7,1.)),n),v),0.),65.);
        float side=.68+.32*abs(n.z);
        chrome=mix(chrome,chrome*vec3(.86,1.,.6),uTint*.4);
        vec3 color=mix(chrome*side,vec3(.87,.96,1.),fresnel*.72)+glint*.65;
        gl_FragColor=vec4(color,uOpacity);
        #include <colorspace_fragment>
      }`,
  });
  const materials=[material,material.clone()];
  const letters=[-1.08,1.08].map((x,index)=>{ const letter=new Mesh(geometry,materials[index]);letter.position.x=x;letter.renderOrder=2;object.add(letter);return letter; });
  let texture:Texture;
  try {texture=await new TextureLoader().loadAsync(matchMedia("(max-width:767px)").matches ? "/media/loomy-crystal-mobile.webp" : "/media/loomy-crystal.webp");}
  catch(error) {geometry.dispose();materials.forEach(m=>m.dispose());renderer.dispose();throw error;}
  texture.colorSpace=SRGBColorSpace;
  const logoGeometry=new PlaneGeometry(crystalWidth,crystalHeight);
  const logoMaterial=new ShaderMaterial({
    uniforms:{uMap:{value:texture},uTime:{value:0},uOpacity:{value:1}},transparent:true,depthWrite:false,toneMapped:false,
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`uniform sampler2D uMap;uniform float uTime;uniform float uOpacity;varying vec2 vUv;
      void main(){vec4 art=texture2D(uMap,vUv);if(art.a<.01)discard;
        float sweep=mod(uTime*.22,1.8)-.3;
        float shine=exp(-pow((vUv.x+vUv.y*.14-sweep)*11.,2.));
        vec3 color=art.rgb*(.98+.02*cos(uTime*.6+vUv.x*12.))+shine*vec3(.32,.45,.6);
        gl_FragColor=vec4(color,art.a*uOpacity);
        #include <colorspace_fragment>
      }`,
  });
  const logo=new Mesh(logoGeometry,logoMaterial);
  logo.position.set((.5-crystalCenter)*crystalWidth,(crystalO.y-.5)*crystalHeight,.15);logo.renderOrder=1;object.add(logo);
  const camera=new PerspectiveCamera(38,1,.1,100);camera.position.z=9;
  let lastWidth=0,lastHeight=0;
  const vector=new Vector3();
  host.append(renderer.domElement);
  // Let the driver compile in parallel while the CSS letters remain interactive.
  // The first draw must not synchronously wait for the complete GPU program.
  try { await renderer.compileAsync(scene,camera); }
  catch(error) {geometry.dispose();materials.forEach(m=>m.dispose());logoGeometry.dispose();logoMaterial.dispose();texture.dispose();renderer.dispose();renderer.domElement.remove();throw error;}
  function project(pose:FocusPose,width:number,height:number,progress:number,time:number): LensProjection[] {
    if (lastWidth!==width || lastHeight!==height) {
      lastWidth=width;lastHeight=height;
      renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();
    }
    const visibleHeight=2*Math.tan(38*Math.PI/360)*9,visibleWidth=visibleHeight*width/height;
    object.scale.setScalar(pose.size*visibleWidth/4.25);
    object.position.set((pose.x-.5)*visibleWidth,(.5-pose.y)*visibleHeight,0);
    object.rotation.set(pose.pitch,pose.yaw,pose.roll);
    object.updateMatrixWorld(true);camera.updateMatrixWorld(true);
    materials.forEach((m,index)=>{m.uniforms.uTint.value=pose.tint;m.uniforms.uOpening.value=openingAt(progress,index);m.uniforms.uOpacity.value=smoothRange(.04,.3,progress);letters[index].visible=progress>.001;});
    logoMaterial.uniforms.uOpacity.value=crystalOpacityAt(progress);logoMaterial.uniforms.uTime.value=time;logo.visible=logoMaterial.uniforms.uOpacity.value>0;
    renderer.render(scene,camera);
    return [-1.08,1.08].map((offset,index)=>{
      const opening=openingAt(progress,index);
      const points: [number,number][]=[];
      for (let i=0;i<48;i++) {
        const angle=i/48*Math.PI*2;
        vector.set(offset+Math.cos(angle)*.758*opening,Math.sin(angle)*.787*opening,.15).applyMatrix4(object.matrixWorld).project(camera);
        points.push([(vector.x+1)*width/2,(1-vector.y)*height/2]);
      }
      const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);
      const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
      return {points:points.map(p=>p.map(n=>n.toFixed(2)).join(",")).join(" "),x:(minX+maxX)/2,y:(minY+maxY)/2,width:maxX-minX,height:maxY-minY,outerWidth:(maxX-minX)/(.758*opening),outerHeight:(maxY-minY)/(.76*opening)};
    });
  }
  return { render:project,dispose(){ geometry.dispose();materials.forEach(m=>m.dispose());logoGeometry.dispose();logoMaterial.dispose();texture.dispose();renderer.dispose();renderer.domElement.remove(); } };
}
