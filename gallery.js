(()=>{const c=document.querySelector('.carousel');if(!c)return;
const s=[...c.querySelectorAll('.slide')],d=c.querySelector('.car-dots'),live=c.querySelector('[aria-live]'),n=s.length;let i=0;
const lb=document.querySelector('.lightbox'),lbi=lb.querySelector('img');let last;
s.forEach((sl,k)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Show photo '+(k+1)+' of '+n);b.onclick=()=>go(k);d.appendChild(b);
 sl.onclick=()=>{if(k===i)open();else go(k)}});
function go(k){i=(k+n)%n;s.forEach((sl,j)=>{sl.className='slide'+(j===i?' active':j===(i-1+n)%n?' prev-s':j===(i+1)%n?' next-s':'');sl.setAttribute('aria-hidden',j!==i)});
 layout();[...d.children].forEach((b,j)=>b.setAttribute('aria-current',j===i));live.textContent='Photo '+(i+1)+' of '+n}
function layout(){const W=s.map(x=>x.offsetWidth),a=W[i]/2,g=18;s.forEach((sl,j)=>{let tx=0,sc=.75;
 if(j===i)sc=1;else if(sl.classList.contains('prev-s'))tx=-(a+g+W[j]*.75/2);else if(sl.classList.contains('next-s'))tx=a+g+W[j]*.75/2;
 sl.style.transform='translateX(calc(-50% + '+tx+'px)) scale('+sc+')'})}
addEventListener('resize',layout);s.forEach(x=>x.querySelector('img').addEventListener('load',layout));
function open(){const im=s[i].querySelector('img');lbi.src=im.src;lbi.alt=im.alt;last=document.activeElement;lb.hidden=false;lb.querySelector('.lb-close').focus()}
function close(){lb.hidden=true;last&&last.focus()}
c.querySelector('.prev').onclick=()=>go(i-1);c.querySelector('.next').onclick=()=>go(i+1);
c.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')go(i-1);else if(e.key==='ArrowRight')go(i+1);else if(e.key==='Enter'&&e.target===c)open()});
lb.onclick=close;document.addEventListener('keydown',e=>{if(!lb.hidden&&e.key==='Escape')close()});
let x0=null;const t=c.querySelector('.car-track');t.addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});
t.addEventListener('touchend',e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)go(i+(dx<0?1:-1));x0=null});
go(0)})();
