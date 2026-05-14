/* ==============================
   MOBILE MENU & HEADER JS
   ============================== */
(function () {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');
  const dropdowns = document.querySelectorAll('.dropdown');

  function openMenu() {
    if (!hamburger || !navMenu) return;
    hamburger.classList.add('active');
    navMenu.classList.add('open');
    if (navOverlay) navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!hamburger || !navMenu) return;
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
    dropdowns.forEach(d => d.classList.remove('open'));
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) closeMenu();
      else openMenu();
    });
  }

  if (navOverlay) navOverlay.addEventListener('click', closeMenu);

  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    if (!link) return;
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
})();

/* ==============================
   SMALL UI ACTIONS
   ============================== */
document.querySelectorAll('.btn-yellow').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    btn.classList.add('active');
    setTimeout(() => btn.classList.remove('active'), 300);
  });
});

console.log('Site scripts loaded.');

/* ==============================
   CART + PAGINATION + SORT
   ============================== */
let cart = JSON.parse(localStorage.getItem('pizzaMigomCart')) || [];

const cartOpen = document.getElementById('cartOpen');
const cartClose = document.getElementById('cartClose');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCountEl = document.getElementById('cartCount');
const sortSelect = document.getElementById('sortSelect');

function saveCart() {
  localStorage.setItem('pizzaMigomCart', JSON.stringify(cart));
}

function updateCart() {
  if (!cartItems || !cartTotal || !cartCountEl) return;

  cartItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-items-empty">Корзина пока пустая</p>';
  }

  cart.forEach((item, index) => {
    total += item.price;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-item__info">
          <h4>${item.name}</h4>
          <p>${item.price} ₽</p>
        </div>
        <button class="cart-item__remove" onclick="removeFromCart(${index})" aria-label="Удалить товар">×</button>
      </div>
    `;
  });

  cartTotal.textContent = total + ' ₽';
  cartCountEl.textContent = cart.length;
  saveCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}
window.removeFromCart = removeFromCart;

function bindCartButtons() {
  document.querySelectorAll('.product-card__btn, .order-btn').forEach(button => {
    if (button.dataset.cartBound === 'true') return;
    button.dataset.cartBound = 'true';

    button.addEventListener('click', (e) => {
      e.preventDefault();
      const card = button.closest('.product-card, .menu-card');
      if (!card) return;

      const name = card.querySelector('.product-card__name, .card-header h3')?.textContent.trim() || 'Товар';
      const priceText = card.querySelector('.product-card__price, .price')?.textContent || '0';
      const price = parseInt(priceText.replace(/\D/g, ''), 10) || 0;
      const img = card.querySelector('img')?.getAttribute('src') || '';

      cart.push({ name, price, img });
      updateCart();

      const oldHTML = button.innerHTML;
      button.innerHTML = 'ДОБАВЛЕНО';
      button.classList.add('added');
      setTimeout(() => {
        button.innerHTML = oldHTML;
        button.classList.remove('added');
      }, 900);
    });
  });
}

if (cartOpen && cartModal) {
  cartOpen.addEventListener('click', () => cartModal.classList.add('active'));
}

if (cartClose && cartModal) {
  cartClose.addEventListener('click', () => cartModal.classList.remove('active'));
}

if (cartModal) {
  cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) cartModal.classList.remove('active');
  });
}

function sortProducts(type) {
  const activePage = document.querySelector('.page-products.active');
  if (!activePage || type === 'default') return;

  const grids = activePage.querySelectorAll('.category-products');
  const targets = grids.length ? grids : [activePage];

  targets.forEach(grid => {
    const cards = Array.from(grid.querySelectorAll(':scope > .product-card'));

    cards.sort((a, b) => {
      const priceA = Number(a.dataset.price || a.querySelector('.product-card__price')?.textContent.replace(/\D/g, '') || 0);
      const priceB = Number(b.dataset.price || b.querySelector('.product-card__price')?.textContent.replace(/\D/g, '') || 0);
      const ratingA = Number(a.dataset.rating || a.querySelector('.product-card__stars')?.textContent.length || 0);
      const ratingB = Number(b.dataset.rating || b.querySelector('.product-card__stars')?.textContent.length || 0);
      const nameA = a.dataset.name || a.querySelector('.product-card__name')?.textContent || '';
      const nameB = b.dataset.name || b.querySelector('.product-card__name')?.textContent || '';

      if (type === 'price-asc') return priceA - priceB;
      if (type === 'price-desc') return priceB - priceA;
      if (type === 'rating') return ratingB - ratingA;
      if (type === 'name') return nameA.localeCompare(nameB, 'ru');
      return 0;
    });

    cards.forEach(card => grid.appendChild(card));
  });
}

if (sortSelect) {
  sortSelect.addEventListener('change', () => sortProducts(sortSelect.value));
}

bindCartButtons();
updateCart();

// Обработка перехода по хэшу (якорной ссылке),
// чтобы плавно скроллить с учетом шапки.
function checkHashAndSwitchPage() {
  const hash = window.location.hash;
  if (!hash) return;
  const target = document.querySelector(hash);
  if (target) {
    setTimeout(() => {
      const y = target.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' }); // Скроллим прямо к категории
    }, 100);
  }
}
window.addEventListener('DOMContentLoaded', checkHashAndSwitchPage);
window.addEventListener('hashchange', checkHashAndSwitchPage);
