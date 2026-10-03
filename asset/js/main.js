/* asset/js/main.js
   Typing, burger, smooth scroll, reveal, progress bar, filter
*/
document.addEventListener('DOMContentLoaded', function () {
  // BURGER MENU
  const burger = document.getElementById('burger');
  const nav = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  });

  // SMOOTH SCROLL (buttons/links with data-scroll)
  document.querySelectorAll('[data-scroll]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const sel = btn.getAttribute('data-scroll');
      const el = document.querySelector(sel);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // TYPING (simple)
  (function typing() {
    const el = document.getElementById('typed');
    if (!el) return;
    const phrases = ['Frontend Developer.', 'UI/UX Designer — Crafting Digital Experiences.', 'Building Clean Interfaces.'];
    let pi = 0, ci = 0, forward = true;
    function tick() {
      const cur = phrases[pi];
      if (forward) {
        ci++;
        el.textContent = cur.slice(0, ci);
        if (ci >= cur.length) { forward = false; return setTimeout(tick, 1100); }
      } else {
        ci--;
        el.textContent = cur.slice(0, ci);
        if (ci <= 0) { forward = true; pi = (pi + 1) % phrases.length; }
      }
      setTimeout(tick, 70 + Math.random() * 40);
    }
    tick();
  })();

  // PROGRESS BARS: animate when in view
  function animateProgress() {
    document.querySelectorAll('.progress .bar').forEach(b => {
      const rect = b.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        const w = b.dataset.w || b.getAttribute('data-w');
        if (w) b.style.width = w;
        else if (b.classList.contains('w-95')) b.style.width = '95%';
      }
    });
  }
  window.addEventListener('load', animateProgress);
  window.addEventListener('scroll', animateProgress);

  // REVEAL ON SCROLL (simple)
  function reveal() {
    document.querySelectorAll('.project-card, .card, .hero-title, .about-grid').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight - 80) { el.style.opacity = 1; el.style.transform = 'none'; }
      else { el.style.opacity = 0; el.style.transform = 'translateY(8px)'; }
    });
  }
  document.querySelectorAll('.project-card, .card, .hero-title, .about-grid').forEach(e => {
    e.style.transition = 'all .7s cubic-bezier(.2,.9,.2,1)';
  });
  window.addEventListener('load', reveal);
  window.addEventListener('scroll', reveal);

  // FILTER PROJECTS (simple)
  const filters = document.querySelectorAll('.filter');
  const grid = document.getElementById('projectsGrid');
  if (filters.length && grid) {
    filters.forEach(f => f.addEventListener('click', () => {
      filters.forEach(x => x.classList.remove('active'));
      f.classList.add('active');
      const type = f.dataset.filter;
      grid.querySelectorAll('.project-card').forEach(card => {
        if (type === 'all' || card.dataset.type === type) card.style.display = '';
        else card.style.display = 'none';
      });
    }));
  }

  // Close mobile nav when clicking a link
  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && nav.classList.contains('active')) {
      nav.classList.remove('active'); burger.setAttribute('aria-expanded','false'); document.body.style.overflow = '';
    }
  });

  // Click outside to close mobile nav
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
      nav.classList.remove('active'); burger.setAttribute('aria-expanded','false'); document.body.style.overflow = '';
    }
  });
});
