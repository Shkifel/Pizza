/* ==============================
   MOBILE MENU & HEADER JS
   ============================== */
(function () {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');
  const dropdowns = document.querySelectorAll('.dropdown');

  function openMenu() {
    hamburger.classList.add('active');
    navMenu.classList.add('open');
    if (navOverlay) navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
    dropdowns.forEach(d => d.classList.remove('open'));
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  // Mobile dropdown toggle
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    if (link && window.innerWidth <= 900) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
      });
    }
  });

  // Close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
})();

/* ==============================
   ORIGINAL FUNCTIONALITY
   ============================== */
const orderBtn = document.getElementById('orderBtn');
const cartBtn = document.getElementById('cartBtn');
let cartCount = 0;

if (orderBtn && cartBtn) {
  orderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartCount++;
    cartBtn.setAttribute('data-count', cartCount);
    alert('Pizza added to cart!');
  });
}

document.querySelectorAll('.btn-yellow').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    btn.classList.add('active');
    setTimeout(() => btn.classList.remove('active'), 300);
  });
});

// Hero Slider
console.log("Hero section loaded.");

const filterBtn = document.querySelector(".filter-btn");
if (filterBtn) {
  filterBtn.addEventListener("click", () => {
    alert("Фильтр пока не реализован 🙂");
  });
}