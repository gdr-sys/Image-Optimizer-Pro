# 🖼️ Image Optimizer Pro

> Compress, rename and watermark thousands of images directly in your browser.
> Zero servers. Zero uploads. A single HTML file.
>
> 🇮🇹 Comprimi, rinomina e applica watermark a migliaia di immagini direttamente nel browser.
> Zero server. Zero upload. Un singolo file HTML.

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)
![Single File](https://img.shields.io/badge/size-single%20HTML%20file-blue)
![Privacy First](https://img.shields.io/badge/privacy-100%25%20local-blueviolet)
![Works Offline](https://img.shields.io/badge/works-offline-orange)
![PWA Ready](https://img.shields.io/badge/PWA-installable-success)
![i18n](https://img.shields.io/badge/languages-IT%20%7C%20EN-informational)

---

## 🤔 Why this exists

I frequently needed to resize and compress images for various projects, but I always hated the available options:

- **Desktop apps** are heavy to install and slow to update
- **Online services** (TinyPNG, iLoveIMG, etc.) require uploading files to third-party servers, have per-session limits, and some are paid
- **Squoosh** by Google is great but doesn't handle batch processing

So I built my own. Once I got the basic compression working, I got carried away and kept adding features I wished existed.

---

## ✨ Features

### 🗜️ Compression
- Input support for **PNG, JPEG, GIF, BMP, TIFF**
- Output in **WebP, JPEG, PNG** or **AVIF** (with automatic browser detection)
- Slider for quality (10–100%) and max resolution (200–4000px long side)
- **Fixed dimensions with padding** — set exact width × height (e.g. 1000×1000 for marketplaces) with white/black/transparent/custom color padding
- Parallel batch processing without blocking the browser

### 📁 Upload & Folders
- **Drag & drop** single files, multiple selection, or **entire folders**
- Dedicated buttons: "📄 Select Files" and "📂 Select Folder"
- Complete subfolder recursion
- **Visual folder structure panel** showing detected folders and file count per folder
- **Dedicated "Folder" column** in the table showing where each file lives
- Option to **preserve folder structure** in the final ZIP archive

### ✏️ Rename
- **Batch pattern** with placeholders:
  - `{nome}` → original file name
  - `{n}` → progressive number (with configurable zero-padding)
  - `{data}` → today's date (YYYY-MM-DD format)
  - `{cartella}` → source folder name
- **Inline rename**: click any name in the table to edit it directly
- **SEO-friendly** toggle: lowercase, accent removal, spaces → hyphens
- Live preview of final names including folder paths before processing

### 💧 Watermark
Two modes available via tab selector:

**Image watermark:**
- Upload your logo in **PNG or SVG**
- Choose **position** (5 options: corners + center)
- Control **opacity** and **size** (% relative to image)
- **Live preview** on canvas

**Text watermark:**
- Custom text (e.g. `© My Brand`)
- Choose **font** (Inter, Arial, Georgia, Courier New, Verdana)
- Custom **color** picker
- **Opacity**, **size** and **rotation** controls (0°, -30°, -45° diagonal)
- **Position** selector (5 points)
- **Live preview** on canvas

### ⚡ Presets

| Preset | Resolution | Quality | Format |
|--------|-----------|---------|--------|
| Thumbnail | 400px | 60% | WebP |
| Catalog | 1200px | 75% | WebP |
| High Quality | 1600px | 85% | WebP |
| Social | 1080px | 80% | WebP |
| Marketplace | 1500px | 78% | JPEG |

**Custom presets:** Save your own presets with custom names — stored in `localStorage` and persisted across sessions. Delete them anytime with one click.

### 📊 Dashboard
- Live table with thumbnail, original/optimized size, % savings per file
- **Dedicated folder column** showing each file's source folder
- **Select/deselect** individual files or all at once — optimize only what you need
- **Retry button** on individual failed files
- Banner with **total bandwidth savings** in MB/GB
- **Estimated time remaining** during processing
- **Before/after preview** by clicking any completed row

### 🌙☀️ Light & Dark Mode
- Toggle between dark and light themes
- Preference saved in `localStorage` — remembered across sessions
- Smooth CSS transition between themes
- Watermark preview canvas adapts to current theme colors

### 🌐 Multilingual (i18n)
- Full **Italian** 🇮🇹 and **English** 🇬🇧 interface
- Language switcher in the top-right corner
- Preference saved in `localStorage`
- All UI elements translated: controls, panels, table headers, status labels, toast notifications, placeholders

### 📲 PWA (Progressive Web App)
- **Installable** as a native app on desktop and mobile
- Works **100% offline** after first load
- Service Worker with cache-first strategy
- "Install as App" button appears automatically on supported browsers
- Opens without browser chrome (standalone mode)

### 📦 Export
- Download everything in a **ZIP archive** with one click
- Original folder structure optionally preserved
- Automatic **duplicate name handling**
- SEO-friendly folder names in the ZIP when slugification is active

---

## 🚀 How to use

Nothing to install.

**Option A — Online:**
👉 [Open the live demo]((https://gdr-sys.github.io/Image-Optimizer-Pro/))

**Option B — Offline:**
1. Clone the repo or download `index.html`
2. Open it in any modern browser
3. Done.

```bash
git clone https://github.com/yourusername/image-optimizer-pro.git
cd image-optimizer-pro
# open index.html in your browser
