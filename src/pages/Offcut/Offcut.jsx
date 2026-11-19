import React, { useEffect, useRef } from 'react';
import './Offcut.css';

export default function Offcut() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;   
    if (!root) return undefined;
{
  const SW=2048,SH=1360,CW=409.6,CH=530,PAD=50,BW=CW+2*PAD,ROWY=[80,700],N=10,SLOT=108,OPEN=86,CX=750;
  const SHEET = '/Assets/offcut/1.png';
  const products=[
    ['Winged Skull Tee','€48'],['Heavy Blank Tee — Black','€38'],['Heavy Blank Tee — White','€38'],['Offcut Longsleeve','€55'],['Rose & Chain Tee','€52'],
    ['Varsity Jacket','€240'],['No Restocks Longsleeve','€58'],['Arch Logo Hoodie','€95'],['Barbed Heart Tee','€48'],['Black Zip Hoodie','€98']
  ];
  const clips=[
`polygon(52.98% 2.08%,51.41% 3.96%,51.81% 3.96%,52.98% 2.45%,55.34% 2.45%,56.12% 3.21%,56.12% 5.47%,54.55% 7.17%,54.36% 9.25%,51.61% 10.38%,47.88% 15.09%,45.92% 16.60%,44.74% 16.60%,31.20% 23.40%,29.24% 25.28%,25.51% 30.94%,14.13% 53.58%,25.51% 60.19%,28.85% 61.70%,28.26% 82.45%,28.65% 96.79%,45.33% 96.79%,49.25% 96.42%,52.00% 95.66%,56.51% 95.66%,62.60% 96.79%,79.47% 96.79%,80.06% 90.38%,79.87% 61.89%,94.39% 53.77%,83.99% 32.08%,79.47% 24.72%,75.94% 22.26%,64.76% 16.79%,63.58% 16.79%,60.24% 13.96%,59.26% 12.08%,57.50% 10.19%,54.95% 9.25%,54.95% 7.17%,56.71% 5.09%,56.71% 3.58%,55.14% 1.89%)`,
`polygon(53.85% 1.89%,52.47% 2.83%,51.88% 3.96%,52.28% 3.96%,53.45% 2.45%,55.61% 2.45%,56.59% 3.58%,56.59% 5.28%,54.83% 7.17%,54.83% 9.25%,52.47% 10.00%,50.90% 11.51%,49.14% 14.34%,46.39% 16.60%,45.41% 16.60%,35.60% 21.51%,30.89% 24.53%,26.77% 31.13%,26.37% 32.64%,21.86% 41.32%,15.97% 54.34%,24.80% 59.81%,29.51% 62.08%,28.53% 86.23%,28.53% 94.91%,28.92% 96.79%,44.62% 96.79%,48.55% 96.42%,52.28% 95.47%,57.77% 95.47%,60.32% 96.23%,64.05% 96.60%,80.73% 96.79%,80.93% 71.51%,80.53% 62.08%,93.88% 54.53%,93.88% 53.96%,92.90% 52.64%,92.90% 51.13%,83.87% 32.08%,79.55% 24.72%,75.63% 21.89%,71.11% 20.00%,64.84% 16.60%,63.85% 16.60%,61.89% 15.28%,58.16% 10.38%,55.22% 9.25%,55.22% 7.55%,56.79% 5.66%,57.18% 3.77%,55.81% 2.08%)`,
`polygon(49.61% 1.89%,48.43% 2.45%,47.45% 3.96%,47.84% 3.96%,49.02% 2.45%,51.18% 2.45%,52.16% 3.40%,52.16% 5.28%,50.59% 6.98%,50.39% 9.25%,47.65% 10.38%,46.27% 11.70%,44.31% 14.72%,42.15% 16.42%,40.78% 16.60%,30.57% 21.70%,26.45% 24.53%,22.33% 31.32%,12.52% 52.08%,13.70% 54.53%,25.67% 61.51%,24.69% 86.79%,24.69% 95.28%,25.08% 96.79%,32.34% 96.42%,42.35% 96.60%,47.25% 95.85%,51.57% 95.85%,56.08% 96.60%,67.66% 96.42%,75.71% 96.79%,76.10% 96.42%,76.30% 83.21%,75.31% 61.51%,89.44% 53.77%,89.64% 53.21%,87.68% 49.81%,79.24% 31.70%,75.12% 24.91%,71.39% 22.08%,58.24% 15.85%,56.48% 14.15%,53.73% 10.38%,50.98% 9.25%,50.98% 7.17%,52.55% 5.47%,52.75% 3.58%,51.77% 2.26%)`,
`polygon(46.35% 1.89%,45.17% 2.45%,44.19% 3.96%,46.15% 2.26%,47.72% 2.26%,49.10% 3.58%,49.10% 5.09%,47.33% 7.17%,47.14% 9.25%,44.00% 10.75%,41.64% 14.34%,38.70% 16.79%,37.72% 16.79%,25.16% 23.21%,23.00% 25.28%,20.25% 30.75%,15.15% 48.87%,10.24% 71.70%,8.48% 83.58%,8.28% 89.25%,8.87% 91.13%,8.48% 96.23%,16.13% 97.92%,17.11% 97.74%,18.49% 92.83%,19.47% 91.70%,20.45% 89.25%,22.21% 89.06%,22.41% 96.04%,23.00% 96.98%,39.87% 96.60%,44.98% 95.47%,47.14% 95.47%,51.84% 96.42%,61.07% 96.23%,71.86% 96.98%,72.25% 96.79%,72.45% 90.38%,72.84% 90.00%,74.61% 90.19%,76.18% 93.21%,77.55% 97.92%,85.60% 96.79%,85.60% 91.51%,86.19% 90.57%,86.19% 84.53%,84.81% 73.21%,82.06% 58.68%,79.12% 46.04%,75.39% 32.45%,72.65% 26.23%,71.08% 24.15%,57.34% 16.79%,55.97% 16.60%,53.22% 14.15%,51.65% 11.51%,50.47% 10.38%,47.72% 9.25%,47.72% 7.17%,49.49% 5.09%,49.49% 3.58%,48.12% 2.08%)`,
`polygon(45.25% 1.89%,43.29% 3.96%,43.88% 3.96%,45.05% 2.45%,47.21% 2.45%,48.19% 3.40%,48.19% 5.09%,46.43% 7.36%,46.43% 9.25%,43.88% 10.19%,42.31% 11.70%,40.93% 13.96%,38.19% 16.42%,36.81% 16.60%,24.25% 22.83%,21.70% 24.91%,16.21% 34.15%,6.59% 54.15%,21.31% 62.26%,20.72% 80.94%,20.92% 96.79%,39.76% 96.79%,44.66% 96.42%,72.14% 96.79%,72.53% 96.42%,72.53% 76.23%,71.94% 62.26%,79.40% 58.49%,86.07% 54.15%,75.67% 32.08%,71.35% 24.91%,67.03% 21.89%,61.54% 19.43%,59.18% 17.92%,56.63% 16.79%,55.65% 16.79%,53.69% 15.47%,49.96% 10.57%,47.02% 9.25%,47.02% 7.17%,48.39% 5.66%,48.78% 3.77%,47.41% 2.08%)`,
`polygon(52.39% 1.70%,50.43% 3.77%,52.20% 2.26%,54.55% 2.26%,55.53% 3.40%,55.53% 4.91%,53.57% 7.17%,53.57% 9.43%,50.63% 10.57%,47.68% 14.34%,46.31% 14.53%,42.78% 17.74%,41.60% 17.92%,29.24% 24.53%,27.08% 26.60%,24.92% 29.81%,22.17% 37.55%,19.23% 47.92%,15.70% 65.85%,14.72% 76.23%,14.52% 84.72%,15.11% 90.38%,16.68% 92.26%,17.07% 93.40%,17.07% 97.74%,17.66% 98.30%,20.02% 98.68%,25.12% 98.68%,25.71% 98.11%,26.10% 93.40%,27.86% 90.94%,28.45% 88.30%,30.02% 88.30%,30.42% 88.68%,30.61% 92.83%,31.40% 93.58%,60.44% 93.96%,63.19% 93.58%,75.16% 93.77%,75.94% 93.02%,76.33% 88.49%,78.30% 88.30%,78.89% 90.94%,80.85% 93.58%,81.44% 98.30%,82.03% 98.87%,89.29% 98.49%,90.07% 97.92%,90.07% 93.21%,91.84% 90.75%,92.03% 78.49%,90.66% 63.58%,87.91% 49.06%,83.40% 32.83%,81.44% 28.49%,78.10% 24.72%,65.74% 17.92%,64.36% 17.55%,61.03% 14.53%,59.65% 14.34%,56.51% 10.19%,53.96% 9.25%,53.96% 7.36%,55.73% 5.28%,55.93% 3.40%,54.55% 1.89%)`,
`polygon(53.85% 1.13%,52.47% 2.08%,51.88% 3.21%,52.28% 3.21%,53.45% 1.70%,55.61% 1.70%,56.59% 2.64%,56.59% 4.34%,54.83% 6.42%,54.83% 8.30%,51.88% 9.43%,48.74% 13.58%,46.39% 15.47%,45.41% 15.47%,34.22% 20.94%,30.49% 23.21%,28.73% 25.28%,26.18% 31.13%,24.02% 37.74%,22.45% 44.53%,19.31% 63.77%,18.33% 75.66%,18.13% 86.42%,18.72% 91.51%,19.70% 93.21%,19.51% 97.55%,20.88% 98.30%,27.35% 98.87%,28.34% 94.34%,30.10% 94.15%,30.69% 95.85%,30.69% 97.92%,31.28% 98.30%,48.16% 97.92%,51.10% 97.17%,55.22% 97.17%,57.57% 97.92%,65.82% 97.74%,77.79% 98.30%,78.18% 94.72%,79.95% 94.53%,81.12% 98.87%,85.83% 98.68%,88.58% 98.11%,88.78% 93.21%,89.56% 91.89%,90.15% 87.17%,90.15% 79.81%,89.36% 68.11%,86.42% 45.85%,82.69% 30.19%,80.53% 25.28%,78.77% 23.21%,65.03% 15.85%,63.27% 15.47%,61.11% 13.58%,58.16% 9.43%,55.22% 8.30%,55.22% 6.60%,56.99% 4.34%,56.99% 2.64%,55.81% 1.32%)`,
`polygon(48.82% 2.08%,47.06% 3.96%,48.82% 2.45%,50.78% 2.45%,51.96% 3.40%,51.96% 5.47%,50.20% 7.36%,50.20% 9.43%,47.84% 10.38%,41.37% 10.75%,34.50% 12.26%,33.52% 13.21%,33.12% 15.47%,30.57% 20.94%,30.57% 22.26%,25.27% 25.66%,23.70% 27.92%,21.55% 32.83%,16.44% 48.49%,12.32% 68.49%,11.15% 78.11%,10.75% 85.28%,11.34% 90.94%,12.52% 92.45%,12.13% 97.55%,20.37% 99.25%,20.96% 98.68%,22.14% 94.15%,23.70% 92.83%,24.29% 91.70%,25.86% 91.70%,27.04% 93.96%,27.83% 98.11%,34.30% 97.17%,46.08% 96.23%,57.85% 96.42%,72.37% 98.11%,74.14% 92.08%,74.53% 91.70%,76.10% 91.70%,76.69% 93.02%,78.45% 94.91%,79.83% 99.25%,87.68% 98.11%,88.27% 97.74%,87.87% 92.45%,89.05% 91.13%,89.44% 88.11%,89.44% 81.70%,88.66% 73.21%,87.28% 63.96%,83.95% 48.68%,79.24% 33.21%,76.69% 27.92%,74.92% 25.47%,69.62% 22.08%,69.62% 20.75%,67.27% 15.66%,66.68% 13.21%,65.31% 12.08%,62.56% 11.32%,52.94% 10.38%,50.78% 9.62%,50.59% 7.36%,52.16% 5.85%,52.55% 3.77%,52.35% 3.21%,50.59% 1.89%)`,
`polygon(45.96% 1.32%,44.00% 3.02%,44.19% 3.40%,45.96% 1.70%,47.53% 1.70%,48.90% 2.83%,48.90% 4.53%,47.14% 6.42%,46.94% 8.68%,44.00% 9.81%,41.64% 13.21%,38.70% 15.85%,37.32% 16.04%,23.98% 22.64%,21.62% 24.72%,17.90% 30.75%,7.30% 51.70%,21.62% 59.62%,20.84% 75.09%,21.04% 98.87%,33.59% 98.68%,38.50% 99.25%,44.39% 98.30%,50.08% 98.30%,53.61% 99.06%,62.64% 98.68%,72.84% 99.06%,73.23% 98.87%,73.63% 88.68%,73.04% 60.00%,86.77% 52.26%,86.77% 51.70%,76.77% 31.51%,73.04% 25.28%,69.90% 22.45%,57.14% 16.04%,55.97% 16.04%,53.22% 13.77%,50.47% 9.81%,47.53% 8.68%,47.53% 6.42%,49.10% 4.91%,49.49% 3.40%,48.12% 1.51%,46.94% 1.13%)`,
`polygon(45.25% 1.51%,43.29% 3.21%,43.49% 3.58%,45.25% 1.89%,47.02% 1.89%,48.19% 3.02%,48.19% 4.91%,46.43% 6.79%,46.43% 9.06%,43.29% 10.38%,34.46% 11.13%,29.75% 12.26%,28.57% 13.77%,28.18% 15.85%,25.63% 20.94%,25.63% 22.26%,20.13% 25.85%,16.60% 32.64%,13.27% 43.40%,10.32% 55.47%,7.18% 73.77%,6.59% 79.81%,6.59% 87.36%,7.18% 91.13%,8.56% 92.64%,8.36% 97.55%,8.75% 98.11%,16.60% 98.87%,17.97% 93.40%,19.15% 92.45%,19.94% 90.75%,21.70% 90.94%,22.88% 96.98%,23.47% 97.36%,35.44% 96.23%,45.45% 96.42%,46.04% 98.11%,46.62% 97.92%,46.62% 96.60%,47.41% 96.23%,56.44% 96.23%,69.00% 97.36%,69.58% 96.60%,70.57% 91.13%,72.33% 90.94%,73.31% 92.83%,74.29% 93.58%,75.86% 99.06%,83.32% 98.30%,83.71% 97.92%,83.71% 92.83%,84.89% 91.51%,85.48% 88.87%,85.68% 81.13%,85.09% 72.83%,82.34% 55.66%,79.20% 42.45%,76.06% 32.26%,72.72% 25.85%,67.43% 22.26%,67.43% 20.94%,66.05% 18.87%,64.29% 13.02%,61.73% 11.70%,56.83% 10.94%,50.35% 10.57%,48.98% 9.62%,47.02% 9.25%,46.82% 6.98%,48.59% 5.09%,48.78% 3.21%,47.21% 1.51%)`
  ];
  const art=root.querySelector('#art'),rack=root.querySelector('#rack'),cap=root.querySelector('#cap'),capName=cap.querySelector('b'),capPrice=cap.querySelector('span'),big=root.querySelector('#big'),big2=root.querySelector('#big2');
  const num=root.querySelector('#num'),name=root.querySelector('#name'),price=root.querySelector('#price');
  const G=[];let hov=-1,opened=-1;
  function fit() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const k = Math.min(
      viewportWidth / 1500,
      viewportHeight / 1000
    );

    art.style.transform = `scale(${k})`;
    art.style.left = `${(viewportWidth - 1500 * k) / 2}px`;
    art.style.top = `${(viewportHeight - 1000 * k) / 2}px`;
  }
  function paint(el,k){const ew=el.offsetWidth,eh=el.offsetHeight,sx=ew/BW,sy=eh/CH,col=k%5,row=Math.floor(k/5),xb=col*CW-PAD,yb=ROWY[row];el.style.backgroundImage=`url("${SHEET}")`;el.style.backgroundSize=`${SW/BW*ew}px ${SH/CH*eh}px`;el.style.backgroundPosition=`${-xb*sx}px ${-yb*sy}px`;el.style.clipPath=clips[k]}
  function layout(){G.forEach((el,k)=>{let x=CX+(k-(N-1)/2)*SLOT;if(hov>=0&&k!==hov)x+=Math.sign(k-hov)*OPEN;el.style.left=`${x}px`;el.classList.toggle('face',k===hov)});if(hov>=0){cap.style.left=G[hov].style.left;capName.textContent=products[hov][0];capPrice.textContent=products[hov][1];cap.classList.add('on')}else cap.classList.remove('on')}
  for(let k=0;k<N;k++){const g=document.createElement('div'),i=document.createElement('i');g.className='g';g.appendChild(i);rack.appendChild(g);paint(i,k);g.addEventListener('pointerenter',()=>{if(opened<0){hov=k;layout()}});g.addEventListener('click',()=>openG(k));G.push(g)}
  const track=root.querySelector('#track');for(let r=0;r<16;r++)for(const s of ['OFFCUT','•','LIMITED RUN','•','NO RESTOCKS','•']){const span=document.createElement('span');span.textContent=s;track.appendChild(span)}
  rack.addEventListener('pointerleave',()=>{if(opened<0){hov=-1;layout()}});
  function fill(k){num.textContent=String(k+1).padStart(2,'0')+' / '+String(N).padStart(2,'0');name.textContent=products[k][0];price.textContent=products[k][1]}
  function openG(k){if(opened>=0)return;opened=k;hov=k;layout();const gx=parseFloat(G[k].style.left);big.getAnimations().forEach(a=>a.cancel());paint(big,k);fill(k);root.classList.add('open');big.animate([{transform:`translate(${gx-750}px, -8px) scale(.61)`,opacity:1},{transform:'none',opacity:1}],{duration:750,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});G[k].style.visibility='hidden'}
  function step(d){if(opened<0)return;const from=opened;opened=(opened+d+N)%N;fill(opened);G[from].style.visibility='';G[opened].style.visibility='hidden';hov=opened;layout();paint(big2,from);big2.getAnimations().forEach(a=>a.cancel());big2.animate([{transform:'none',opacity:1,filter:'blur(0)'},{transform:`translateX(${-d*120}px) scale(.94)`,opacity:0,filter:'blur(6px)'}],{duration:600,easing:'cubic-bezier(.2,.8,.2,1)'});big.getAnimations().forEach(a=>a.cancel());paint(big,opened);big.animate([{transform:`translateX(${d*120}px) scale(.94)`,opacity:0,filter:'blur(6px)'},{transform:'none',opacity:1,filter:'blur(0)'}],{duration:600,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'})}
  function closeG(){if(opened<0)return;const k=opened,gx=parseFloat(G[k].style.left);big.getAnimations().forEach(a=>a.cancel());big.animate([{transform:'none',opacity:1},{transform:`translate(${gx-750}px, -8px) scale(.61)`,opacity:1}],{duration:650,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});root.classList.remove('open');setTimeout(()=>{G[k].style.visibility='';big.getAnimations().forEach(a=>a.cancel());big.style.opacity='0';opened=-1;hov=-1;layout()},650)}
  root.querySelector('#prev').addEventListener('click',()=>step(-1));root.querySelector('#next').addEventListener('click',()=>step(1));root.querySelector('#close').addEventListener('click',closeG);root.querySelector('.hit').addEventListener('click',closeG);
  const onKeyDown = e=>{if(opened>=0){if(e.key==='ArrowRight')step(1);else if(e.key==='ArrowLeft')step(-1);else if(e.key==='Escape')closeG();return}if(e.key==='ArrowRight'){hov=Math.min(N-1,hov+1);layout()}else if(e.key==='ArrowLeft'){hov=hov<0?N-1:Math.max(0,hov-1);layout()}else if(e.key==='Enter'&&hov>=0)openG(hov)};
  window.__closet={openG,step,closeG,setHov(k){hov=k;layout()}};
  fit();
  window.addEventListener('resize', fit);
  window.addEventListener('keydown', onKeyDown);
  layout();
  return () => {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('resize', fit);
    delete window.__closet;
  };
}
  }, []);

  return (
    <main className="offcut-page" ref={rootRef}>

<div id="art">
  <div id="about" className="ui dim">About</div>
  <div id="logo" className="dim">Lanada</div>
  <div id="contact" className="ui dim dimmer">Contact</div>
  <div id="rail" className="dim"></div>
  <div id="rack" className="dim"></div>
  <div id="cap" className="dimmer"><b></b><span></span></div>
  <button id="avail" className="pill ui dim dimmer">See availability</button>
  <div id="band" className="dimmer"><div id="track"></div></div>
  <div id="det">
    <div className="hit"></div>
    <div id="big2"></div>
    <div id="big"></div>
    <button id="prev" className="arr" aria-label="Previous"><svg viewBox="0 0 24 24"><path d="M15 5L8 12L15 19" /></svg></button>
    <button id="next" className="arr" aria-label="Next"><svg viewBox="0 0 24 24"><path d="M9 5L16 12L9 19" /></svg></button>
    <div id="info"><div id="num"></div><div id="name"></div><div id="price"></div><button className="pill ui">See availability</button></div>
    <button id="close" className="ui">Close</button>
  </div>
</div>

    </main>
  );
}
