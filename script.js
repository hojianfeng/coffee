/* ============================================================
   BREWED ARTISTRY — script.js
   ============================================================ */

/* ---------- Loader ---------- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 800);
});

/* ---------- Navbar scroll behaviour ---------- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id], .page-section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
  toggleBackToTop();
}, { passive: true });

function updateActiveNavLink() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}

/* ---------- Hamburger menu ---------- */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
  document.body.style.overflow = navLinksEl.classList.contains('open') ? 'hidden' : '';
});

// Close menu on nav link click
navLinksEl.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ---------- Dark / Light Mode ---------- */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeIcon.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

// Initialise from localStorage or system preference
const saved = localStorage.getItem('theme');
applyTheme(saved ? saved === 'dark' : prefersDark.matches);

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  applyTheme(!isDark);
});

/* ---------- Back to top ---------- */
const backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
  backToTop.classList.toggle('visible', window.scrollY > 500);
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- Fade-in on scroll (IntersectionObserver) ---------- */
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings in same parent
      const siblings = [...entry.target.parentElement.querySelectorAll('.fade-in')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => fadeObserver.observe(el));

/* ---------- Animated stat counter ---------- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

/* ---------- Cart ---------- */
let cart = [];

const cartBtn = document.getElementById('cartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartCountEl = document.getElementById('cartCount');
const cartItemsEl = document.getElementById('cartItems');
const cartFooterEl = document.getElementById('cartFooter');
const cartTotalEl = document.getElementById('cartTotal');

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function renderCart() {
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  cartCountEl.textContent = totalQty;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    cartFooterEl.classList.remove('visible');
    return;
  }

  cartItemsEl.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" data-action="dec" data-idx="${idx}">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-idx="${idx}">+</button>
          <button class="cart-item-remove" data-idx="${idx}">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  // Qty buttons
  cartItemsEl.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      if (btn.dataset.action === 'inc') {
        cart[idx].qty++;
      } else {
        cart[idx].qty--;
        if (cart[idx].qty <= 0) cart.splice(idx, 1);
      }
      renderCart();
    });
  });

  // Remove buttons
  cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      cart.splice(parseInt(btn.dataset.idx), 1);
      renderCart();
    });
  });

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  cartTotalEl.textContent = `$${total.toFixed(2)}`;
  cartFooterEl.classList.add('visible');
}

// Add to cart
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    renderCart();
    openCart();

    // Button feedback
    const orig = btn.textContent;
    btn.textContent = '✓ Added!';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 1200);
  });
});

/* ---------- Product Filter ---------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.roast === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ---------- Contact Form ---------- */
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnSpinner = document.getElementById('btnSpinner');
const formNotice = document.getElementById('formNotice');

// Field references
const fields = {
  fname:     { el: document.getElementById('fname'),     err: document.getElementById('fnameErr') },
  femail:    { el: document.getElementById('femail'),    err: document.getElementById('femailErr') },
  fworkshop: { el: document.getElementById('fworkshop'), err: document.getElementById('fworkshopErr') },
  fmessage:  { el: document.getElementById('fmessage'),  err: document.getElementById('fmessageErr') },
};

function clearErrors() {
  Object.values(fields).forEach(f => {
    f.el.classList.remove('error');
    f.err.textContent = '';
  });
  formNotice.className = 'form-notice';
  formNotice.textContent = '';
}

function validateForm() {
  let valid = true;

  if (!fields.fname.el.value.trim()) {
    fields.fname.err.textContent = 'Please enter your name.';
    fields.fname.el.classList.add('error');
    valid = false;
  }

  const emailVal = fields.femail.el.value.trim();
  if (!emailVal) {
    fields.femail.err.textContent = 'Please enter your email.';
    fields.femail.el.classList.add('error');
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    fields.femail.err.textContent = 'Please enter a valid email address.';
    fields.femail.el.classList.add('error');
    valid = false;
  }

  if (!fields.fworkshop.el.value) {
    fields.fworkshop.err.textContent = 'Please select a programme.';
    fields.fworkshop.el.classList.add('error');
    valid = false;
  }

  if (!fields.fmessage.el.value.trim()) {
    fields.fmessage.err.textContent = 'Please enter your message.';
    fields.fmessage.el.classList.add('error');
    valid = false;
  }

  return valid;
}

// Clear field error on input
Object.values(fields).forEach(f => {
  f.el.addEventListener('input', () => {
    f.el.classList.remove('error');
    f.err.textContent = '';
  });
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors();
  if (!validateForm()) return;

  // Honeypot check
  if (form.querySelector('[name="_honey"]').value) return;

  // Loading state
  btnText.style.display = 'none';
  btnSpinner.style.display = 'inline';
  submitBtn.disabled = true;

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('https://formsubmit.co/ajax/hello@brewedartistry.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name:     data.name,
        email:    data.email,
        phone:    data.phone || 'Not provided',
        company:  data.company || 'Not provided',
        workshop: data.workshop,
        message:  data.message,
      }),
    });

    if (res.ok) {
      formNotice.className = 'form-notice success';
      formNotice.textContent = '✓ Thank you! Your enquiry has been sent. We\'ll be in touch within 1 business day.';
      form.reset();
    } else {
      throw new Error('Server error');
    }
  } catch {
    formNotice.className = 'form-notice error';
    formNotice.textContent = '✗ Something went wrong. Please email us directly at hello@brewedartistry.com';
  } finally {
    btnText.style.display = 'inline';
    btnSpinner.style.display = 'none';
    submitBtn.disabled = false;
    formNotice.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});

/* ---------- Smooth anchor scroll (offset for navbar) ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 8;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
