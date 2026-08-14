# 🏔️ Yash Shinde — Developer Portfolio

A modern, minimal, editorial developer portfolio built with **React**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

![Portfolio Theme](https://img.shields.io/badge/Theme-Paper%20%26%20Stone-d97706?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/React%2019-Vite-3b82f6?style=for-the-badge)
![Deployment](https://img.shields.io/badge/Hosted%20on-Render-16a34a?style=for-the-badge)

---

## ✨ Features

- **🏔️ Paper & Stone Theme**: Architect's notebook aesthetic with warm off-white background (`#f5f3ef`), slate charcoal typography, and burnt-orange (`#d97706`) accents.
- **🎯 Dynamic Notch Navbar**: Centered floating island header with active section scrollspy highlights and mobile responsive drawer.
- **⚡ Auto-Typing Role Cursor**: Dynamic typing text in the Hero section rotating through developer roles.
- **🖼️ Seamless Cutout Portrait**: Depth shadow, floating spring motion, and ambient warm radial halo behind portrait cutout.
- **🌊 Spring Physics Scroll Reveals**: Staggered domino card entry and illuminated vertical education timeline.
- **📩 Real Email Contact Form**: Integrated with **EmailJS** for instant message delivery directly to your Gmail inbox.
- **🖱️ Custom SVG Mouse Pointer**: Sleek burnt-orange SVG arrow pointer that tilts and scales on hover over interactive elements.
- **📏 Top Scroll Progress Bar**: Micro accent progress line fixed at the top indicating page scroll completion.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Custom Design Tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email Service**: EmailJS (`@emailjs/browser`)

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── imag3.png          # Portrait cutout image
│   └── resume.pdf         # Downloadable resume PDF
├── src/
│   ├── components/
│   │   ├── Navbar.tsx     # Dynamic Floating Notch Header
│   │   ├── Hero.tsx       # Intro with Auto-Typing text
│   │   ├── About.tsx      # About Me section
│   │   ├── Skills.tsx     # Tech Stack chips
│   │   ├── Projects.tsx   # Project cards grid
│   │   ├── Education.tsx  # Timeline with light beam
│   │   ├── Contact.tsx    # EmailJS contact form
│   │   ├── Footer.tsx     # Footer
│   │   ├── SpotlightCursor.tsx # Custom SVG Arrow Pointer
│   │   └── ScrollProgress.tsx  # Top scroll line
│   ├── config.ts          # ⭐️ ALL PORTFOLIO DATA & KEYS HERE
│   ├── App.tsx
│   └── index.css          # Core Design System & Tokens
└── package.json
```

---

## 🚀 Quick Start (Local Setup)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Yash-Shinde12/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## ✏️ Customizing Your Data

All portfolio content is central in **`src/config.ts`**. You can update your projects, skills, social links, and EmailJS credentials directly inside `src/config.ts`.

---

## 📜 License

Created with care by [Yash Shinde](https://github.com/Yash-Shinde12). Feel free to star ⭐️ this repo if you find it helpful!
