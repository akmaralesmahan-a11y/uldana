
const nav = document.getElementById("nav");
function onScrollNav() {
  nav.classList.toggle("scrolled", window.scrollY > 40);
}
window.addEventListener("scroll", onScrollNav, { passive: true });
onScrollNav();


window.addEventListener("load", () => {
  document.querySelectorAll(".hero .mask-inner").forEach((el) => {
    el.style.transform = "translateY(0)";
  });
});


const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in-view");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal, .section .mask, .gallery-wrap .mask").forEach((el) => io.observe(el));


const easeOut = (t) => 1 - Math.pow(1 - t, 3);
function countUp(el) {
  const target = parseInt(el.dataset.count, 10);
  const dur = 1800;
  const t0 = performance.now();
  function tick(t) {
    const p = Math.min((t - t0) / dur, 1);
    el.textContent = Math.round(easeOut(p) * target);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        countUp(e.target);
        statIO.unobserve(e.target);
      }
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll("[data-count]").forEach((el) => statIO.observe(el));

const hero = document.getElementById("top");
const scene = document.getElementById("heroScene");
const heroBg = document.getElementById("heroBg");
const sun = document.getElementById("heroSun");
const far = document.getElementById("layerFar");
const near = document.getElementById("layerNear");
const content = document.getElementById("heroContent");

const tilt = document.createElement("div");
tilt.className = "hero-tilt";
scene.appendChild(tilt);
tilt.appendChild(far);
tilt.appendChild(near);

let mx = 0, my = 0, cx = 0, cy = 0;
hero.addEventListener("mousemove", (e) => {
  const r = hero.getBoundingClientRect();
  mx = (e.clientX - r.left) / r.width - 0.5;
  my = (e.clientY - r.top) / r.height - 0.5;
});
hero.addEventListener("mouseleave", () => { mx = 0; my = 0; });

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function loop() {
  if (!reduced) {
    cx += (mx - cx) * 0.06;
    cy += (my - cy) * 0.06;
    tilt.style.transform = `rotateX(${(-cy * 5).toFixed(2)}deg) rotateY(${(cx * 7).toFixed(2)}deg)`;

    const y = window.scrollY;
    if (y < window.innerHeight * 1.2) {
      heroBg.style.transform = `translateY(${y * 0.22}px)`;
      sun.style.transform = `translateY(${y * 0.38}px)`;
      far.style.transform = `translateY(${y * 0.38}px)`;
      near.style.transform = `translateY(${y * 0.1}px)`;
      content.style.opacity = Math.max(1 - y / (window.innerHeight * 0.7), 0);
    }
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
