import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import "./Night26.css";

const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/";
const H = (f) => `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(CDN + f)}&w=900&q=85`;
const USD_TO_MAD = 9.96;
const mad = (usd) => Math.round(usd * USD_TO_MAD);

const raw = [
 ["Cobalt Shell","hf_20261113_092602_2edcdd38-47f9-40ca-b2f0-3d1196e356ed.png","rgba(40,80,255,.30)",[["Cobalt Rain Shell",425,[300,1080],[.60,.30]],["Wide Cargo Pant",165,[1020,2010],[.38,.70]]]],
 ["Silver Signal","hf_20261113_092602_489603db-d621-4dac-8dad-0aaf42f0d15c.png","rgba(200,210,230,.24)",[["Mirror Down Parka",650,[230,1100],[.62,.30]],["Straight Tech Trouser",180,[1040,2010],[.38,.72]]]],
 ["Night Run","hf_20261113_092516_b5bd2ecc-b375-46e1-bb83-eca3e17f818b.png","rgba(70,78,96,.32)",[["Storm Hooded Shell",390,[230,1040],[.62,.30]],["Wide Cargo Pant",165,[1000,2010],[.38,.70]]]],
 ["Long Hour","hf_20261113_092601_1b201cc2-e88d-4501-80a3-6907b149777a.png","rgba(80,86,100,.30)",[["Hooded Long Parka",720,[260,1440],[.62,.36]],["Straight Tech Trouser",180,[1360,2010],[.40,.82]]]],
 ["Gallery Opening","hf_20261113_092603_fceeb6f1-9ee2-4883-8e0f-3327ae0bab7a.png","rgba(90,96,110,.30)",[["Quilted Down Vest",310,[240,1110],[.58,.30]],["Graphite Cargo Pant",175,[1060,2010],[.38,.70]]]],
 ["Soft Static","hf_20261113_092602_91acecdf-be55-4f27-b413-012a4615763a.png","rgba(110,112,120,.26)",[["Graphite Fleece Half-Zip",210,[320,1000],[.60,.28]],["Pleated Wide Trouser",195,[940,2010],[.40,.70]]]]
];
const LOOKS = raw.map(([name,file,tone,items],i) => {
 const image=H(file);
 return {name,image,tone,pieces:items.map(([title,usd,crop,pin],j)=>({id:`night26-${i}-${j}`,name:title,usd,price:mad(usd),crop,pin,image}))};
});
const depth=[[0,0,1,0,0,1,1],[1,160,.94,12,1.2,.90,1],[2,284,.85,59,4,.72,1],[3,362,.78,95,8,.55,.55],[3.6,392,.74,110,11,.48,0]];
const wrap=n=>((n+3)%6+6)%6-3;
function values(a){for(let k=1;k<depth.length;k++){if(a<=depth[k][0]){const p=depth[k-1],q=depth[k],t=(a-p[0])/(q[0]-p[0]);return p.slice(1).map((v,j)=>v+(q[j+1]-v)*t)}}return depth[4].slice(1)}
function I({type}) {
 const p={menu:<path d="M4 7h16M4 17h16"/>,search:<><circle cx="10.8" cy="10.8" r="6.3"/><path d="m16 16 4 4"/></>,user:<><circle cx="12" cy="8" r="3.5"/><path d="M4.5 20c.8-3.5 3.2-5.2 7.5-5.2s6.7 1.7 7.5 5.2"/></>,bag:<><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></>,left:<path d="M19 12H5m7-7-7 7 7 7"/>,right:<path d="M5 12h14m-7-7 7 7-7 7"/>,pause:<path d="M8 6v12M16 6v12"/>,play:<path d="m9 6 10 6-10 6V6Z" fill="currentColor"/>};
 return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{p[type]}</svg>
}
function Thumbnail({piece}) {
 const scale=96/(piece.crop[1]-piece.crop[0]);
 return <div className="n26-thumb" style={{backgroundImage:`url("${piece.image}")`,backgroundSize:`auto ${2048*scale}px`,backgroundPosition:`center -${piece.crop[0]*scale}px`}}/>;
}

export default function Night26(){
 const ctx=useContext(ShopContext)||{}, {addToCart,cartItems=[],removeFromCart}=ctx;
 const runway=useRef(null), models=useRef([]), bag=useRef(null), pos=useRef(2), raf=useRef(0), timer=useRef(0), drag=useRef(null), activeRef=useRef(2), goRef=useRef(()=>{});
 const [active,setActive]=useState(2),[geom,setGeom]=useState({}),[playing,setPlaying]=useState(true),[progress,setProgress]=useState(0);
 const [busy,setBusy]=useState(false),[pins,setPins]=useState(true),[hover,setHover]=useState(-1),[pinOpen,setPinOpen]=useState(-1),[toast,setToast]=useState("");
 const [pointer,setPointer]=useState({x:-100,y:-100,visible:false}),[flyers,setFlyers]=useState([]),[sweep,setSweep]=useState(false);
 const look=LOOKS[active],pieces=look.pieces;
 const inBag=useMemo(()=>{const m=new Map();cartItems.forEach((it,i)=>{if(String(it.id||"").startsWith("night26-"))m.set(String(it.id),{it,i})});return m},[cartItems]);
 const count=[...inBag.values()].reduce((n,v)=>n+(v.it.quantity||1),0);
 const sum=pieces.reduce((n,p)=>n+p.price,0),bundle=Math.round(sum*.9),full=pieces.every(p=>inBag.has(p.id));
 useEffect(()=>{document.body.classList.add("night26-active");LOOKS.forEach(l=>{const im=new Image();im.src=l.image;im.decode?.().catch(()=>{});});return()=>document.body.classList.remove("night26-active")},[]);
 const measure=useCallback(()=>{const e=runway.current;if(!e)return;const w=e.clientWidth,h=e.clientHeight,n=innerWidth<=820,mh=Math.min(h*(n?.66:.705),w*(n?1.05:.92));setGeom({w,h,n,mh,mw:mh*421/634,u:mh/634,cx:w*(n?.5:.523),feet:h*(n?.86:.85)})},[]);
 useEffect(()=>{measure();const ro=runway.current&&window.ResizeObserver?new ResizeObserver(measure):null;if(ro&&runway.current)ro.observe(runway.current);addEventListener("resize",measure);return()=>{ro?.disconnect();removeEventListener("resize",measure)}},[measure]);
 const paint=useCallback(v=>{pos.current=v;const {u,cx,feet,mh}=geom;if(!mh)return;LOOKS.forEach((_,i)=>{const el=models.current[i];if(!el)return;const d=wrap(i-v),a=Math.abs(d),[x,s,l,b,br,o]=values(a);el.style.transform=`translate3d(${cx+Math.sign(d)*x*u}px,${feet-l*u-mh}px,0) scale(${s})`;el.style.filter=`blur(${b*Math.max(.6,u)}px) brightness(${br})`;el.style.opacity=o;el.style.zIndex=100-Math.round(a*10);el.classList.toggle("is-centre",a<.5)})},[geom]);
 useEffect(()=>paint(pos.current),[paint]);
 const say=m=>{setToast(m);clearTimeout(say.t);say.t=setTimeout(()=>setToast(""),1700)};
 const startTimer=useCallback(()=>{clearInterval(timer.current);let start=performance.now();if(!playing)return;timer.current=setInterval(()=>{if(drag.current)return;const t=performance.now()-start;setProgress(Math.min(1,t/5200));if(t>=5200)goRef.current((activeRef.current+1)%6,1)},40)},[playing]);
 const go=useCallback((idx,dir)=>{const target=(idx+6)%6;let d=wrap(target-pos.current);if(Math.abs(d)===3&&dir)d=3*Math.sign(dir);if(Math.abs(d)<.001)return;clearInterval(timer.current);setActive(target);activeRef.current=target;setBusy(true);setPins(false);setPinOpen(-1);setHover(-1);setPointer(p=>({...p,visible:false}));const from=pos.current,to=from+d,start=performance.now(),duration=760+(Math.abs(d)-1)*140;const tick=now=>{const t=Math.min(1,(now-start)/duration),e=1-Math.pow(1-t,4.2);paint(from+(to-from)*e);if(t<1)raf.current=requestAnimationFrame(tick);else{pos.current=target;paint(target);setPins(true);setTimeout(()=>setBusy(false),420);startTimer()}};cancelAnimationFrame(raf.current);raf.current=requestAnimationFrame(tick)},[paint,startTimer]);
 useEffect(()=>{goRef.current=go},[go]);useEffect(()=>{activeRef.current=active},[active]);
 useEffect(()=>{startTimer();return()=>clearInterval(timer.current)},[startTimer,active]);
 useEffect(()=>{let id;const tick=()=>{if(!geom.n&&!drag.current){const el=document.elementFromPoint(pointer.x,pointer.y),hit=el?.closest?.(".n26-hit"),i=hit?+hit.dataset.index:-1;setPointer(p=>({...p,visible:i>=0&&Math.abs(wrap(i-pos.current))>=.5}))}else setPointer(p=>p.visible?({...p,visible:false}):p);id=requestAnimationFrame(tick)};id=requestAnimationFrame(tick);return()=>cancelAnimationFrame(id)},[geom.n,pointer.x,pointer.y]);
 useEffect(()=>{const key=e=>{if(e.key==="ArrowLeft")go((activeRef.current+5)%6,-1);if(e.key==="ArrowRight")go((activeRef.current+1)%6,1);if(e.code==="Space"&&!["INPUT","TEXTAREA"].includes(document.activeElement?.tagName)){e.preventDefault();setPlaying(v=>!v)}};addEventListener("keydown",key);return()=>removeEventListener("keydown",key)},[go]);
 const pointerDown=e=>{if(e.pointerType==="mouse"&&e.button!==0)return;drag.current={x:e.clientX,start:pos.current,moved:false};clearInterval(timer.current);e.currentTarget.setPointerCapture?.(e.pointerId)};
 const pointerMove=e=>{setPointer({x:e.clientX,y:e.clientY,visible:false});if(!drag.current)return;const dx=e.clientX-drag.current.x;if(Math.abs(dx)>5)drag.current.moved=true;if(drag.current.moved&&geom.u)paint(drag.current.start-dx/(170*geom.u))};
 const pointerUp=()=>{if(!drag.current)return;const moved=drag.current.moved;drag.current=null;if(moved){go(Math.round(pos.current));}else startTimer()};
 const fly=piece=>{const a=document.querySelector(`[data-piece="${piece.id}"] .n26-thumb`)?.getBoundingClientRect(),b=bag.current?.getBoundingClientRect();if(!a||!b)return;const id=Date.now()+piece.id;setFlyers(v=>[...v,{id,image:piece.image,x:a.left,y:a.top,tx:b.left+b.width/2,ty:b.top+b.height/2}]);setTimeout(()=>setFlyers(v=>v.filter(f=>f.id!==id)),800)};
 const add=piece=>{if(inBag.has(piece.id)){removeFromCart?.(inBag.get(piece.id).i);say("Removed from bag");return}const data={id:piece.id,name:piece.name,price:piece.price,new_price:piece.price,old_price:piece.price,image:piece.image,img:piece.image,images:[piece.image],category:"Night ’26 Shell",brand:"LANADA"};fly(piece);addToCart?.(piece.id,"One Size",data);say(`${piece.name} added`)};
 const addAll=()=>{const missing=pieces.filter(p=>!inBag.has(p.id));if(!missing.length){say("Full look already in your bag");return}missing.forEach((p,i)=>setTimeout(()=>{fly(p);addToCart?.(p.id,"One Size",{id:p.id,name:p.name,price:p.price,new_price:p.price,old_price:p.price,image:p.image,img:p.image,images:[p.image],category:"Night ’26 Shell",brand:"LANADA"})},i*120));setSweep(true);setTimeout(()=>setSweep(false),720);say(`${look.name} — full look added · saved 10%`)};
 return <main className="night26-page"><div className="n26-stage">
 <section className="n26-runway" ref={runway} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
  <div className="n26-floor-glow" style={{background:`radial-gradient(closest-side,${look.tone},transparent)`}}/>
  <header className="n26-title"><h1>Night ’26 Shell</h1><p>Six looks, styled head to toe. Tap a pin to see the piece.</p></header>
  <div className="n26-models" style={{"--mh":`${geom.mh||0}px`,"--mw":`${geom.mw||0}px`}}>{LOOKS.map((l,i)=><div className="n26-model" key={l.name} ref={e=>models.current[i]=e}><div className="n26-figure" style={{backgroundImage:`url("${l.image}")`}}/><button className="n26-hit" data-index={i} aria-label={`View ${l.name}`} onClick={()=>{if(i!==activeRef.current)go(i,wrap(i-activeRef.current))}}/></div>)}</div>
  {pins&&!geom.n&&pieces.map((p,i)=><button key={p.id} className={`n26-pin ${hover===i||pinOpen===i?"is-open":""}`} style={{left:`${geom.cx-geom.mw/2+p.pin[0]*geom.mw}px`,top:`${geom.feet-geom.mh+p.pin[1]*geom.mh}px`,animationDelay:`${120+i*120}ms`}} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(-1)} onClick={()=>setPinOpen(v=>v===i?-1:i)}><span className="n26-pin-dot"><i/></span><span className="n26-pin-tip"><b>{p.name}</b><small>{p.price.toLocaleString("en-US")} DH</small></span></button>)}
  <nav className="n26-pill"><button className="n26-nav-icon"><I type="menu"/></button><i className="n26-separator"/><Link to="/" className="n26-wing" aria-label="LANADA"><svg viewBox="0 0 56 24"><path d="M3 17c9-1 14-7 19-13 1 6-1 10-5 13 9-1 16-7 23-13-1 8-5 13-12 16 8-1 15-4 24-10-4 8-12 12-22 12H3Z" fill="currentColor"/></svg></Link><i className="n26-separator"/><button className="n26-nav-icon"><I type="search"/></button><Link to="/login" className="n26-nav-icon"><I type="user"/></Link><Link to="/cart" className="n26-nav-icon n26-bag" ref={bag}><I type="bag"/><span className={count?"n26-badge has-items":"n26-badge"}>{count}</span></Link></nav>
  {toast&&<div className="n26-toast">{toast}</div>}
  <div className="n26-controls"><button className="n26-round" onClick={()=>go((active+5)%6,-1)}><I type="left"/></button><div className="n26-timeline">{LOOKS.map((l,i)=><button key={l.name} className={`n26-seg ${active===i?"active":""}`} onClick={()=>go(i,wrap(i-active))}><span className="n26-track"><i style={{width:i<active?"100%":i===active?`${progress*100}%`:"0%"}}/></span><span className="n26-seg-label"><b>{String(i+1).padStart(2,"0")}</b><em>{l.name}</em></span></button>)}</div><button className="n26-play" onClick={()=>setPlaying(v=>!v)}><I type={playing?"pause":"play"}/></button><button className="n26-round" onClick={()=>go((active+1)%6,1)}><I type="right"/></button></div>
  <div className={`n26-view-cursor ${pointer.visible&&!geom.n?"visible":""}`} style={{left:pointer.x,top:pointer.y}}>VIEW</div>
 </section>
 <aside className="n26-side"><div className="n26-side-head"><h2>In this <span>look</span></h2><small>2 PIECES</small></div>
 <div className="n26-cards">{pieces.map((p,i)=><article key={p.id} data-piece={p.id} className={`n26-card ${busy?"is-busy":""} ${hover===i?"pin-highlight":""}`} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(-1)}><Thumbnail piece={p}/><span className="n26-card-index">{i+1}</span><div className="n26-card-info"><strong>{p.name}</strong><span>{p.price.toLocaleString("en-US")} DH</span></div><button className={`n26-add ${inBag.has(p.id)?"added":""}`} onClick={()=>add(p)}>{inBag.has(p.id)?"×":"+"}</button><div className="n26-skeleton"><i/><i/></div></article>)}</div>
 <div className="n26-bundle"><div><strong>Complete the look</strong><p>Bundle all 2 and save 10%</p></div><div className="n26-bundle-price"><del>{sum.toLocaleString("en-US")} DH</del><b>{bundle.toLocaleString("en-US")} <small>DH</small></b></div></div>
 <button className={`n26-cta ${full?"in-bag":""} ${sweep?"sweeping":""}`} onClick={addAll}><span>{full?"FULL LOOK IN BAG":"ADD FULL LOOK TO BAG"}</span><I type="right"/><i/></button><p className="n26-currency-note">Prices shown in Moroccan dirhams (DH).</p>
 </aside></div>
 {flyers.map(f=><div key={f.id} className="n26-flyer" style={{"--x":`${f.x}px`,"--y":`${f.y}px`,"--tx":`${f.tx}px`,"--ty":`${f.ty}px`,backgroundImage:`url("${f.image}")`}}/>)}
 </main>
}
