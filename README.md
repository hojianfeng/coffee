<div align="center">

# Brewed Artistry — Specialty Coffee Academy

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Live-22D3EE?logo=github&logoColor=white)](https://hojianfeng.github.io/coffee/)
[![FormSubmit](https://img.shields.io/badge/FormSubmit-Integrated-4CAF50)](https://formsubmit.co/)
[![License](https://img.shields.io/badge/License-MIT-gold)](#license)

**A modern, luxury coffee workshop website built with pure HTML, CSS, and JavaScript — no frameworks, no dependencies. Features a corporate espresso workshop, pour over masterclass, specialty bean shop with cart, and enquiry form.**

🌐 **Live site:** [https://hojianfeng.github.io/coffee/](https://hojianfeng.github.io/coffee/)

</div>

## Screenshot

![Brewed Artistry Hero](screenshot.png)

## About

Brewed Artistry is a production-ready, multi-section specialty coffee academy website crafted entirely with vanilla HTML, CSS, and JavaScript. It showcases a premium boutique coffee brand — covering corporate espresso workshops, pour over masterclasses, a specialty bean shop with cart functionality, and a FormSubmit-powered contact form.

The site is intentionally framework-free and CDN-free (except Google Fonts), making it extremely fast, lightweight, and easy to deploy anywhere — including GitHub Pages via GitHub Actions. Every interaction — cart, filter, dark mode, animations, form validation — is handled with clean vanilla JavaScript.

## Key Features

### Premium Luxury Design
- Warm espresso colour palette — espresso brown, cream, beige, gold accents, warm gray — all via CSS custom properties
- **Playfair Display** serif for headings paired with **Inter** for body copy
- Glassmorphism navbar — transparent on hero, frosted glass with backdrop-filter on scroll
- Animated hero with slow Ken Burns zoom, hero tag badge, and scroll indicator
- Hover lift transitions on every card, image zoom on hover, and gold border reveals

### Smooth Animations
- **IntersectionObserver** fade-in with staggered sibling delay on scroll
- CSS `@keyframes` for the loading screen steam animation, hero zoom, and scroll bounce
- Animated statistics counter (counts up when scrolled into view)
- CSS transitions on nav links, buttons, product cards, and cart drawer

### Pages / Sections
- **Home** — full-screen hero, animated stats, about section, programme cards, testimonials
- **Corporate Espresso Workshop** — 6 drink type cards + 6 workshop highlight cards
- **Pour Over Masterclass** — multi-image gallery + 6 curriculum topic cards
- **Specialty Coffee Beans** — 4 product cards with roast filter (light / medium / dark)
- **Contact / Enquiry** — validated form with FormSubmit `fetch()` integration
- **Footer** — social links, navigation columns, address, copyright

### Cart & Shop
- Add-to-cart with button feedback animation
- Mini cart drawer sliding in from the right
- Quantity increment / decrement and remove per item
- Running total calculated dynamically
- Cart item count badge on navbar icon

### Contact Form
- Client-side validation with inline error messages per field
- Honeypot anti-spam field
- `fetch()` POST to FormSubmit AJAX endpoint — no page reload
- Loading spinner state on submit button
- Success / error notification rendered below the form

### Developer Experience
- **Zero dependencies** — no npm, no build step, no bundler
- CSS custom properties for the entire design system (colors, radii, shadows, transitions)
- Mobile-first responsive layout with CSS Grid and Flexbox
- Dark / light mode toggle persisted to `localStorage`, initialised from `prefers-color-scheme`
- Hamburger menu for mobile with body scroll lock
- Smooth anchor scroll with navbar offset compensation

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Markup** | HTML5 (semantic, SEO-structured) |
| **Styles** | CSS3 (custom properties, Grid, Flexbox, `backdrop-filter`, `@keyframes`) |
| **Interactivity** | Vanilla JavaScript ES6+ (no frameworks, no libraries) |
| **Fonts** | Google Fonts — Playfair Display + Inter |
| **Images** | Unsplash (CDN-hosted, `loading="lazy"`) |
| **Form backend** | [FormSubmit](https://formsubmit.co/) AJAX endpoint |
| **Hosting** | GitHub Pages via GitHub Actions |
| **CI/CD** | GitHub Actions — `actions/upload-pages-artifact` + `actions/deploy-pages` |

## Project Structure

```
coffee/
├── index.html              # All sections in one HTML file
├── style.css               # Full design system — variables, layout, components
├── script.js               # All interactivity — loader, nav, cart, counter, form
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions → GitHub Pages CI/CD
└── README.md
```

## Sections Breakdown

| Section | ID | Description |
|---------|----|-------------|
| Loading screen | — | Animated coffee cup with steam, auto-hides on `window.load` |
| Hero | `#home` | Full-screen background, headline, 2 CTAs, scroll indicator |
| Stats | — | Animated counters for workshops, participants, origins, satisfaction |
| About | — | Split grid — image with "Est. 2018" badge + brand philosophy |
| Programmes | — | 3 card grid linking to each section |
| Testimonials | — | 3-column card grid with star ratings |
| Espresso Workshop | `#espresso` | Page hero + 6 drink cards + 6 highlight cards |
| Pour Over Masterclass | `#pourover` | Page hero + image gallery + 6 topic cards |
| Coffee Beans | `#beans` | Filter bar + 4 product cards with Add to Cart |
| Contact | `#contact` | Info column + validated enquiry form |
| Footer | — | Brand, navigation columns, address, social icons |

## Quick Start

No install step needed — it's pure HTML/CSS/JS.

```bash
git clone https://github.com/hojianfeng/coffee.git
cd coffee

# Open directly in browser
open index.html

# Or serve locally (Python)
python3 -m http.server 8080
# → http://localhost:8080

# Or with Node http-server
npx http-server .
# → http://localhost:8080
```

## Deployment — GitHub Pages

The site auto-deploys to GitHub Pages on every push to `main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### How It Works

1. Push to `main` triggers the `deploy` workflow
2. `actions/upload-pages-artifact` bundles `index.html`, `style.css`, `script.js`
3. `actions/deploy-pages` publishes to `https://hojianfeng.github.io/coffee/`

### One-time GitHub Setup

1. Go to **Settings → Pages** in the repo
2. Set **Source** to `GitHub Actions`
3. Push to `main` — the workflow handles the rest

## Configuration

### FormSubmit (Contact Form)

To receive enquiry emails, update the endpoint in `script.js`:

```js
// script.js — replace with your email
const res = await fetch('https://formsubmit.co/ajax/YOUR_EMAIL@example.com', {
```

On first submission FormSubmit will send you an activation email — click the link to enable delivery.

### Colour Theme

All colours are CSS custom properties in `style.css` — edit them to rebrand instantly:

```css
:root {
  --espresso:   #2C1810;
  --gold:       #C9A84C;
  --gold-light: #E4C97A;
  --cream:      #F5EDD9;
  --beige:      #EDE0C4;
  /* … */
}
```

### WhatsApp Button

Update the phone number in `index.html`:

```html
<a href="https://wa.me/6592470680" class="whatsapp-btn" …>
```

## Optional Enhancements

These can be added without breaking the existing codebase:

- [ ] Image lightbox for workshop gallery photos
- [ ] Cookie-based cart persistence (`localStorage`)
- [ ] Stripe / PayNow checkout integration for coffee beans
- [ ] Google Analytics / Plausible event tracking
- [ ] i18n language switcher (English / Chinese)

## License

MIT — free to use, adapt, and deploy.
