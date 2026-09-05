const NS="http://www.w3.org/2000/svg";
const svg=document.querySelector("#art"), stars=document.querySelector("#stars"),
vines=document.querySelector("#vines"), leaves=document.querySelector("#leaves"),
glow=document.querySelector("#flowerGlow"), flower=document.querySelector("#flower");

const el=(tag,a={},p)=>{
  const n=document.createElementNS(NS,tag);
  Object.entries(a).forEach(([k,v])=>n.setAttribute(k,v));
  p&&p.appendChild(n); return n;
};

// Dense but subtle background particles, matching the reference.
for(let i=0;i<155;i++){
  const x=Math.random()*1536,y=70+Math.random()*730,r=.35+Math.random()*1.7;
  const s=el("circle",{class:"star",cx:x,cy:y,r,opacity:.12+Math.random()*.7},stars);
  s.dataset.phase=(Math.random()*Math.PI*2).toFixed(3);
}

// Reference-like large, layered ornamental arch.
const arch=[
"M155 800 C75 705 165 640 112 545 C75 477 150 420 132 344 C114 267 202 240 250 186 C306 124 382 110 463 106 C535 103 604 79 690 86 C776 79 845 103 917 106 C998 110 1074 124 1130 186 C1178 240 1266 267 1248 344 C1230 420 1305 477 1268 545 C1215 640 1305 705 1225 800",
"M178 814 C100 710 192 646 139 551 C98 478 175 415 155 337 C136 260 228 228 274 178 C327 120 404 103 470 101 C548 96 611 70 690 77 C769 70 832 96 910 101 C976 103 1053 120 1106 178 C1152 228 1244 260 1225 337 C1205 415 1282 478 1241 551 C1188 646 1280 710 1202 814",
"M201 829 C133 722 214 650 165 558 C125 483 200 423 184 350 C168 277 250 245 298 197 C351 143 420 123 480 119 C552 113 620 91 690 98 C760 91 828 113 900 119 C960 123 1029 143 1082 197 C1130 245 1212 277 1196 350 C1180 423 1255 483 1215 558 C1166 650 1247 722 1179 829"
];
arch.forEach((d,i)=>el("path",{class:"vine "+(i===0?"outer":"inner"),d},vines));

const tendrils=[
"M166 693 C77 700 48 660 92 622 C130 590 92 554 62 565 C29 577 24 529 61 508",
"M125 540 C55 519 36 476 80 450 C117 429 103 394 73 379 C39 362 57 324 92 321",
"M154 373 C103 348 104 307 141 291 C176 276 168 238 145 220 C120 201 145 171 178 182",
"M223 234 C186 205 196 165 235 158 C272 151 274 116 256 92 C240 72 263 47 292 64",
"M1214 693 C1303 700 1332 660 1288 622 C1250 590 1288 554 1318 565 C1351 577 1356 529 1319 508",
"M1255 540 C1325 519 1344 476 1300 450 C1263 429 1277 394 1307 379 C1341 362 1323 324 1288 321",
"M1226 373 C1277 348 1276 307 1239 291 C1204 276 1212 238 1235 220 C1260 201 1235 171 1202 182",
"M1157 234 C1194 205 1184 165 1145 158 C1108 151 1106 116 1124 92 C1140 72 1117 47 1088 64"
];
tendrils.forEach(d=>el("path",{class:"vine tendril",d},vines));

function addLeaf(x,y,rot,s=1){
  const g=el("g",{transform:`translate(${x} ${y}) rotate(${rot}) scale(${s})`},leaves);
  el("path",{class:"leaf",d:"M0 0 C-34 -26 -70 -7 -86 23 C-53 35 -20 25 0 0Z"},g);
  el("path",{class:"vine inner",d:"M-2 2 C-30 8 -57 17 -82 23"},g);
}
[
[266,251,-42,1],[188,365,26,.9],[154,500,-34,1],
[1270,365,154,.9],[1182,251,42,1],[1382,500,214,1],
[196,615,-38,1.1],[1340,615,218,1.1]
].forEach(v=>addLeaf(...v));

// Additional fine crossing loops above the flower.
[
"M310 183 C405 64 487 144 553 89 C620 33 670 100 690 120 C710 100 760 33 827 89 C893 144 975 64 1070 183",
"M255 214 C348 126 421 184 486 126 C548 72 620 132 690 153 C760 132 832 72 894 126 C959 184 1032 126 1125 214"
].forEach(d=>el("path",{class:"vine inner",d},vines));

// Flower glow behind the lotus.
el("circle",{cx:690,cy:503,r:145,fill:"#f4a1d2",opacity:.18,filter:"url(#bigGlow)"},glow);
el("circle",{cx:690,cy:510,r:110,fill:"url(#core)",opacity:.75},glow);

const parts=[];
function petal(cx,cy,rot,scale,cls="flowerPetal",rise=0){
  const g=el("g",{class:"flowerPart",transform:`translate(${cx} ${cy+rise}) rotate(${rot}) scale(${scale})`,opacity:0},flower);
  el("path",{class:cls,d:"M0 15 C-57 -2 -71 -80 0 -170 C71 -80 57 -2 0 15Z"},g);
  el("path",{class:"petalLine",d:"M0 10 C-11 -42 -8 -101 0 -150 C8 -101 11 -42 0 10Z"},g);
  parts.push({g,final:[cx,cy,rot,scale],rise});
}

// Rear petals, then side petals, then front petals.
[
[-58,486,-44,.84], [58,486,44,.84],
[-42,478,-27,1], [42,478,27,1],
[0,458,0,1.03],
[-76,501,-67,.94], [76,501,67,.94],
[-101,523,-84,.94], [101,523,84,.94],
[-51,524,-42,1.08], [51,524,42,1.08],
[-26,535,-20,1.12], [26,535,20,1.12],
[0,540,0,1.15]
].forEach((v,i)=>petal(...v,"flowerPetal",i<5?22:0));

// A few pale foreground petals give the bright reference look.
[
[-38,538,-30,1.05], [38,538,30,1.05], [0,548,0,1.08]
].forEach(v=>petal(...v,"lightPetal",0));

const core=el("g",{class:"flowerPart",opacity:0},flower);
el("ellipse",{cx:690,cy:520,rx:74,ry:88,fill:"url(#core)"},core);
el("ellipse",{cx:690,cy:520,rx:27,ry:34,fill:"#fffdf2",opacity:.95,filter:"url(#pinkGlow)"},core);
for(let i=0;i<26;i++){
  const a=i*Math.PI*2/26, x=690+Math.cos(a)*(25+Math.random()*32), y=520+Math.sin(a)*(22+Math.random()*40);
  el("circle",{cx:x,cy:y,r:1.4+Math.random()*1.2,fill:"#fff2c8",opacity:.75,filter:"url(#goldGlow)"},core);
}

// Lower stem and two small leaves visible beneath the bloom.
el("path",{class:"vine outer",d:"M690 565 C688 620 688 687 690 760"},flower);
addLeaf(684,682,202,.72); addLeaf(696,684,-22,.72);

// Animation: vines draw first, bud/petals open in layers, then a gentle breathing glow.
const allVines=[...document.querySelectorAll("#vines .vine")];
allVines.forEach(p=>{const len=p.getTotalLength?.()||1200;p.style.strokeDasharray=len;p.style.strokeDashoffset=len});
const total=9200;
const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;

function animate(now){
  const t=(now%total)/total;
  const draw=Math.min(1,Math.max(0,(t-.015)/.34));
  allVines.forEach((p,i)=>{
    const q=Math.min(1,Math.max(0,draw*1.18-i*.035));
    p.style.strokeDashoffset=(1-q)*(p.getTotalLength?.()||1200);
  });

  const open=Math.min(1,Math.max(0,(t-.31)/.49));
  parts.forEach((o,i)=>{
    const q=ease(Math.min(1,Math.max(0,(open-i*.035)/.82)));
    const [x,y,r,s]=o.final;
    o.g.style.opacity=q;
    const ss=.035+(s-.035)*q;
    const yy=520+(y-520)*q;
    o.g.style.transform=`translate(${x} ${yy}) rotate(${r}) scale(${ss})`;
  });
  const cq=ease(Math.min(1,Math.max(0,(open-.35)/.55)));
  core.style.opacity=cq;

  if(open>.9){
    const pulse=1+Math.sin(now/720)*.018;
    flower.style.transform=`scale(${pulse})`;
    flower.style.transformOrigin="690px 520px";
  } else flower.style.transform="";

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

function sparkle(now){
  [...stars.children].forEach(s=>{
    const p=+s.dataset.phase;
    s.setAttribute("opacity",(0.08+0.62*(.5+.5*Math.sin(now/900+p))).toFixed(3));
  });
  requestAnimationFrame(sparkle);
}
requestAnimationFrame(sparkle);
