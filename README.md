# Doaa Mohamed Salah — Personal Portfolio Website

A responsive personal portfolio website crafted with a **Modern Glassmorphism** & **Clean Minimalist Light** aesthetic, built with **Semantic HTML5**, **Modern Vanilla CSS3**, and **Clean Vanilla JavaScript** (Zero external CSS/JS framework dependencies).

---

## 🌟 Key Features

1. **Aesthetic & Visual Identity**:
   - **Modern Glassmorphism**: Multi-layer frosted glass cards (`backdrop-filter: blur(20px)`), delicate inner borders, and soft multi-colored ambient shadows.
   - **Vibrant Gradient Accents**: Violet (`#8B5CF6`) → Pink (`#EC4899`) → Peach (`#F97316`).
   - **Background Animated Blobs**: 4 organic floating blurred gradient orbs with smooth multi-second oscillation.
   - **Custom Fonts**: Google Fonts (`Outfit` for headings and `Inter` for body copy).
   - **Authentic Brand Logos**: Devicon CDN and Font Awesome 6 for crisp icons.

2. **Complete Ordered Sections**:
   - **Sticky Frosted Navbar**: SVG monogram logo (`DMS.dev`), active link highlighting on scroll, mobile drawer menu, light/dark mode toggle, and EN/AR language toggle.
   - **Hero Section**: Greeting badge, gradient typography, dynamic typing effect ("Web Developer", "Data Science Enthusiast", "Team Leader", "Problem Solver"), dual CTA buttons ("Explore My Work" and "Download CV"), and interactive code terminal visual.
   - **About Section**: Personal story highlighting BIS academic background, 4-point aligned core competencies checklist, and 4 animated stat counters (4 Projects, 3 Programs, 200 hrs Data Engineering, 80 hrs AI).
   - **Education Section**: Bachelor's Degree in Business Information Systems (BIS) with interactive focus area chips.
   - **Certifications Section**: Cards with official logos and hour badges for Microsoft Data Engineer (MSDE / DEPI, 200 hrs), AI Ambassador (NTI, 80 hrs), and EBSM Banque Misr Fellowship.
   - **Skills Section**: Tabbed interface (Technical, Development Tools, Soft Skills, Languages) with real brand logos and subtle floating hover states.
   - **Projects Section**: Interactive preview frames, live demo/repo buttons (accessible on mobile without hover dependency), and an accessible modal presenting details strictly in **Challenge → Action → Result** narrative format (no bullet lists).
   - **Services Section**: 4 service offerings with subtle price tags and a dedicated "View Pricing Plans" modal.
   - **Testimonials Section**: Glass quote cards with verified LinkedIn profile verification links.
   - **Contact Section**: Floating glass contact form with client-side validation and immediate feedback, plus direct channels (Email `mailto:`, WhatsApp with pre-filled message, GitHub, LinkedIn, and English Location pin).
   - **Footer**: Presentation-inspired banner with bilingual inspirational quote, quick links, copyright, and smooth back-to-top button.

3. **Bonus Features**:
   - **Light / Dark Mode**: Theme switch with persistent `localStorage` preference.
   - **English / Arabic Toggle**: Full bidirectional support (`ltr` / `rtl`) with instant translation of key headings and text.
   - **Interactive Custom Cursor**: Glowing desktop cursor follower that gracefully deactivates on touch screens.
   - **Accessibility**: ARIA dialog roles, focus trap, `prefers-reduced-motion` compliance, and touch targets ≥ 44px.

---

## 📁 File Structure

```text
portfolio/
├── index.html        # Complete semantic HTML5 structure & accessibility tags
├── style.css         # Modern CSS3 with CSS variables, Grid, Flexbox, and Glassmorphism
├── script.js         # Vanilla JS (Typing, IntersectionObserver, Modals, Validation, Tabs)
├── assets/
│   ├── Doaa_Mohamed_Salah_CV.pdf       # Official resume PDF placeholder
│   ├── cert-nti-ai-ambassador.jpg      # Official NTI AI Ambassador Certificate
│   └── cert-ebsm-banque-misr.jpg       # Official Banque Misr & EBSM Certificate
└── README.md         # Documentation & GitHub Pages deployment guide
```

---

## ⚙️ Active Contact Configuration

- **WhatsApp Phone**: Configured with international format: `+20 111 513 7318` (`201115137318`).
- **Direct Phone Calls**: Linked directly via `tel:+201115137318`.
- **Direct Email**: Linked via `mailto:doaa.mhmd.xo@gmail.com`.
- **LinkedIn**: `https://www.linkedin.com/in/doaa-mohamed-091164375`
- **GitHub**: `https://github.com/doaamhmdxo-21`

---

## 🚀 How to Deploy to GitHub Pages (Free Hosting)

Deploying this portfolio on GitHub Pages takes less than 2 minutes:

1. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com) and click **New Repository**.
   - Name the repository `doaamhmdxo-netizen.github.io` (for a root personal domain) or `portfolio` (for `doaamhmdxo-netizen.github.io/portfolio`).
   - Set repository visibility to **Public**.

2. **Push the Files to GitHub**:
   In your terminal inside this folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Modern glassmorphism personal portfolio"
   git branch -M main
   git remote add origin https://github.com/doaamhmdxo-21/[YOUR_REPO_NAME].git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Navigate to your repository on GitHub.
   - Go to **Settings** > **Pages** (under Code and automation).
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and `/ (root)`, then click **Save**.
   - Within 60 seconds, your site will be live at:
     `https://doaamhmdxo-netizen.github.io/[YOUR_REPO_NAME]/`
