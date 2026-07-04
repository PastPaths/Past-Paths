const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const siteNav = document.querySelector('[data-site-nav]');

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 24);
};

const closeMenu = () => {
  if (!menuToggle || !siteNav || !header) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  siteNav.classList.remove('is-open');
  header.classList.remove('menu-open');
  document.body.classList.remove('menu-lock');
};

const setActiveNavLink = () => {
  if (!siteNav) return;
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  siteNav.querySelectorAll('a[href]').forEach((link) => {
    const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
    if (linkPage === currentPage) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

setHeaderState();
setActiveNavLink();
window.addEventListener('scroll', setHeaderState, { passive: true });

if (menuToggle && siteNav && header) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    siteNav.classList.toggle('is-open', !isOpen);
    header.classList.toggle('menu-open', !isOpen);
    document.body.classList.toggle('menu-lock', !isOpen);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
