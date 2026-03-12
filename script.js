
// Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').style.opacity = '0';
    setTimeout(() => document.getElementById('loader').style.display = 'none', 600);
  }, 800);
});

// Nav scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
function openMobile() { document.getElementById('mobileMenu').classList.add('open'); }
function closeMobile() { document.getElementById('mobileMenu').classList.remove('open'); }

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Form → WhatsApp
function enviarWsp() {
  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const servicio = document.getElementById('servicio').value;
  const mensaje = document.getElementById('mensaje').value.trim();

  if (!nombre || !telefono || !servicio || !mensaje) {
    alert('Por favor complete los campos obligatorios (*)');
    return;
  }

  const texto = `*NUEVA CONSULTA LEGAL*%0A%0A` +
    `👤 *Nombre:* ${encodeURIComponent(nombre)}%0A` +
    `📱 *Teléfono:* ${encodeURIComponent(telefono)}%0A` +
    `⚖️ *Área:* ${encodeURIComponent(servicio)}%0A%0A` +
    `📝 *Descripción del caso:*%0A${encodeURIComponent(mensaje)}%0A%0A` +
    `_Enviado desde www.dianaveraabogada.com_`;

  document.getElementById('formContainer').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';

  setTimeout(() => {
    window.open(`https://wa.me/51922012084?text=${texto}`, '_blank');
  }, 800);
}
