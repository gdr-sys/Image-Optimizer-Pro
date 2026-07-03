# 🖼️ Image Optimizer Pro

> Comprimi, rinomina e watermark migliaia di immagini direttamente nel browser.
> Zero server. Zero upload. Un singolo file HTML.

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)
![Single File](https://img.shields.io/badge/size-single%20HTML%20file-blue)
![Privacy First](https://img.shields.io/badge/privacy-100%25%20local-blueviolet)
![Works Offline](https://img.shields.io/badge/works-offline-orange)

---

## 🤔 Perché esiste questo progetto

Avevo spesso bisogno di ridimensionare e comprimere immagini per vari progetti.
Le opzioni disponibili mi stavano strette:

- I **programmi desktop** sono pesanti da installare e lenti da aggiornare
- I **servizi online** (TinyPNG, iLoveIMG, etc.) ti chiedono di caricare i file su server di terze parti, hanno limiti di file per sessione, e alcuni sono a pagamento
- **Squoosh** di Google è ottimo ma non gestisce il batch

Così mi sono fatto il mio. Una volta fatta funzionare la compressione base, mi sono fatto prendere la mano e ho aggiunto feature che avrei voluto trovare già esistenti.

---

## ✨ Funzionalità

### 🗜️ Compressione
- Supporto a **PNG, JPEG, GIF, BMP, TIFF** in input
- Output in **WebP, JPEG o PNG**
- Slider per qualità (10–100%) e risoluzione massima (200–4000px lato lungo)
- Processing in batch parallelo senza bloccare il browser

### 📁 Upload & Cartelle
- **Drag & drop** di file singoli, selezione multipla o **intere cartelle**
- Ricorsione completa delle sottocartelle
- Opzione per **preservare la struttura delle cartelle** nell'archivio ZIP finale

### ✏️ Rinomina
- **Pattern batch** con segnaposto:
  - `{nome}` → nome file originale
  - `{n}` → numero progressivo (con padding zero configurabile)
  - `{data}` → data odierna (formato YYYY-MM-DD)
  - `{cartella}` → nome della cartella di origine
- **Rinomina inline**: clicca su qualsiasi nome nella tabella per modificarlo direttamente
- Toggle **SEO-friendly**: minuscole, rimozione accenti, spazi → trattini
- Anteprima live dei nomi finali prima di processare

### 💧 Watermark
- Carica un tuo logo in **PNG o SVG**
- Scegli **posizione** (5 opzioni: angoli + centro)
- Controllo **opacità** e **dimensione** (% relativa all'immagine)
- **Anteprima live** su canvas prima di applicare

### ⚡ Presets
| Preset | Risoluzione | Qualità | Formato |
|--------|-------------|---------|---------|
| Thumbnail | 400px | 60% | WebP |
| Catalogo | 1200px | 75% | WebP |
| Alta Qualità | 1600px | 85% | WebP |
| Social | 1080px | 80% | WebP |
| Marketplace | 1500px | 78% | JPEG |

### 📊 Dashboard
- Tabella live con anteprima, dimensione originale/ottimizzata, % risparmio per ogni file
- **Selezione/deselezione** singola o globale: ottimizza solo i file che vuoi
- Pulsante **retry** sulle singole righe in errore
- Banner con **risparmio totale di banda** in MB/GB
- **Stima del tempo rimanente** durante il processing
- Anteprima **before/after** cliccando su ogni riga completata

### 📦 Export
- Scarica tutto in un **archivio ZIP** con un click
- Struttura cartelle originale opzionalmente preservata
- Gestione automatica dei **nomi duplicati**

---

## 🚀 Come si usa

Non c'è niente da installare.

**Opzione A — Online:**
👉 [Apri la demo live]([https://tuousername.github.io/image-optimizer-pro](https://gdr-sys.github.io/Image-Optimizer-Pro/))

**Opzione B — Offline:**
1. Clona il repo o scarica `index.html`
2. Aprilo in qualsiasi browser moderno
3. Funziona. Fine.

```bash
git clone https://github.com/tuousername/image-optimizer-pro.git
cd image-optimizer-pro
# apri index.html nel tuo browser
