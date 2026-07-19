/* heic-support.js
   Pre-processing lato browser per formati che la pipeline Canvas/Worker
   esistente non gestirebbe in modo affidabile "as-is":
     - HEIC/HEIF  -> convertiti in JPEG (via heic2any, caricata da CDN solo se serve)
     - SVG        -> rasterizzati in PNG sul main thread (i Web Worker con
                     OffscreenCanvas non garantiscono un decode SVG coerente,
                     e un SVG senza width/height esplicite darebbe 0x0)
     - JFIF       -> sono JPEG a tutti gli effetti: alcuni OS/browser riportano
                     file.type vuoto per l'estensione .jfif, quindi qui li
                     "ri-etichettiamo" come image/jpeg senza toccare i byte

   Tutta la conversione avviene PRIMA che il file entri nella pipeline
   esistente (Worker/OffscreenCanvas), quindi crop/watermark/rename/
   compressione funzionano già senza nessuna modifica a valle.

   Espone:
     window.preprocessImageFile(file) -> Promise<{file, error, wasConverted}>
     window.isHeicFile(file) -> bool
     window.isExtraSupportedFile(file) -> bool  (usata nei filtri di upload)
*/
(function () {
  const HEIC_EXT = /\.(heic|heif)$/i;
  const HEIC_MIME = /^image\/hei[cf]/i;
  const SVG_EXT = /\.svg$/i;
  const JFIF_EXT = /\.jfif$/i;

  let heic2anyLoadPromise = null;

  function isHeic(file) {
    if (file.type && HEIC_MIME.test(file.type)) return true;
    if (!file.type && HEIC_EXT.test(file.name || '')) return true;
    if (HEIC_EXT.test(file.name || '')) return true;
    return false;
  }

  function isSvg(file) {
    if (file.type === 'image/svg+xml') return true;
    if (!file.type && SVG_EXT.test(file.name || '')) return true;
    return false;
  }

  function isJfif(file) {
    return JFIF_EXT.test(file.name || '');
  }

  function isExtraSupportedFile(file) {
    return isHeic(file) || isSvg(file) || isJfif(file);
  }

  function loadHeic2any() {
    if (window.heic2any) return Promise.resolve();
    if (heic2anyLoadPromise) return heic2anyLoadPromise;
    heic2anyLoadPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/heic2any/0.0.4/heic2any.min.js';
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('heic2any-load-failed'));
      document.head.appendChild(s);
    });
    return heic2anyLoadPromise;
  }

  async function convertHeicFile(file) {
    await loadHeic2any();
    const outBlob = await window.heic2any({ blob: file, toType: 'image/jpeg', quality: 0.92 });
    const blob = Array.isArray(outBlob) ? outBlob[0] : outBlob;
    const newName = (file.name || 'image').replace(HEIC_EXT, '') + '.jpg';
    return new File([blob], newName, { type: 'image/jpeg', lastModified: file.lastModified || Date.now() });
  }

  function convertSvgFile(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        let w = img.naturalWidth || img.width;
        let h = img.naturalHeight || img.height;
        if (!w || !h) { w = 1024; h = 1024; }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob((blob) => {
          URL.revokeObjectURL(url);
          if (!blob) return reject(new Error('svg-rasterize-failed'));
          const newName = (file.name || 'image').replace(SVG_EXT, '') + '.png';
          resolve(new File([blob], newName, { type: 'image/png', lastModified: file.lastModified || Date.now() }));
        }, 'image/png');
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('svg-load-failed')); };
      img.src = url;
    });
  }

  function relabelJfif(file) {
    return new File([file], file.name, { type: 'image/jpeg', lastModified: file.lastModified || Date.now() });
  }

  window.preprocessImageFile = async function (file) {
    try {
      if (isHeic(file)) return { file: await convertHeicFile(file), error: null, wasConverted: true };
      if (isSvg(file)) return { file: await convertSvgFile(file), error: null, wasConverted: true };
      if (isJfif(file) && file.type !== 'image/jpeg') return { file: relabelJfif(file), error: null, wasConverted: true };
      return { file, error: null, wasConverted: false };
    } catch (err) {
      return { file: null, error: err };
    }
  };

  window.isHeicFile = isHeic;
  window.isSvgFile = isSvg;
  window.isExtraSupportedFile = isExtraSupportedFile;
})();
