// =========================================================
// THEME TOGGLE
// =========================================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function applyTheme(theme){
  body.setAttribute('data-theme', theme);
  themeToggle.setAttribute('aria-pressed', theme === 'light');
  try{ window.__theme = theme; }catch(e){}
}

// default to dark; respect system preference only on first load, no persistence (artifact sandbox safe)
const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
applyTheme(prefersLight ? 'light' : 'dark');

themeToggle.addEventListener('click', () => {
  const next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});

// =========================================================
// MOBILE NAV
// =========================================================
const navBurger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

navBurger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navBurger.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navBurger.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// SCROLL REVEAL
// =========================================================
const revealTargets = document.querySelectorAll(
  '.section-inner > *, .project-card, .skill-card, .edu-card, .timeline-item, .contact-pin'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

// =========================================================
// SKILL BARS FILL ON VIEW
// =========================================================
const skillBars = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      const level = entry.target.getAttribute('data-level');
      entry.target.style.width = level + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
skillBars.forEach(bar => barObserver.observe(bar));

// =========================================================
// SCROLL TOP BUTTON
// =========================================================
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =========================================================
// ACTIVE NAV LINK ON SCROLL
// =========================================================
const sections = document.querySelectorAll('main .section, .hero');
const navAnchors = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting){
      navAnchors.forEach(a => a.style.color = '');
      link.style.color = 'var(--copper)';
    }
  });
}, { threshold: 0.5 });

sections.forEach(sec => navObserver.observe(sec));

// =========================================================
// CONTACT FORM (client-side only demo)
// =========================================================
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message){
    formNote.textContent = 'Please fill in every field before sending.';
    return;
  }

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:ragaviselvam2005@gmail.com?subject=${subject}&body=${body}`;

  formNote.textContent = 'Opening your email client to send this message…';
  contactForm.reset();
});
