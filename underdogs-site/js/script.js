// =========================================================
// THE UNDERDOGS — script.js (v3)
// 1) Εναλλαγή γλώσσας EL/EN
// 2) Mobile menu (burger)
// 3) Χρονιά footer
// 4) Reveal-on-scroll (IntersectionObserver)
// 5) Gallery lightbox
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1) Γλώσσα EL / EN ---------- */
  const langToggle = document.getElementById('langToggle');
  const i18nEls = document.querySelectorAll('.i18n');
  const html = document.documentElement;

  function applyLang(lang){
    i18nEls.forEach(el => {
      const text = el.getAttribute('data-' + lang);
      if (text !== null) el.textContent = text;
    });
    html.setAttribute('lang', lang);
    langToggle.textContent = lang === 'el' ? 'EN' : 'EL';
    localStorage.setItem('underdogs_lang', lang);
  }

  const savedLang = localStorage.getItem('underdogs_lang') || 'el';
  applyLang(savedLang);

  langToggle.addEventListener('click', () => {
    const current = html.getAttribute('lang') === 'el' ? 'en' : 'el';
    applyLang(current);
  });

  /* ---------- 2) Mobile menu ---------- */
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');

  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- 3) Χρονιά footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 4) Reveal-on-scroll ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll('.reveal');

  if (!prefersReducedMotion && 'IntersectionObserver' in window && revealTargets.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- 5) Gallery lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });

  function closeLightbox(){ lightbox.classList.remove('open'); lightboxImg.src = ''; }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
});
