/* heic-support.js
   Conversione HEIC/HEIF -> JPEG lato browser, prima che il file entri
   nella pipeline di ottimizzazione esistente. Usa heic2any (CDN),
   caricata pigramente solo se serve davvero (nessun costo se l'utente
   non carica mai un HEIC).
   Espone: window.preprocessImageFile(file) -> Promise<File>
*/
(function () {
  const HEIC_EXT = /\.(heic|heif)$/i;
  const HEIC_MIME = /^image\/hei[cf]/i;

  let heic2anyLoadPromise = null;

  function isHeic(file) {
    if (file.type && HEIC_MIME.test(file.type)) return true;
    // Molti browser/OS restituiscono type="" per gli HEIC: fallback sull'estensione
    if (!file.type && HEIC_EXT.test(file.name || '')) return true;
    if (HEIC_EXT.test(file.name || '')) return true;
    return false;
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

  // Converte un singolo File HEIC/HEIF in un File JPEG.
  // In caso di errore, rilancia con un messaggio riconoscibile
  // così la UI puo' mostrare un toast chiaro invece di un fallimento muto.
  async function convertHeicFile(file) {
    await loadHeic2any();
    const outBlob = await window.heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.92
    });
    // heic2any puo' restituire un array di blob se il HEIC contiene piu' immagini (live photo, burst)
    const blob = Array.isArray(outBlob) ? outBlob[0] : outBlob;
    const newName = (file.name || 'image').replace(HEIC_EXT, '') + '.jpg';
    return new File([blob], newName, { type: 'image/jpeg', lastModified: file.lastModified || Date.now() });
  }

  // Funzione pubblica: se il file è HEIC/HEIF lo converte, altrimenti lo ritorna invariato.
  // Non lancia mai eccezioni verso il chiamante: in caso di fallimento
  // ritorna { file: null, error } cosi' il chiamante decide come segnalarlo.
  window.preprocessImageFile = async function (file) {
    if (!isHeic(file)) return { file, error: null };
    try {
      const converted = await convertHeicFile(file);
      return { file: converted, error: null, wasConverted: true };
    } catch (err) {
      return { file: null, error: err };
    }
  };

  window.isHeicFile = isHeic;
})();
