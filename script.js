// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.15;
  followerY += (mouseY - followerY) * 0.15;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .gallery-item, .project-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    follower.style.width = '50px';
    follower.style.height = '50px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '8px';
    cursor.style.height = '8px';
    follower.style.width = '32px';
    follower.style.height = '32px';
  });
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
function closeMobileMenu() {
  mobileMenu.classList.remove('open');
}

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const toggleIcon = themeToggle.querySelector('.toggle-icon');
let isLight = false;

themeToggle.addEventListener('click', () => {
  isLight = !isLight;
  document.body.classList.toggle('light', isLight);
  toggleIcon.textContent = isLight ? '🌙' : '☀';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
  isLight = true;
  document.body.classList.add('light');
  toggleIcon.textContent = '🌙';
}

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current ? 'var(--accent2)' : '';
  });
});

// ===== LIGHTBOX =====
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightboxImg').src = src;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// ===== CONTACT FORM =====
function handleFormSubmit() {
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg = document.getElementById('fmessage').value.trim();
  const note = document.getElementById('formNote');

  if (!name || !email || !msg) {
    note.textContent = '⚠ Please fill in all fields.';
    note.style.color = '#ff6b6b';
    return;
  }
  if (!email.includes('@')) {
    note.textContent = '⚠ Please enter a valid email.';
    note.style.color = '#ff6b6b';
    return;
  }
  // Open mailto with pre-filled content
  const subject = encodeURIComponent('Portfolio Message from ' + name);
  const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + msg);
  window.location.href = 'mailto:gmail.surwaseshlok@gmail.com?subject=' + subject + '&body=' + body;

  note.style.color = 'var(--accent2)';
  note.textContent = '✓ Opening your email client...';
  setTimeout(() => { note.textContent = ''; }, 4000);
}

// ===== TYPING EFFECT on hero tag =====
const heroTag = document.querySelector('.hero-tag');
if (heroTag) {
  const text = heroTag.textContent;
  heroTag.textContent = '';
  let i = 0;
  function typeChar() {
    if (i < text.length) {
      heroTag.textContent += text[i++];
      setTimeout(typeChar, 45);
    }
  }
  setTimeout(typeChar, 600);
}

// ===== PARALLAX on hero =====
window.addEventListener('scroll', () => {
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    const scrollY = window.scrollY;
    heroImg.style.transform = `translateY(${scrollY * 0.08}px)`;
  }
});
