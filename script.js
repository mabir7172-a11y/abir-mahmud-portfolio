// ============================================
// 1. MOBILE NAV TOGGLE
// ============================================
const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
  const isOpen = header.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close the mobile menu once a link is tapped
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================
// 2. SCROLL-SPY — highlight the nav link for the
//    section currently in view
// ============================================
const sections = document.querySelectorAll('main section[id]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((section) => sectionObserver.observe(section));

// ============================================
// 3. LIGHTBOX — click a project image to see it full-size
// ============================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const galleryImages = document.querySelectorAll('.project-images img');

function openLightbox(img) {
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('open');
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
}

galleryImages.forEach((img) => {
  img.addEventListener('click', () => openLightbox(img));
});

lightboxClose.addEventListener('click', closeLightbox);

// Click the dark overlay (not the image itself) to close
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Escape key closes it too
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
