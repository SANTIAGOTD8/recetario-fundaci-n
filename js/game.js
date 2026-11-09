// Ninguna escalera ni serpiente empieza en múltiplo de 3 (esas casillas son de receta).
const L={4:23,8:29,20:41,34:56,50:71,67:86,80:99},S={98:79,92:71,64:43,55:35,49:26,31:11};
const FC={};F.forEach((_,i)=>{FC[(i+1)*3]=i});
const $=id=>document.getElementById(id),sleep=ms=>new Promise(r=>setTimeout(r,ms)),EM=['🐸','🐰','🐻','🦊'];
let np=2,P=[],t=0,busy=0,got=new Set;
let ck=new Set;try{got=new Set(JSON.parse(localStorage.getItem('rg')||'[]'));ck=new Set(JSON.parse(localStorage.getItem('rk')||'[]'))}catch(e){}
const openM=()=>{$('md').hidden=false;const b=$('mb').querySelector('button');if(b)b.focus()};
const sv=()=>{try{localStorage.setItem('rg',JSON.stringify([...got]));localStorage.setItem('rk',JSON.stringify([...ck]))}catch(e){}};
let ac;const beep=(f,d)=>{try{ac=ac||new AudioContext();const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=f;g.gain.value=.08;o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+d)}catch(e){}};
const pos=n=>{const r=Math.floor((n-1)/10),k=(n-1)%10,c=r%2?9-k:k;return[c*10+5,(9-r)*10+5]};
let o='';
for(const[a,b]of Object.entries(L)){const[x1,y1]=pos(+a),[x2,y2]=pos(b);o+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#8a7d52" stroke-width="1.8" stroke-linecap="round" opacity=".6"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#fff" stroke-width=".5" stroke-dasharray="1.5 2" opacity=".9"/><text x="${x1}" y="${y1+1.8}" font-size="5" text-anchor="middle">🪜</text>`}
for(const[a,b]of Object.entries(S)){const[x1,y1]=pos(+a),[x2,y2]=pos(b);o+=`<path d="M${x1} ${y1}Q${(x1+x2)/2+9} ${(y1+y2)/2} ${x2} ${y2}" fill="none" stroke="#b0584d" stroke-width="1.6" stroke-linecap="round" opacity=".6"/><text x="${x1}" y="${y1+1.8}" font-size="5" text-anchor="middle">🐛</text>`}
$('ov').innerHTML=o;
function draw(){let h='';for(let r=9;r>=0;r--)for(let c=0;c<10;c++){const n=r*10+(r%2?10-c:c+1),f=FC[n],ts=P.map(p=>p.pos==n?`<span>${p.e}</span>`:'').join('');h+=`<div class="c${f!=null?' f':''}" title="${f!=null?F[f][0]:''}"><small>${n}</small>${f!=null?F[f][1]:''}${ts?`<span class="ts">${ts}</span>`:''}</div>`}$('g').innerHTML=h}
const turn=()=>$('st').textContent=`Turno de ${P[t].n}`,msg=x=>$('st').textContent=x,cnt=()=>{$('bkb').textContent=`📖 Mi recetario (${got.size}/${F.length})`;$('pl').textContent=ck.size?'🍽️ Tu plato: '+[...ck].map(i=>F[i][1]).join(' '):'🍽️ Cocina una receta para llenar tu plato'};
const tts=s=>{if(!window.speechSynthesis)return;speechSynthesis.cancel();if(s){const u=new SpeechSynthesisUtterance(s);u.lang='es-CO';speechSynthesis.speak(u)}};
function recipe(i,mark){return new Promise(res=>{
const[f,e,ti,ing,st]=F[i],ps=st.split('|'),is=ing.split(', '),ad=new Set,
tp=/Licúa/.test(st)?'🥤 Con licuadora':/cocin|cocín|hierv|hiérv|fríe|sofr|dora|saltea/i.test(st)?'🔥 Con estufa':'🥣 Sin estufa';
let k=0,tm=0;
const close=()=>{clearInterval(tm);tts();$('md').hidden=true;res()};
const fin=()=>{ck.add(i);got.add(i);sv();cnt();close()};
const info=()=>{clearInterval(tm);$('mb').innerHTML=`<div class="big">${e}</div><h2>${f}</h2><h3>${ti}</h3><p class="mut">${tp} · sin horno</p><p><b>Ingredientes:</b> ${ing}</p><ol>${ps.map(s=>`<li>${s}</li>`).join('')}</ol><p class="mut">👩‍🍳 Pide ayuda a un adulto para cuchillos y estufa. Lava bien tus manos y los alimentos.</p><button id="sp">🔊 Escuchar</button><button id="cb" class="go">👩‍🍳 ¡Cocinar!</button><button id="ok">${mark?'Guardar y seguir':'Cerrar'}</button>`;
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
function win(p){busy=0;$('mb').innerHTML=`<div class="big">🏆</div><h2>¡${p.n} ganó!</h2><p>Descubrieron ${got.size} de ${F.length} recetas. ¡Ahora a cocinar en familia!</p><button id="ag" class="go">Jugar otra vez</button>`;openM();$('ag').onclick=()=>{$('md').hidden=true;start()}}
async function roll(){if(busy)return;busy=1;const p=P[t];let d;$('dice').classList.remove('rl');void $('dice').offsetWidth;$('dice').classList.add('rl');
for(let i=0;i<8;i++){d=1+Math.floor(Math.random()*6);$('dice').textContent=String.fromCharCode(9855+d);beep(300+i*40,.05);await sleep(70)}
if(p.pos+d>100)msg('Necesitas el número exacto para llegar al 100 🎯');
else{for(let i=0;i<d;i++){p.pos++;draw();await sleep(260)}
const j=L[p.pos]||S[p.pos];
if(j){msg(L[p.pos]?'🪜 ¡Escalera de la huerta! ¡Subes!':'🐛 ¡Gusanito travieso! ¡Bajas!');await sleep(800);p.pos=j;draw();await sleep(300)}
const f=FC[p.pos];if(f!=null)await recipe(f,true);
if(p.pos==100){win(p);return}}
await sleep(500);t=(t+1)%P.length;turn();busy=0}
function start(){P=EM.slice(0,np).map((e,i)=>({e,n:`${e} Jugador ${i+1}`,pos:1}));t=0;busy=0;$('su').hidden=true;$('gm').hidden=false;$('dice').textContent='🎲';draw();turn();cnt()}
document.querySelectorAll('#su [data-n]').forEach(b=>b.onclick=()=>{np=+b.dataset.n;document.querySelectorAll('#su [data-n]').forEach(x=>x.classList.toggle('on',x==b))});
$('gob').onclick=start;$('rb').onclick=roll;$('bkb').onclick=book;$('nw').onclick=()=>{if(busy)return;$('gm').hidden=true;$('su').hidden=false};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('md').hidden){const b=$('mb').querySelector('#ok');if(b)b.click()}});
