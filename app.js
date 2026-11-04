// Entrada progressiva dos blocos, sem interferir na rolagem nativa.
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window) || reducedMotion.matches) return;
  const selectors = [
    '.hero-grid > div', '.elefante-banner', '.frustration-list li', '.route-infographic', '.route', '.about-grid > div',
    '.fit', 'blockquote.quote-center', '.offer-grid > div', '.guarantee', 'footer .foot-row'
  ].join(',');
  const candidates = [...document.querySelectorAll(selectors)];
  const blocks = candidates.filter(block => !candidates.some(parent => parent !== block && parent.contains(block)));
  const reveal = block => {
    block.classList.remove('reveal-pending');
    block.classList.add('reveal-visible');
    observer.unobserve(block);
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target); });
  }, { rootMargin: '0px 0px -4% 0px', threshold: 0 });
  blocks.forEach(block => {
    const rect = block.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;
    block.classList.add('scroll-reveal', 'reveal-pending');
    const siblings = [...block.parentElement.children].filter(child => blocks.includes(child));
    block.style.setProperty('--reveal-delay', Math.min(siblings.indexOf(block), 3) * 70 + 'ms');
    observer.observe(block);
  });
  window.addEventListener('pageshow', event => { if (event.persisted) blocks.forEach(reveal); });
})();

// Barra de CTA fixa no mobile, aparece ao rolar.
(() => {
  const stickyBar = document.getElementById('sticky-cta');
  if (!stickyBar) return;
  window.addEventListener('scroll', () => {
    stickyBar.classList.toggle('show', window.scrollY > 480);
  }, { passive: true });
})();

// SUBSTITUA pelo link real de checkout (Kiwify/Hotmart/Ticto) antes de publicar para tráfego real.
const CHECKOUT_URL = '#checkout-pendente';
document.querySelectorAll('[data-checkout]').forEach(node => { node.href = CHECKOUT_URL; });
