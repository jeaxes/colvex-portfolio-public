// Progressive enhancements. Every part of the page works without this file.

// 1. Mobile menu: close after a link is chosen, on Escape and on a click outside.
const menu = document.querySelector<HTMLDetailsElement>('.menu');
if (menu) {
  menu.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) menu.open = false;
  });
  document.addEventListener('click', (event) => {
    if (menu.open && event.target instanceof Element && !menu.contains(event.target)) menu.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary')?.focus();
    }
  });
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 2. Top bar on the home page: hidden over the hero, then a floating pill once the page scrolls.
//    Without this file the bar stays visible (see .site-header--auto in global.css).
//    A sentinel 80px below the top of the page replaces a scroll listener: once it leaves the viewport, the bar shows.
const header = document.querySelector('.site-header--auto');
if (header && 'IntersectionObserver' in window) {
  header.classList.add('is-enhanced');
  const sentinel = document.createElement('div');
  sentinel.className = 'scroll-sentinel';
  sentinel.setAttribute('aria-hidden', 'true');
  document.body.prepend(sentinel);
  new IntersectionObserver(([entry]) => {
    header.classList.toggle('is-scrolled', !entry.isIntersecting && entry.boundingClientRect.top < 0);
  }).observe(sentinel);
}

// 3. Mark the nav link of the section in view (blue). Uses aria-current so screen readers hear it too.
//    Observers fire only when a section crosses the line at 35% of the viewport or the footer comes into view.
const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('a[data-section]')];
const tracked = [...new Set(navLinks.map((link) => link.dataset.section))]
  .map((id) => document.getElementById(id ?? ''))
  .filter((section): section is HTMLElement => section !== null);
if (tracked.length && 'IntersectionObserver' in window) {
  let footerVisible = false;
  const syncCurrent = () => {
    const line = window.innerHeight * 0.35;
    let current: string | null = null;
    for (const section of tracked) {
      if (section.getBoundingClientRect().top <= line) current = section.id;
    }
    if (footerVisible) current = tracked[tracked.length - 1].id;
    for (const link of navLinks) {
      if (link.dataset.section === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };
  const lineObserver = new IntersectionObserver(syncCurrent, { rootMargin: '-35% 0px -65% 0px' });
  for (const section of tracked) lineObserver.observe(section);
  const footer = document.querySelector('.site-footer');
  if (footer) {
    new IntersectionObserver(([entry]) => {
      footerVisible = entry.isIntersecting;
      syncCurrent();
    }).observe(footer);
  }
  syncCurrent();
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

// 5. Copy button: copies a contact value (the Discord name) to the clipboard and confirms
//    with a visible label change plus a status announcement for screen readers.
for (const button of document.querySelectorAll<HTMLButtonElement>('.copy-btn')) {
  const status = button.parentElement?.querySelector('[role="status"]');
  const label = button.textContent ?? '';
  let reset: ReturnType<typeof setTimeout> | undefined;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy || '');
    } catch {
      return; // No clipboard access: the value stays selectable as plain text.
    }
    button.classList.add('is-copied');
    button.textContent = button.dataset.copied || '';
    if (status) status.textContent = button.dataset.copied || '';
    clearTimeout(reset);
    reset = setTimeout(() => {
      button.classList.remove('is-copied');
      button.textContent = label;
      if (status) status.textContent = '';
    }, 2000);
  });
}
