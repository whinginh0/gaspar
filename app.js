(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const groups=['.hero .handle','.hero h1','.hero__sub','.hero__stage','.hero__cta','.head h2','.head p','.marquee','.step','.about__media','.about__text h2','.about__text p','.stat','.video-placeholder-frame','.links','.bonus','.card-offer','.guarantee','.faq details','.letter','.final h2','.final p','.final .btn'];
const reveal=new Set(groups.flatMap(s=>$$(s)));
reveal.forEach(el=>{el.setAttribute('data-reveal','');const siblings=[...el.parentElement.children].filter(e=>reveal.has(e));el.style.setProperty('--d',Math.min(siblings.indexOf(el)*.08,.24)+'s')});
if(reduced){reveal.forEach(e=>e.classList.add('in'));$$('.notch').forEach(e=>e.classList.add('in'))}else{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});[...reveal,...$$('.notch')].forEach(el=>io.observe(el))}
const nav=$('.nav'),wrap=$('.nav-wrap'),burger=$('.burger'),lens=$('.nav__lens'),links=$$('.nav__links a');
let active=null,ticking=false;
const moveLens=a=>{if(!a){lens.style.opacity='0';return}lens.style.left=a.offsetLeft+'px';lens.style.width=a.offsetWidth+'px';lens.style.opacity='1'};
links.forEach(a=>{a.addEventListener('mouseenter',()=>moveLens(a));a.addEventListener('mouseleave',()=>moveLens(active))});
function onScroll(){ticking=false;nav.classList.toggle('is-scrolled',scrollY>40);let current=null;links.forEach(a=>{const s=$(a.hash);if(s&&s.getBoundingClientRect().top<innerHeight*.4)current=a});if(current!==active){active=current;links.forEach(a=>a.classList.toggle('is-active',a===active));moveLens(active)}}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});addEventListener('resize',()=>{onScroll();moveLens(active)});onScroll();
function setMenu(open){wrap.classList.toggle('nav-open',open);document.body.classList.remove('nav-open');burger.setAttribute('aria-expanded',String(open));burger.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')}
burger.addEventListener('click',()=>setMenu(!wrap.classList.contains('nav-open')));$$('.sheet a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});document.addEventListener('pointerdown',e=>{if(!wrap.contains(e.target))setMenu(false)});
if(matchMedia('(hover:hover) and (pointer:fine)').matches)$$('.spot').forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px')}));
const stage=$('.hero__stage');function fitVsl(){if(innerWidth<=900){stage.style.removeProperty('--vslw');return}const top=stage.getBoundingClientRect().top+scrollY,h=innerHeight-top-48;stage.style.setProperty('--vslw',Math.max(520,Math.min(1040,h*16/9+20))+'px')}fitVsl();addEventListener('resize',fitVsl);document.fonts?.ready.then(fitVsl);
})();
document.addEventListener('DOMContentLoaded', () => {
  const title = [...document.querySelectorAll('h1, h2, h3')].find((element) =>
    element.textContent.includes('Da estrutura')
  );

  if (!title) return;

  const content = title.parentElement;
  const eyebrow = content.querySelector('.eyebrow, .section__eyebrow, [class*="eyebrow"]');
  if (eyebrow) eyebrow.textContent = 'A HISTÓRIA DO GASPAR';

  title.innerHTML = 'Do Fortnite ao <span>digital.</span>';
  content.querySelectorAll('p').forEach((paragraph) => paragraph.remove());

  const story = document.createElement('div');
  story.className = 'gaspar-story';
  story.innerHTML = `
    <p>Enquanto jogava Fortnite, Gaspar descobriu como dar os primeiros passos para ganhar dinheiro na internet. Nascido em Tubarão, Santa Catarina, cresceu em uma família simples, onde seu pai trabalhava com vendas de frios e carnes e sua mãe como auxiliar de escritório. Nunca faltou educação, cuidado e incentivo em casa.</p>
    <p>Na infância, era apaixonado por futebol, desenhos e jogos como Fortnite e Valorant. Aos 13 anos, descobriu o design e fez sua primeira venda para uma barbearia da cidade. Quando viu sua arte estampada na fachada, entendeu que aquilo poderia transformar sua vida.</p>
    <p>A grande virada veio em 2025: ao escalar uma oferta no digital, faturou R$ 8 mil em um único dia e alcançou R$ 3 mil de lucro pela primeira vez. Ao olhar aqueles valores no celular, percebeu que aquilo representava praticamente o salário inteiro da sua mãe. Foi ali que decidiu não parar mais.</p>
    <p>Hoje, Gaspar trabalha com infoprodutos low ticket, escalando ofertas e construindo seu próprio caminho pela internet. Essa é a sua história.</p>
  `;
  title.insertAdjacentElement('afterend', story);
});

