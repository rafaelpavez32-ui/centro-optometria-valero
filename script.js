// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Botón de agendar cita
document.querySelector('.cita-btn').addEventListener('click', () => {
  alert('📅 Disponible: Agendar cita online próximamente\n\nMientras tanto, llámanos: +34 91 234 5678');
});

// Botón en el hero
document.querySelector('.hero-btn').addEventListener('click', () => {
  document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Formulario de contacto
document.querySelector('.contacto-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nombre = document.querySelector('#nombre').value.trim();
  const email = document.querySelector('#email').value.trim();
  const telefono = document.querySelector('#telefono').value.trim();
  const asunto = document.querySelector('#asunto').value.trim();
  const mensaje = document.querySelector('#mensaje').value.trim();
  
  if (nombre.length < 3) {
    alert('❌ El nombre debe tener al menos 3 caracteres');
    return;
  }
  
  if (!email.includes('@')) {
    alert('❌ Por favor ingresa un email válido');
    return;
  }
  
  if (telefono.length < 9) {
    alert('❌ El teléfono debe tener al menos 9 dígitos');
    return;
  }
  
  if (mensaje.length < 10) {
    alert('❌ El mensaje debe tener al menos 10 caracteres');
    return;
  }
  
  alert('✅ Mensaje enviado correctamente\n\nNos pondremos en contacto en las próximas 24 horas.');
  e.target.reset();
});

// Observador para animaciones al scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.servicio-card, .tech-card, .equipo-card').forEach(card => {
  card.style.opacity = '0';
  observer.observe(card);
});

// Ocultar la barra de navegación al hacer scroll
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  // Si el menú está abierto, mantener la barra visible y no hacer nada más.
  if (navWrapper.classList.contains('active')) {
    navbar.classList.remove('navbar--hidden');
    return;
  }

  if (currentScrollY > lastScrollY && currentScrollY > 150) {
    // Scroll hacia abajo
    navbar.classList.add('navbar--hidden');
  } else {
    // Scroll hacia arriba
    navbar.classList.remove('navbar--hidden');
  }
  lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
});

// Inicialización de Swiper para el carrusel de reseñas
const reviewsCarousel = new Swiper('.reviews-carousel', {
  // Opciones
  loop: true,
  speed: 7000, // Velocidad de la transición para un movimiento constante
  autoplay: {
    delay: 1, // Delay casi nulo para que no se detenga
    disableOnInteraction: false, // No deshabilitar el autoplay al interactuar
  },
  spaceBetween: 30,
  
  // Responsividad
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  }
});

// Menú hamburguesa para móvil
const hamburger = document.querySelector(".hamburger");
const navWrapper = document.querySelector(".nav-wrapper");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navWrapper.classList.toggle("active");
  document.body.classList.toggle('no-scroll');
});

document.querySelectorAll(".nav-wrapper a, .nav-wrapper .cita-btn").forEach(link => {
  link.addEventListener("click", () => {
    if (hamburger.classList.contains('active')) {
      hamburger.classList.remove("active");
      navWrapper.classList.remove("active");
      document.body.classList.remove('no-scroll');
    }
  });
});
