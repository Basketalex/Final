// Header scroll effect + boton arriba
const header = document.querySelector('.pagina__header');
const botonArriba = document.getElementById('botonArriba');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
  botonArriba.style.display = window.scrollY > 200 ? 'block' : 'none';
});

// Scroll to top
botonArriba.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

// IntersectionObserver para animar secciones y activar contadores
const secciones = document.querySelectorAll('.seccion');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const contadores = entry.target.querySelectorAll('.contador');
      contadores.forEach(animarContador);
    }
  });
}, {threshold: 0.25});
secciones.forEach(s => observer.observe(s));

// Función contador (soporta enteros y decimales)
function animarContador(el){
  if (el.dataset.animated) return;
  el.dataset.animated = 'true';
  const target = parseFloat(el.getAttribute('data-target'));
  const isFloat = (el.getAttribute('data-target').indexOf('.') !== -1);
  let start = 0;
  const dur = 1500;
  const startTime = performance.now();
  function step(now){
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / dur, 1);
    const value = start + (target - start) * progress;
    el.textContent = isFloat ? value.toFixed(1) : Math.floor(value);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = isFloat ? target.toFixed(1) : target;
  }
  requestAnimationFrame(step);
}

// Menu: resaltar enlace activo según scroll
const menuLinks = document.querySelectorAll('.nav__link');
const sectionsForMenu = Array.from(menuLinks).map(a => document.querySelector(a.getAttribute('href')));
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + window.innerHeight / 3;
  sectionsForMenu.forEach((sec, idx) => {
    if (!sec) return;
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    menuLinks[idx].classList.toggle('active', scrollPos >= top && scrollPos < bottom);
  });
});

// Modo oscuro / claro
const modoToggle = document.getElementById('modoToggle');
modoToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const pressed = document.body.classList.contains('dark');
  modoToggle.setAttribute('aria-pressed', pressed);
  modoToggle.textContent = pressed ? '☀️' : '🌙';
});

// Carrusel de noticias (básico, autoplay + botones)
const track = document.getElementById('track');
const items = document.querySelectorAll('.carrusel__item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let index = 0;
function updateCarrusel(){
  const width = items[0].getBoundingClientRect().width + 12;
  track.style.transform = `translateX(${-index * width}px)`;
}
window.addEventListener('resize', updateCarrusel);
nextBtn.addEventListener('click', () => { index = (index + 1) % items.length; updateCarrusel(); resetAutoplay(); });
prevBtn.addEventListener('click', () => { index = (index - 1 + items.length) % items.length; updateCarrusel(); resetAutoplay(); });

let autoplay = setInterval(() => { index = (index + 1) % items.length; updateCarrusel(); }, 4000);
function resetAutoplay(){ clearInterval(autoplay); autoplay = setInterval(()=>{ index = (index + 1) % items.length; updateCarrusel(); },4000); }

// Activar primer frame y ajustes iniciales
document.addEventListener('DOMContentLoaded', () => {
  updateCarrusel();
  // marcar primer link activo por si no scrolleaste
  menuLinks[0].classList.add('active');
});
