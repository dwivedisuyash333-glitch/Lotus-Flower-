(() => {
const NS="http://www.w3.org/2000/svg";
const svg=document.getElementById("flower-frame");
const base=document.getElementById("BaseGroup");
const leaves=document.getElementById("LeafGroup");
const bud=document.getElementById("BudGroup");
const flower=document.getElementById("PinkFlowerGroup");
const dots=document.getElementById("Dots");

function E(tag,attrs={},parent){
  const e=document.createElementNS(NS,tag);
  for(const [k,v] of Object.entries(attrs)) e.setAttribute(k,v);
  if(parent) parent.appendChild(e);
  return e;
}
function path(d, cls="path vine", parent=base){
  const p=E("path",{d,class:cls},parent);
  p.style.strokeDasharray="1";
  p.style.strokeDashoffset="1";
  return p;
}
function leaf(x,y,rot,s=1){
  const g=E("g",{transform:`translate(${x} ${y}) rotate(${rot}) scale(${s})`},leaves);
  E("path",{class:"leaf",d:"M0 0 C-25 -15 -42 -2 -54 17 C-31 24 -11 18 0 0Z"},g);
  E("path",{class:"path vineFine",d:"M-2 1 C-20 5 -35 10 -51 17"},g);
}
// tiny star field
for(let i=0;i<85;i++){
  const x=10+Math.random()*880, y=170+Math.random()*440;
  const c=E("circle",{cx:x,cy:y,r:(Math.random()*1.7+.35).toFixed(2),fill:"#fff3db",opacity:(Math.random()*.55+.1).toFixed(2)},dots);
  c.dataset.phase=Math.random()*Math.PI*2;
}
// Golden circular woven vines — deliberately layered like the reference
const vineDs=[
"M60 585 C115 560 86 510 116 456 C145 403 126 350 178 306 C229 263 247 218 309 196 C357 179 394 190 450 177 C506 190 543 179 591 196 C653 218 671 263 722 306 C774 350 755 403 784 456 C814 510 785 560 840 585",
"M38 604 C98 575 72 517 106 462 C140 408 112 357 169 309 C224 263 250 224 315 203 C366 186 397 207 450 190 C503 207 534 186 585 203 C650 224 676 263 731 309 C788 357 760 408 794 462 C828 517 802 575 862 604",
"M91 611 C145 573 121 523 149 472 C177 420 159 374 208 329 C257 284 279 238 337 221 C382 207 407 224 450 209 C493 224 518 207 563 221 C621 238 643 284 692 329 C741 374 723 420 751 472 C779 523 755 573 809 611",
"M118 585 C173 545 145 493 180 445 C213 400 195 350 243 313 C289 278 307 245 357 232",
"M782 585 C727 545 755 493 720 445 C687 400 705 350 657 313 C611 278 593 245 543 232"
];
vineDs.forEach((d,i)=>path(d,i<3?"path vine":"path vineFine"));

const curls=[
"M65 576 C18 593 18 552 51 539 C82 527 91 500 67 485",
"M98 510 C50 506 45 474 76 462 C101 452 109 425 91 405",
"M139 396 C104 375 112 340 144 334 C168 329 179 301 163 282",
"M201 292 C174 267 187 236 217 237 C245 238 258 216 250 195",
"M835 576 C882 593 882 552 849 539 C818 527 809 500 833 485",
"M802 510 C850 506 855 474 824 462 C799 452 791 425 809 405",
"M761 396 C796 375 788 340 756 334 C732 329 721 301 737 282",
"M699 292 C726 267 713 236 683 237 C655 238 642 216 650 195"
];
curls.forEach(d=>path(d,"path vineFine"));

leaf(122,506,-42,.9);leaf(145,430,24,.75);leaf(180,342,-32,.8);
leaf(778,506,42,.9);leaf(755,430,-24,.75);leaf(720,342,32,.8);

// Center stem and base
path("M450 605 C450 566 450 520 450 475","path vine",base);
path("M440 606 C438 556 439 518 444 477","path vineFine",base);
path("M460 606 C462 556 461 518 456 477","path vineFine",base);

// Base leaves
leaf(442,562,205,1.15); leaf(458,562,-25,1.15);

// Bud first
const budG=E("g",{class:"flowerPart",transform:"translate(450 480)"},bud);
E("path",{class:"petal2",d:"M0 10 C-44 -8 -50 -72 0 -103 C50 -72 44 -8 0 10Z"},budG);
E("path",{class:"petal2",d:"M0 5 C-28 -22 -30 -80 0 -95 C30 -80 28 -22 0 5Z"},budG);
E("ellipse",{cx:0,cy:0,rx:16,ry:26,fill:"#fff2b7",opacity:.8,filter:"url(#glow)"},budG);

// Lotus petal helper. Each petal is a tall tapered translucent shape.
function petal(cx,cy,rot,scale,cls="petal",delay=0){
  const g=E("g",{class:"flowerPart",transform:`translate(${cx} ${cy}) rotate(${rot}) scale(${scale})`},flower);
  g.dataset.delay=delay;
  E("path",{class:cls,d:"M0 12 C-48 -8 -58 -67 0 -132 C58 -67 48 -8 0 12Z"},g);
  E("path",{d:"M0 8 C-9 -35 -7 -77 0 -112 C7 -77 9 -35 0 8Z",fill:"none",stroke:"#fff1f7","stroke-width":"1.5",opacity:".75",filter:"url(#glow)"},g);
  return g;
}
// rear petals
petal(450,476,-72,.78,"petal",.08);
petal(450,476,72,.78,"petal",.10);
petal(450,470,-48,.92,"petal",.14);
petal(450,470,48,.92,"petal",.16);
petal(450,465,-27,1.0,"petal",.18);
petal(450,465,27,1.0,"petal",.20);
// broad side petals
petal(450,500,-88,1.0,"petal",.23);
petal(450,500,88,1.0,"petal",.25);
// front/middle petals
petal(450,505,-58,1.02,"petal2",.29);
petal(450,505,58,1.02,"petal2",.31);
petal(450,512,-35,1.08,"petal2",.34);
petal(450,512,35,1.08,"petal2",.36);
petal(450,520,0,1.12,"petal2",.40);

// center light
const glow=E("circle",{id:"heartGlow",cx:450,cy:505,r:105,opacity:.5},flower);
const center=E("g",{class:"flowerPart",transform:"translate(450 510)"},flower);
E("ellipse",{cx:0,cy:0,rx:46,ry:52,fill:"#fff6d2",opacity:.65,filter:"url(#glow)"},center);
E("ellipse",{cx:0,cy:4,rx:18,ry:26,fill:"#fffdf2",opacity:.95,filter:"url(#glow)"},center);
for(let i=0;i<18;i++){
  const a=i*Math.PI*2/18, x=Math.cos(a)*30, y=Math.sin(a)*24;
  E("circle",{cx:x,cy:y,r:1.5,fill:"#fff0c8",filter:"url(#glow)"},center);
}

// Animation
const allPaths=[...document.querySelectorAll(".path")];
const parts=[...document.querySelectorAll(".flowerPart")];
const start=performance.now();
const duration=9000;

function ease(t){return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2}
function frame(now){
  const elapsed=(now-start)%duration;
  const t=elapsed/duration;

  // draw vines during first ~38%, then bloom
  const vineT=Math.min(1,Math.max(0,(t-.02)/.38));
  allPaths.forEach((p,i)=>{
    const local=Math.min(1,Math.max(0,(vineT*1.2)-i*.025));
    p.style.strokeDashoffset=String(1-local);
  });

  // bud rises after frame begins
  const bt=Math.min(1,Math.max(0,(t-.18)/.22));
  const budScale=.25+.75*ease(bt);
  budG.style.opacity=String(ease(bt));
  budG.style.transform=`translate(450 480) scale(${budScale})`;

  // bud opens / flower petals fan out
  const ft=Math.min(1,Math.max(0,(t-.38)/.42));
  parts.forEach((g,i)=>{
    const d=Number(g.dataset.delay||0);
    const local=Math.min(1,Math.max(0,(ft-d)/(.72)));
    const e=ease(local);
    g.style.opacity=String(e);
    // Start slightly compressed toward center, then reach final shape.
    const tr=g.getAttribute("transform");
    const m=tr.match(/translate\(([^ ]+) ([^)]+)\) rotate\(([^)]+)\) scale\(([^)]+)\)/);
    if(m){
      const x=Number(m[1]),y=Number(m[2]),r=m[3],s=Number(m[4]);
      const ss=.05+(s-.05)*e;
      const yy=510+(y-510)*e;
      g.style.transform=`translate(${x} ${yy}) rotate(${r}) scale(${ss})`;
    }
  });
  // center appears last
  center.style.opacity=String(Math.min(1,Math.max(0,(ft-.42)/.35)));
  glow.style.opacity=String(.5*Math.min(1,Math.max(0,(ft-.15)/.65)));

  // subtle breathing after bloom
  if(ft>.95){
    const pulse=1+Math.sin(now/850)*.018;
    flower.style.transform=`scale(${pulse})`;
    flower.style.transformOrigin="450px 510px";
  }else flower.style.transform="";
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// twinkle
function twinkle(now){
  [...dots.children].forEach(c=>{
    const ph=Number(c.dataset.phase||0);
    c.setAttribute("opacity",(.12+.45*(.5+.5*Math.sin(now/700+ph))).toFixed(2));
  });
  requestAnimationFrame(twinkle);
}
requestAnimationFrame(twinkle);
})();