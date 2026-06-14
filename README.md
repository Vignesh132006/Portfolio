# Vignesh S — Cinematic Portfolio

A premium, Apple-level cinematic developer portfolio built with Next.js 14 App Router,
Three.js bokeh particles, GSAP scroll animations, and a talking-head video hero.

---

## ✨ Features

### Hero Section
- Fullscreen video hero with **blurred ambient background duplicate**
- **Three.js cinematic bokeh layer** — 200 warm-orange + white + blue particles
- Mouse parallax camera movement on particle canvas
- **GSAP entrance animations** — blur-to-focus staggered reveal
- Live stats row: 1100+ problems · 1360+ CodeChef · 90+ contests
- Glassmorphism **Play/Pause** and **Mute/Unmute** controls
- Auto-hiding **"Tap for sound"** badge
- Animated orange **scroll indicator**

### Portfolio Sections (scroll-reveal via GSAP ScrollTrigger)
| Section | Content |
|---|---|
| About | Bio + 4-stat grid (problems, rating, contests, CGPA) |
| Skills | Tech pill grid + soft skills |
| Experience | LearnLogicify internship card |
| Projects | E-Commerce · Traffic DNN · Version Control System |
| Certifications | 3 Infosys Springboard courses |
| Contact | Email, phone, LeetCode, CodeChef, GitHub, location |

---

## 🚀 Setup

### 1. Install
```bash
npm install
```

### 2. Add your video
Rename your HeyGen video and place it in `public/`:
```
public/hero-video.mp4
```

### 3. Run dev server
```bash
npm run dev
# → http://localhost:3000
```

### 4. Build for production
```bash
npm run build
npm start
```

---

## 📁 File Structure

```
├── app/
│   ├── layout.jsx          ← Root layout + Inter font
│   ├── page.jsx            ← Entry: VideoIntro + About
│   └── globals.css         ← Global reset
├── components/
│   ├── VideoIntro.jsx      ← Hero with video + content + controls
│   └── CinematicLayer.jsx  ← Three.js bokeh particle canvas
├── styles/
│   ├── VideoIntro.module.css
│   └── About.module.css
├── public/
│   └── hero-video.mp4      ← ← ← YOUR VIDEO HERE
└── package.json
```

---

## 🎨 Customisation

### Update personal info
Edit `components/VideoIntro.jsx` — stats, tags, and tagline are at the top of the JSX.

### Update projects / certifications
Edit `components/About.jsx` — `projects` and `certs` arrays at the top of the file.

### Change accent colour (orange)
Search & replace `#ff8c42` / `rgba(255,140,66,...)` across both CSS modules.

### Particle count / colours
In `CinematicLayer.jsx`, change `COUNT` (default 200) and `orange`, `white`, `blue`, `amber` colour values.

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| next 14 | Framework (App Router) |
| react 18 | UI |
| three 0.165 | 3D bokeh particles |
| gsap 3.12 | Hero + scroll animations |

---

## 🌐 Deploy on Vercel

```bash
npx vercel
```
Upload `public/hero-video.mp4` before deploying, or use Vercel's blob storage for large video files.

---

Built for Vignesh S · CSE Student · KIT Coimbatore · 2025
