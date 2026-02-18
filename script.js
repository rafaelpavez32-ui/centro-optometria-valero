// 1. Variables globales
const hamburger = document.querySelector(".hamburger");
const navWrapper = document.querySelector(".nav-wrapper");
const navbar = document.querySelector(".navbar");
let lastScrollY = window.scrollY;

// 2. Control del Menú Móvil
if (hamburger && navWrapper) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navWrapper.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  document.querySelectorAll(".nav-wrapper a, .nav-wrapper .cita-btn").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navWrapper.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });
}

// 3. Comportamiento de la Barra de Navegación (Versión Ultra-Respuesta)
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  // 1. Si el menú móvil está abierto, la barra se queda quieta
  if (navWrapper && navWrapper.classList.contains('active')) {
    navbar.classList.remove('navbar--hidden');
    return;
  }

  // 2. Si estamos cerca del tope de la web, FORZAR que aparezca siempre
  if (currentScrollY < 100) {
    navbar.classList.remove('navbar--hidden');
    lastScrollY = currentScrollY;
    return;
  }

  // 3. Detectar dirección:
  // Si la posición actual es MENOR que la anterior, es que estamos SUBIENDO.
  if (currentScrollY < lastScrollY) {
    // SUBIENDO -> Mostrar barra
    navbar.classList.remove('navbar--hidden');
  } else {
    // BAJANDO -> Ocultar barra
    navbar.classList.add('navbar--hidden');
  }
  
  // Actualizar posición
  lastScrollY = currentScrollY;
}, { passive: true });

// 4. Navegación Suave (Smooth Scroll)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// 5. Botones y Formulario
const citaBtn = document.querySelector(".cita-btn");
if (citaBtn) {
  citaBtn.addEventListener("click", () => {
    alert("Disponible: Agendar cita online próximamente. Mientras tanto, llámanos: +34 91 234 5678");
  });
}

const heroBtn = document.querySelector(".hero-btn");
if (heroBtn) {
  heroBtn.addEventListener("click", () => {
    const contacto = document.querySelector("#contacto");
    if (contacto) contacto.scrollIntoView({ behavior: "smooth" });
  });
}

const contactoForm = document.querySelector(".contacto-form");
if (contactoForm) {
  contactoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Mensaje enviado correctamente.");
    e.target.reset();
  });
}

// 6. Animaciones al Scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.animation = "fadeInUp 0.6s ease forwards";
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".servicio-card, .tech-card, .equipo-card").forEach(card => {
  card.style.opacity = "0";
  observer.observe(card);
});

// 7. Configuración de Swiper (Carrusel de Reseñas - Corregido)
const reviewsCarousel = new Swiper('.reviews-carousel', {
  loop: true,
  speed: 5000, 
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  },
  slidesPerView: 1,
  spaceBetween: 20,
  freeMode: true,
  breakpoints: {
    768: { slidesPerView: 2, spaceBetween: 30 },
    1024: { slidesPerView: 3, spaceBetween: 40 }
  }
});
