import { ExtrudeGeometry, Group, Mesh, Path, PerspectiveCamera, Scene, ShaderMaterial, Shape, Vector3, WebGLRenderer } from "three";
import type { FocusPose } from "./focus-content";

export type LensProjection = { points: string; x: number; y: number; width: number; height: number; outerWidth: number; outerHeight: number };
export type FocusScene = { render: (pose:FocusPose,width:number,height:number)=>LensProjection[]; dispose:()=>void };

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
    uniforms:{uTint:{value:0}},toneMapped:false,
    vertexShader:`varying vec3 vNormal; varying vec3 vView; varying vec3 vLocal;
      void main(){ vec4 p=modelViewMatrix*vec4(position,1.); vNormal=normalize(normalMatrix*normal); vView=-p.xyz; vLocal=position; gl_Position=projectionMatrix*p; }`,
    fragmentShader:`uniform float uTint; varying vec3 vNormal; varying vec3 vView; varying vec3 vLocal;
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
        gl_FragColor=vec4(color,1.);
        #include <colorspace_fragment>
      }`,
  });
  for (const x of [-1.08,1.08]) { const letter=new Mesh(geometry,material);letter.position.x=x;object.add(letter); }
  const camera=new PerspectiveCamera(38,1,.1,100);camera.position.z=9;
  let lastWidth=0,lastHeight=0;
  const vector=new Vector3();
  host.append(renderer.domElement);
  // Let the driver compile in parallel while the CSS letters remain interactive.
  // The first draw must not synchronously wait for the complete GPU program.
  try { await renderer.compileAsync(scene,camera); }
  catch(error) {geometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove();throw error;}
  function project(pose:FocusPose,width:number,height:number): LensProjection[] {
    if (lastWidth!==width || lastHeight!==height) {
      lastWidth=width;lastHeight=height;
      renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();
    }
    const visibleHeight=2*Math.tan(38*Math.PI/360)*9,visibleWidth=visibleHeight*width/height;
    object.scale.setScalar(pose.size*visibleWidth/4.25);
    object.position.set((pose.x-.5)*visibleWidth,(.5-pose.y)*visibleHeight,0);
    object.rotation.set(pose.pitch,pose.yaw,pose.roll);
    object.updateMatrixWorld(true);camera.updateMatrixWorld(true);
    material.uniforms.uTint.value=pose.tint;
    renderer.render(scene,camera);
    return [-1.08,1.08].map(offset=>{
      const points: [number,number][]=[];
      for (let i=0;i<48;i++) {
        const angle=i/48*Math.PI*2;
        vector.set(offset+Math.cos(angle)*.758,Math.sin(angle)*.787,.15).applyMatrix4(object.matrixWorld).project(camera);
        points.push([(vector.x+1)*width/2,(1-vector.y)*height/2]);
      }
      const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);
      const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
      return {points:points.map(p=>p.map(n=>n.toFixed(2)).join(",")).join(" "),x:(minX+maxX)/2,y:(minY+maxY)/2,width:maxX-minX,height:maxY-minY,outerWidth:(maxX-minX)/.758,outerHeight:(maxY-minY)/.76};
    });
  }
  return { render:project,dispose(){ geometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove(); } };
}
