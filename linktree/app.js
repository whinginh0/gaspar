'use strict';

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelectorAll('.link-card').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--my', `${event.clientY - rect.top}px`);
  });
});

const canvas = document.querySelector('#particles');
const context = canvas.getContext('2d');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let particles = [];
let animationFrame;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  createParticles();
}

function createParticles() {
  const amount = Math.min(90, Math.max(30, Math.floor((window.innerWidth * window.innerHeight) / 17000)));
  particles = Array.from({ length: amount }, (_, index) => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: index % 7 === 0 ? Math.random() * 1.4 + .8 : Math.random() * .9 + .25,
    speedX: reduceMotion ? 0 : (Math.random() - .5) * .09,
    speedY: reduceMotion ? 0 : (Math.random() - .5) * .07,
    opacity: Math.random() * .35 + .08,
    gold: Math.random() > .36
  }));
}

function draw() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles.forEach((particle) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    if (particle.x < -4) particle.x = window.innerWidth + 4;
    if (particle.x > window.innerWidth + 4) particle.x = -4;
    if (particle.y < -4) particle.y = window.innerHeight + 4;
    if (particle.y > window.innerHeight + 4) particle.y = -4;
    context.beginPath();
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    context.fillStyle = particle.gold
      ? `rgba(217, 184, 93, ${particle.opacity})`
      : `rgba(255, 248, 226, ${particle.opacity * .55})`;
    context.fill();
  });
  if (!reduceMotion) animationFrame = requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
  cancelAnimationFrame(animationFrame);
  resizeCanvas();
  draw();
});

resizeCanvas();
draw();
