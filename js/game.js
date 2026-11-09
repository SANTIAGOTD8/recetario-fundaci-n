// Ninguna escalera ni serpiente empieza en múltiplo de 3 (esas casillas son de receta).
const L={4:23,8:29,20:41,34:56,50:71,67:86,80:99},S={98:79,92:71,64:43,55:35,49:26,31:11};
const FC={};F.forEach((_,i)=>{FC[(i+1)*3]=i});
const $=id=>document.getElementById(id),sleep=ms=>new Promise(r=>setTimeout(r,ms)),EM=['🐸','🐰','🐻','🦊'];
let np=2,P=[],t=0,busy=0,got=new Set;
let ck=new Set;try{got=new Set(JSON.parse(localStorage.getItem('rg')||'[]'));ck=new Set(JSON.parse(localStorage.getItem('rk')||'[]'))}catch(e){}
const openM=()=>{$('md').hidden=false;const b=$('mb').querySelector('button');if(b)b.focus()};
const sv=()=>{try{localStorage.setItem('rg',JSON.stringify([...got]));localStorage.setItem('rk',JSON.stringify([...ck]))}catch(e){}};
let ac,mg,sfx=1,mus=1,mt=0,ms=0,mi=4;try{sfx=localStorage.getItem('rs')!=='0';mus=localStorage.getItem('rm')!=='0'}catch(e){}
const AC=()=>{if(!ac){ac=new(window.AudioContext||window.webkitAudioContext)();mg=ac.createGain();mg.gain.value=.5;mg.connect(ac.destination)}if(ac.state==='suspended')ac.resume();return ac};
const tone=(f,t0,d,v,ty)=>{const a=AC(),o=a.createOscillator(),g=a.createGain();o.type=ty||'sine';o.frequency.value=f;g.gain.setValueAtTime(.0001,t0);g.gain.linearRampToValueAtTime(v,t0+.02);g.gain.exponentialRampToValueAtTime(.0001,t0+d);o.connect(g);g.connect(mg);o.start(t0);o.stop(t0+d+.05)};
const beep=(f,d)=>{if(!sfx)return;try{tone(f,AC().currentTime,d+.1,.12,'triangle')}catch(e){}};
// Música: melodía pentatónica suave que se genera sola, sobre un bajo C-Am-F-G
const PEN=[262,294,330,392,440,523,587,659,784],BASS=[131,110,175,196];
function musicTick(){try{const t0=AC().currentTime+.05;
if(ms%8===0){const r=BASS[(ms/8)%4];tone(r,t0,1.7,.1,'sine');tone(r*2,t0,1.7,.04,'sine')}
if(ms%2===0||Math.random()<.3){mi=Math.max(0,Math.min(PEN.length-1,mi+[-2,-1,-1,0,1,1,2][Math.floor(Math.random()*7)]));tone(PEN[mi],t0,.6,.07,'triangle')}
ms++}catch(e){}}
function musicSet(on){mus=on;try{localStorage.setItem('rm',on?'1':'0')}catch(e){}clearInterval(mt);mt=0;$('mu').textContent=on?'🎵':'🔇';if(on&&!document.hidden){mt=setInterval(musicTick,230);musicTick()}}
const pos=n=>{const r=Math.floor((n-1)/10),k=(n-1)%10,c=r%2?9-k:k;return[c*10+5,(9-r)*10+5]};
let o='';
for(const[a,b]of Object.entries(L)){const[x1,y1]=pos(+a),[x2,y2]=pos(b),dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy),nx=-dy/len*1.4,ny=dx/len*1.4,n=Math.floor(len/3.4);
o+=`<g class="lad"><line x1="${x1+nx}" y1="${y1+ny}" x2="${x2+nx}" y2="${y2+ny}"/><line x1="${x1-nx}" y1="${y1-ny}" x2="${x2-nx}" y2="${y2-ny}"/>`;
for(let i=1;i<n;i++){const k=i/n;o+=`<line class="rg" x1="${x1+dx*k+nx}" y1="${y1+dy*k+ny}" x2="${x1+dx*k-nx}" y2="${y1+dy*k-ny}"/>`}o+='</g>'}
for(const[a,b]of Object.entries(S)){const[x1,y1]=pos(+a),[x2,y2]=pos(b),dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy)||1,px=-dy/len*6,py=dx/len*6,d=`M${x1} ${y1}Q${x1+dx*.25+px} ${y1+dy*.25+py} ${x1+dx*.5} ${y1+dy*.5}T${x2} ${y2}`;
o+=`<path class="sn" d="${d}"/><path class="sn2" d="${d}"/><circle class="hd" cx="${x1}" cy="${y1}" r="2.4"/><circle class="ey" cx="${x1-.9}" cy="${y1-.6}" r=".5"/><circle class="ey" cx="${x1+.9}" cy="${y1-.6}" r=".5"/>`}
$('ov').innerHTML=o;
const OFF=[[-2.4,-2.4],[2.4,-2.4],[-2.4,2.4],[2.4,2.4]];
function build(){let h='';for(let r=9;r>=0;r--)for(let c=0;c<10;c++){const n=r*10+(r%2?10-c:c+1),f=FC[n];h+=`<div class="c${f!=null?' f':''}${(r+c)%2?' a':''}"${f!=null?` data-i="${f}" title="${F[f][0]}"`:''}><small>${n}</small>${f!=null?`<span class="em">${F[f][1]}</span>`:''}</div>`}$('g').innerHTML=h}
function draw(){P.forEach((p,i)=>{if(!p.el){p.el=document.createElement('span');p.el.className='tk';p.el.textContent=p.e;$('tk').appendChild(p.el)}
const[x,y]=pos(p.pos),sh=P.filter(q=>q.pos==p.pos).length>1?OFF[i]:[0,0];p.el.style.left=(x+sh[0])+'%';p.el.style.top=(y+sh[1])+'%';p.el.classList.toggle('me',i==t)});
document.querySelectorAll('.c.f').forEach(c=>c.classList.toggle('d',got.has(+c.dataset.i)));
$('pb').innerHTML=P.map((p,i)=>`<div class="pc${i==t?' on':''}"><span>${p.e}</span><b>${p.pos}</b></div>`).join('')}
const turn=()=>{$('st').textContent=`Turno de ${P[t].n}`;draw()},msg=x=>$('st').textContent=x,cnt=()=>{$('pg').style.width=got.size/F.length*100+'%';$('bkb').textContent=`📖 Mi recetario (${got.size}/${F.length})`;$('pl').textContent=ck.size?'🍽️ Tu plato: '+[...ck].map(i=>F[i][1]).join(' '):'🍽️ Cocina una receta para llenar tu plato'};
const tts=s=>{if(!window.speechSynthesis)return;speechSynthesis.cancel();if(s){const u=new SpeechSynthesisUtterance(s);u.lang='es-CO';speechSynthesis.speak(u)}};
function recipe(i,mark){return new Promise(res=>{
const[f,e,ti,ing,st]=F[i],ps=st.split('|'),is=ing.split(', '),ad=new Set,
tp=/Licúa/.test(st)?'🥤 Con licuadora':/cocin|cocín|hierv|hiérv|fríe|sofr|dora|saltea/i.test(st)?'🔥 Con estufa':'🥣 Sin estufa',mn=ps.reduce((a,x)=>a+ +((x.match(/(\d+) minuto/)||[])[1]||0),0)||5,lv=mn<=20?'🟢 Fácil':'🟡 Media';
let k=0,tm=0;
const close=()=>{clearInterval(tm);tts();$('md').hidden=true;res()};
const fin=()=>{ck.add(i);got.add(i);sv();cnt();close()};
const info=()=>{clearInterval(tm);$('mb').innerHTML=`<div class="big">${e}</div><h2>${f}</h2><h3>${ti}</h3><div class="chips"><span>${tp}</span><span>⏱ ${mn} min</span><span>${lv}</span></div><p><b>Ingredientes:</b> ${ing}</p><ol>${ps.map(s=>`<li>${s}</li>`).join('')}</ol>${TR[f]?`<p class="tip">🛒 <b>Cómo escogerla y guardarla:</b> ${TR[f]}</p>`:''}<p class="mut">👩‍🍳 Pide ayuda a un adulto para cuchillos y estufa. Lava bien tus manos y los alimentos.</p><button id="sp">🔊 Escuchar</button><button id="cb" class="go">👩‍🍳 ¡Cocinar!</button><button id="ok">${mark?'Guardar y seguir':'Cerrar'}</button>`;
$('sp').onclick=()=>tts(`${ti}. Ingredientes: ${ing}. Pasos: ${ps.join('. ')}`);
$('cb').onclick=()=>{tts();cook()};
$('ok').onclick=()=>{if(mark){got.add(i);sv();cnt()}close()}};
const cook=()=>{clearInterval(tm);
const all=ad.size>=is.length,end=k>=ps.length,m=end?0:+((ps[k].match(/(\d+) minuto/)||[])[1]||0);
let h=`<div class="big" id="bf">${e}</div><h3>${ti}</h3>`;
if(end)h+=`<div class="big">🎉🍽️</div><h2>¡Plato listo!</h2><p>Ya sabes preparar ${f.toLowerCase()}. ¡Ahora cocínalo de verdad y compártelo!</p><button id="dn" class="go">Cerrar</button>`;
else if(!all)h+=`<p><b>Alista los ingredientes</b> · toca cada uno (${ad.size}/${is.length})</p><div class="ing">${is.map((x,j)=>`<button class="in${ad.has(j)?' g':''}" data-j="${j}">${ad.has(j)?'✅ ':''}${x}</button>`).join('')}</div>`;
else h+=ps.map((s,j)=>`<div class="stp ${j<k?'dn':j==k?'on':''}"><b>${j<k?'✅':j+1}</b><span>${s}</span></div>`).join('')+(m&&m<=40?`<button id="tb" class="go">⏱ Iniciar ${m} min</button>`:`<button id="nx" class="go">Hecho ✅</button>`);
if(!end)h+=`<br><button id="bk">⬅ Volver</button>`;
$('mb').innerHTML=h;$('bf').classList.add('bounce');
if(end){beep(523,.15);setTimeout(()=>beep(784,.3),160);$('dn').onclick=fin}
document.querySelectorAll('.ing .in').forEach(b=>b.onclick=()=>{ad.add(+b.dataset.j);beep(500,.08);cook()});
if($('bk'))$('bk').onclick=info;
if($('nx'))$('nx').onclick=()=>{k++;beep(660,.12);cook()};
if($('tb'))$('tb').onclick=()=>{let s=m*60;const tb=$('tb');$('bf').insertAdjacentHTML('afterend','<div class="st big">♨️</div>');tm=setInterval(()=>{s--;if(s<=0){beep(880,.5);k++;cook()}else tb.textContent=`🔥 ${Math.floor(s/60)}:${String(s%60).padStart(2,'0')} · toca para saltar`},1000);tb.textContent=`🔥 ${m}:00 · toca para saltar`;tb.onclick=()=>{k++;beep(660,.12);cook()}}};
info();openM()})}
function book(){$('mb').innerHTML=`<h2>📖 Mi recetario (${got.size}/${F.length})</h2><p class="mut">Toca una comida para leer su receta. ⭐ descubierta · 🍳 cocinada.</p><div class="bk">${F.map((f,i)=>`<button data-i="${i}" class="${got.has(i)?'g':''}">${f[1]} ${f[0]}${ck.has(i)?' 🍳':got.has(i)?' ⭐':''}</button>`).join('')}</div><button id="ok" class="go">Cerrar</button>`;
openM();$('ok').onclick=()=>$('md').hidden=true;
document.querySelectorAll('.bk button').forEach(b=>b.onclick=async()=>{await recipe(+b.dataset.i,false);book()})}
function win(p){busy=0;$('mb').innerHTML=`<div class="big">🏆</div><h2>¡${p.n} ganó!</h2><p>Descubrieron ${got.size} de ${F.length} recetas. ¡Ahora a cocinar en familia!</p><button id="ag" class="go">Jugar otra vez</button>`;openM();confetti();[523,659,784,1047].forEach((x,i)=>setTimeout(()=>beep(x,.25),i*160));$('ag').onclick=()=>{$('md').hidden=true;start()}}
async function roll(){if(busy)return;busy=1;const p=P[t];let d;$('dice').classList.remove('rl');void $('dice').offsetWidth;$('dice').classList.add('rl');
for(let i=0;i<8;i++){d=1+Math.floor(Math.random()*6);$('dice').textContent=String.fromCharCode(9855+d);beep(300+i*40,.05);await sleep(70)}
if(p.pos+d>100)msg('Necesitas el número exacto para llegar al 100 🎯');
else{for(let i=0;i<d;i++){p.pos++;draw();await sleep(260)}
const j=L[p.pos]||S[p.pos];
if(j){const up=!!L[p.pos];msg(up?'🪜 ¡Escalera de la huerta! ¡Subes!':'🐍 ¡Serpiente traviesa! ¡Bajas!');pop(up?'🪜 ¡Subes!':'🐍 ¡Bajas!');vib(up?[30,40,30]:[90]);[0,1,2,3].forEach(i=>setTimeout(()=>beep(up?400+i*120:700-i*120,.1),i*90));await sleep(900);p.el.style.transitionDuration='.7s';p.pos=j;draw();await sleep(800);p.el.style.transitionDuration=''}
const f=FC[p.pos];if(f!=null){pop(F[f][1]+' '+F[f][0]);vib(40);beep(660,.12);setTimeout(()=>beep(880,.15),130);await sleep(750);await recipe(f,true)}
if(p.pos==100){win(p);return}}
await sleep(500);t=(t+1)%P.length;turn();busy=0}
function start(){P=EM.slice(0,np).map((e,i)=>({e,n:`${e} Jugador ${i+1}`,pos:1}));t=0;busy=0;$('su').hidden=true;$('gm').hidden=false;$('dice').textContent='🎲';$('tk').innerHTML='';build();musicSet(mus);turn();cnt()}
document.querySelectorAll('#su [data-n]').forEach(b=>b.onclick=()=>{np=+b.dataset.n;document.querySelectorAll('#su [data-n]').forEach(x=>x.classList.toggle('on',x==b))});
$('gob').onclick=start;$('rb').onclick=roll;$('bkb').onclick=book;$('nw').onclick=()=>{if(busy)return;$('gm').hidden=true;$('su').hidden=false};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('md').hidden){const b=$('mb').querySelector('#ok');if(b)b.click()}});

const vib=p=>{try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}};
const pop=x=>{const e=$('pp');e.textContent=x;e.hidden=false;e.classList.remove('pp2');void e.offsetWidth;e.classList.add('pp2');clearTimeout(pop.t);pop.t=setTimeout(()=>e.hidden=true,1400)};
const confetti=()=>{for(let i=0;i<48;i++){const e=document.createElement('i');e.className='cf';e.textContent=['🥕','🍅','🥦','🍋','⭐','🌽'][i%6];e.style.cssText=`left:${Math.random()*100}vw;animation-delay:${Math.random()*.8}s;font-size:${18+Math.random()*16}px`;document.body.appendChild(e);setTimeout(()=>e.remove(),3600)}};
$('g').onclick=e=>{const c=e.target.closest('.c.f');if(!c||busy||!P.length)return;const i=+c.dataset.i;got.has(i)?recipe(i,false):pop('🔒 Aún no descubres esta receta')};
$('mu').onclick=()=>musicSet(!mus);
$('sf').textContent=sfx?'🔔':'🔕';$('mu').textContent=mus?'🎵':'🔇';
$('sf').onclick=()=>{sfx=!sfx;$('sf').textContent=sfx?'🔔':'🔕';try{localStorage.setItem('rs',sfx?'1':'0')}catch(e){}};
document.addEventListener('visibilitychange',()=>{clearInterval(mt);if(!document.hidden&&mus&&mt)mt=setInterval(musicTick,230)});
new MutationObserver(()=>{if(mg)mg.gain.setTargetAtTime($('md').hidden?.5:.22,ac.currentTime,.2)}).observe($('md'),{attributes:true,attributeFilter:['hidden']});
