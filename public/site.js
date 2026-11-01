// Progressive enhancements. Every part of the page works without this file.

// 1. Mobile menu: close after a link is chosen and on Escape.
const menu = document.querySelector('.menu');
if (menu) {
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) menu.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 2. Top bar on the home page: hidden over the hero, then a floating pill once the page scrolls.
//    Without this file the bar stays visible (see .site-header--auto in global.css).
const header = document.querySelector('.site-header--auto');
if (header) {
  header.classList.add('is-enhanced');
  const syncHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 80);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
}

// 3. Mark the nav link of the section in view (blue). Uses aria-current so screen readers hear it too.
const navLinks = [...document.querySelectorAll('a[data-section]')];
const tracked = [...new Set(navLinks.map((link) => link.dataset.section))]
  .map((id) => document.getElementById(id))
  .filter(Boolean);
if (tracked.length) {
  const syncCurrent = () => {
    const line = window.innerHeight * 0.35;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    let current = null;
    for (const section of tracked) {
      if (section.getBoundingClientRect().top <= line) current = section.id;
    }
    if (atBottom) current = tracked[tracked.length - 1].id;
    for (const link of navLinks) {
      if (link.dataset.section === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };
  syncCurrent();
  window.addEventListener('scroll', syncCurrent, { passive: true });
  window.addEventListener('resize', syncCurrent);
}

// 4. Reveal on scroll. Only elements below the first screen are hidden, so nothing visible flickers.
if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -10% 0px' });
  for (const element of document.querySelectorAll('[data-reveal]')) {
    if (element.getBoundingClientRect().top > window.innerHeight) {
      element.classList.add('reveal');
      observer.observe(element);
    }
  }
}
