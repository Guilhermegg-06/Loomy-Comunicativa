export const chapters = [
  { id: "inicio", name: "Loomy", description: "Produção, design e marketing. Uma agência alagoana de diferentes olhares." },
  { id: "foco", name: "Ideias em foco", description: "Produção, design e marketing. Um novo olhar para a sua marca." },
  { id: "producao", name: "Produção", description: "Da primeira ideia ao último frame. Direção criativa, fotografia, vídeo e motion." },
  { id: "design", name: "Design", description: "Forma, cor e conceito. Identidade visual, design gráfico e direção de arte." },
  { id: "marketing", name: "Marketing", description: "Estratégia e criatividade. Conteúdo digital, planejamento e redes sociais." },
  { id: "projetos", name: "Um olhar de perto", description: "Conheça o cuidado por trás das ideias no vídeo de apresentação da Loomy." },
  { id: "olhar", name: "Novos horizontes", description: "De Alagoas para novas conexões. Ideias que aproximam marcas e pessoas." },
  { id: "sobre", name: "O processo", description: "Ouvir, criar e conectar. Diferentes olhares, uma mesma intenção." },
  { id: "contato", name: "Vamos criar juntos", description: "Prepare sua ideia e converse com a Loomy pelo Instagram." },
] as const;

export type FocusPose = { x: number; y: number; size: number; yaw: number; pitch: number; roll: number; tint: number };
export const poses: FocusPose[] = [
  { x: .5, y: .47, size: .73, yaw: -.19, pitch: .12, roll: -.025, tint: 0 },
  { x: .5, y: .49, size: .57, yaw: .04, pitch: .025, roll: 0, tint: 0 },
  { x: .5, y: .49, size: .57, yaw: -.05, pitch: -.035, roll: .02, tint: .35 },
  { x: .5, y: .49, size: .57, yaw: .10, pitch: .045, roll: -.015, tint: 1 },
  { x: .24, y: .49, size: 1.82, yaw: .08, pitch: 0, roll: -.055, tint: .2 },
  { x: .5, y: .47, size: .68, yaw: -.025, pitch: .02, roll: 0, tint: .3 },
  { x: .36, y: .45, size: .40, yaw: -.12, pitch: .08, roll: -.07, tint: .2 },
  { x: .5, y: .185, size: .34, yaw: .05, pitch: -.27, roll: 0, tint: 0 },
];

function experiencePoseAt(progress: number, mobile: boolean): FocusPose {
  const index=Math.min(poses.length-1,Math.max(0,Math.floor(progress)));
  const a=poses[index],b=poses[Math.min(index+1,poses.length-1)];
  const t=progress-index, ease=t*t*(3-2*t);
  const result={} as FocusPose;
  for (const key of Object.keys(a) as (keyof FocusPose)[]) result[key]=a[key]+(b[key]-a[key])*ease;
  if (mobile) {
    const sizes=[.98,.91,.91,.91,2.28,.98,.72,.59];
    const ys=[.45,.45,.45,.45,.45,.45,.42,.17];
    const xs=[.5,.5,.5,.5,.13,.5,.36,.5];
    result.size=sizes[index]+(sizes[Math.min(index+1,7)]-sizes[index])*ease;
    result.y=ys[index]+(ys[Math.min(index+1,7)]-ys[index])*ease;
    result.x=xs[index]+(xs[Math.min(index+1,7)]-xs[index])*ease;
  }
  return result;
}

export const lastChapter=chapters.length-1;
// Centers measured from the two O openings in the existing crystal artwork.
export const crystalO={left:.3375,right:.5159090909,y:.5724043716};
export const crystalWidth=2.16/(crystalO.right-crystalO.left);
export const crystalHeight=crystalWidth*458/1100;
export const crystalCenter=(crystalO.left+crystalO.right)/2;
export const lensDepthFactor=1-.15/9;

export function smoothRange(start:number,end:number,value:number) {
  const t=Math.max(0,Math.min(1,(value-start)/(end-start)));
  return t*t*(3-2*t);
}

export function crystalOpacityAt(progress:number) {return 1-smoothRange(.04,.5,progress);}

export function introLayout(width:number,height:number) {
  const logoWidth=Math.min(width*(width<768 ? .94 : .78),height*.4*1100/458);
  const logoHeight=logoWidth*458/1100;
  return {width:logoWidth,height:logoHeight,left:(width-logoWidth)/2,top:height*.518-logoHeight*.82};
}

export function poseAt(progress:number,width:number,height:number):FocusPose {
  if(progress>=1) return experiencePoseAt(progress-1,width<768);
  const box=introLayout(width,height);
  const from:FocusPose={
    x:.5+((box.left+box.width*crystalCenter)/width-.5)*lensDepthFactor,
    y:.5+((box.top+box.height*crystalO.y)/height-.5)*lensDepthFactor,
    size:box.width/width*4.25/crystalWidth*lensDepthFactor,
    yaw:0,pitch:0,roll:0,tint:0,
  };
  const to=experiencePoseAt(0,width<768),blend=smoothRange(0,1,progress);
  for(const key of Object.keys(from) as (keyof FocusPose)[]) from[key]+=(to[key]-from[key])*blend;
  return from;
}

export function openingAt(progress:number,index:number) {
  const start=index===0 ? .56 : .47;
  return start+(1-start)*smoothRange(0,.9,progress);
}
