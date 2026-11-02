// Decode only on click: the address must never appear in the HTML or the initial DOM.
const decodeEmail = (hex) =>
  hex.match(/../g).map((h) => String.fromCharCode(parseInt(h, 16) ^ 0x5a)).reverse().join('');
document.querySelectorAll('a.email').forEach((a) => {
  a.addEventListener('click', (e) => {
    if (a.href.startsWith('mailto:')) return;
    e.preventDefault();
    const address = decodeEmail(a.dataset.e);
    a.href = `mailto:${address}`;
    if (a.hasAttribute('data-reveal')) a.textContent = address;
    else window.location.href = a.href;
  });
});

// Looping videos stand in for GIFs: play only while visible, never for reduced-motion users.
const videos = document.querySelectorAll('video[data-autoplay]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduceMotion) {
  videos.forEach((v) => (v.controls = true));
} else if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) target.play().catch(() => (target.controls = true));
      else target.pause();
    });
  }, { rootMargin: '200px' });
  videos.forEach((v) => io.observe(v));
}

const filters = document.querySelector('.filters');
if (filters) {
  filters.hidden = false;
  const items = document.querySelectorAll('.index li');
  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-filter]');
    if (!btn) return;
    const f = btn.dataset.filter;
    filters.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    items.forEach((li) => (li.hidden = f !== 'all' && !li.dataset.kinds.split(' ').includes(f)));
  });
}