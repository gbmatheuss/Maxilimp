const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu');
  navigation.classList.toggle('open', !expanded);
});

navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('open');
}));

document.querySelector('#year').textContent = new Date().getFullYear();

const comparison = document.querySelector('.compare');
const comparisonRange = document.querySelector('.compare-range');
comparisonRange.addEventListener('input', () => {
  comparison.style.setProperty('--split', `${comparisonRange.value}%`);
});

const revealItems = document.querySelectorAll(
  '.hero-copy, .hero-photo, .section-intro, .service-row, .service-aside, .comparison-head, .compare, .process-title, .process-steps li, .about-image, .about-copy, .testimonial-title, .testimonials blockquote, .faq-intro, .faq-list details, .contact-copy, .map-frame'
);
revealItems.forEach(item => item.classList.add('reveal'));

document.querySelectorAll('.service-list, .process-steps, .faq-list').forEach(list => {
  [...list.children].forEach((item, index) => item.style.setProperty('--delay', `${index * 75}ms`));
  list.classList.add('stagger');
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}
