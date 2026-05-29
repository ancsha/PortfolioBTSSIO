// ═══════════════════════════════════════════
//  Navigation entre sections
// ═══════════════════════════════════════════
function showPage(targetId) {
  // Masque toutes les pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Affiche la page cible
  const target = document.getElementById(targetId);
  if (target) target.classList.add('active');
  // Scroll en haut
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Boutons nav (desktop + mobile)
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    if (!target) return;

    // Active state
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll(`.nav-btn[data-target="${target}"]`).forEach(b => b.classList.add('active'));

    showPage(target);

    // Ferme le menu mobile si ouvert
    document.getElementById('mobileMenu').classList.remove('open');
    document.getElementById('burger').classList.remove('open');
  });
});

// Boutons CTA qui naviguent (ex: "Découvrir mon parcours")
document.querySelectorAll('[data-target]').forEach(el => {
  if (el.tagName === 'BUTTON' && !el.classList.contains('nav-btn') && !el.classList.contains('year-tab')) {
    el.addEventListener('click', () => {
      const target = el.getAttribute('data-target');
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll(`.nav-btn[data-target="${target}"]`).forEach(b => b.classList.add('active'));
      showPage(target);
    });
  }
});

// ═══════════════════════════════════════════
//  Burger menu mobile
// ═══════════════════════════════════════════
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// ═══════════════════════════════════════════
//  Onglets BTS (Année 1 / Année 2)
// ═══════════════════════════════════════════
document.querySelectorAll('.year-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.year-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.year-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    const year = tab.getAttribute('data-year');
    const content = document.getElementById('year-' + year);
    if (content) content.classList.add('active');
  });
});

// ═══════════════════════════════════════════
//  Expand / collapse situations pro CNED
// ═══════════════════════════════════════════
function toggleExpand(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const isOpen = el.classList.contains('open');
  el.classList.toggle('open');

  const btn = el.previousElementSibling;
  if (btn && btn.classList.contains('expand-btn')) {
    btn.textContent = isOpen
      ? 'Voir plus de captures ↓'
      : 'Masquer les captures ↑';
  }
}

// ═══════════════════════════════════════════
//  Glow dynamique sur les étoiles (mouse)
// ═══════════════════════════════════════════
document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  document.body.style.setProperty('--mx', x);
  document.body.style.setProperty('--my', y);
});

// ═══════════════════════════════════════════
//  Lightbox — clic pour agrandir les images
// ═══════════════════════════════════════════
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.cssText = `
  display: none; position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,10,0.92); backdrop-filter: blur(8px);
  align-items: center; justify-content: center; cursor: zoom-out;
  padding: 24px;
`;
lightbox.innerHTML = `<img id="lightbox-img" style="max-width:90vw; max-height:90vh; border-radius:12px; object-fit:contain;">`;
document.body.appendChild(lightbox);

lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightbox.style.display = 'none';
});

function openLightbox(img) {
  document.getElementById('lightbox-img').src = img.src;
  lightbox.style.display = 'flex';
}

document.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG' && e.target.id !== 'lightbox-img') {
    openLightbox(e.target);
  }
});

window.addEventListener("load", () => {
    const hash = window.location.hash.replace("#", "");

    if (hash) {

        document.querySelectorAll(".page").forEach(section => {
            section.classList.remove("active");
        });

        document.querySelectorAll(".nav-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        const targetSection = document.getElementById(hash);

        if (targetSection) {
            targetSection.classList.add("active");
        }

        const targetBtn = document.querySelector(`[data-target="${hash}"]`);

        if (targetBtn) {
            targetBtn.classList.add("active");
        }
    }
});