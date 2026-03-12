
// Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').style.opacity = '0';
    setTimeout(() => document.getElementById('loader').style.display = 'none', 600);
  }, 800);
});

// Nav scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Add scroll progress indicator
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  }
});

// Mobile menu
function openMobile() { document.getElementById('mobileMenu').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeMobile() { document.getElementById('mobileMenu').classList.remove('open'); document.body.style.overflow = ''; }

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.getElementById('navbar').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll reveal with staggered animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add staggered delay for multiple elements
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const heroSection = document.getElementById('inicio');
  if (heroSection) {
    const scrolled = window.pageYOffset;
    const heroBg = heroSection.querySelector('.hero-bg');
    const heroVisual = heroSection.querySelector('.hero-visual');
    
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    if (heroVisual) {
      heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
  }
});

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = counter.textContent;
    const isPlus = target.includes('+');
    const num = parseInt(target.replace(/\D/g, ''));
    
    if (!isNaN(num)) {
      let current = 0;
      const increment = num / 30;
      const timer = setInterval(() => {
        current += increment;
        if (current >= num) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current) + (isPlus ? '+' : '');
        }
      }, 30);
    }
  });
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsContainer = document.querySelector('.hero-stats');
if (statsContainer) {
  statsObserver.observe(statsContainer);
}

// Service cards hover effect
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.zIndex = '10';
  });
  card.addEventListener('mouseleave', function() {
    this.style.zIndex = '1';
  });
});

// Form validation and WhatsApp redirect
function enviarWsp() {
  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const servicio = document.getElementById('servicio').value;
  const mensaje = document.getElementById('mensaje').value.trim();

  if (!nombre || !telefono || !servicio || !mensaje) {
    // Shake animation for validation
    const formContainer = document.getElementById('formContainer');
    formContainer.style.animation = 'shake 0.5s';
    setTimeout(() => formContainer.style.animation = '', 500);
    alert('Por favor complete los campos obligatorios (*u200b)');
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

// Add CSS for shake animation
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
`;
document.head.appendChild(style);

// Lazy loading for images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          imageObserver.unobserve(img);
        }
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Active nav link on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});
