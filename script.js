// 1. Definición de variables globales
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

// Cerrar el menú al hacer clic en cualquier enlace o botón interno
document.querySelectorAll(".nav-wrapper a, .nav-wrapper .cita-btn").forEach(link => {
link.addEventListener("click", () => {
hamburger.classList.remove("active");
navWrapper.classList.remove("active");
document.body.classList.remove("no-scroll");
});
});
}

// 3. Comportamiento de la Barra de Navegación al hacer Scroll
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  // 1. Si el menú móvil está abierto, mantener visible
  if (navWrapper && navWrapper.classList.contains('active')) {
    navbar.classList.remove('navbar--hidden');
    return;
  }

  // 2. Si estamos cerca del inicio (menos de 80px), siempre mostrar
  if (currentScrollY < 80) {
    navbar.classList.remove('navbar--hidden');
    lastScrollY = currentScrollY;
    return;
  }

  // 3. Comparación simple de dirección
  if (currentScrollY > lastScrollY) {
    // Bajando: Ocultar si ya pasamos el umbral inicial
    navbar.classList.add('navbar--hidden');
  } else {
    // Subiendo: Mostrar inmediatamente
    navbar.classList.remove('navbar--hidden');
  }
  
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

// 5. Gestión de Botones y Formulario
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
if (contacto) {
contacto.scrollIntoView({ behavior: "smooth", block: "start" });
}
});
}

const contactoForm = document.querySelector(".contacto-form");
if (contactoForm) {
contactoForm.addEventListener("submit", (e) => {
e.preventDefault();
alert("Mensaje enviado correctamente. Nos pondremos en contacto en las próximas 24 horas.");
e.target.reset();
});
}

// 6. Animación de elementos al hacer Scroll (Intersection Observer)
const observerOptions = {
threshold: 0.1,
rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = "1";
entry.target.style.animation = "fadeInUp 0.6s ease forwards";
observer.unobserve(entry.target);
}
});
}, observerOptions);

document.querySelectorAll(".servicio-card, .tech-card, .equipo-card").forEach(card => {
card.style.opacity = "0";
observer.observe(card);
});

// 7. Configuración de Swiper (Carrusel de Reseñas)
const reviewsCarousel = new Swiper('.reviews-carousel', {
  loop: true,
  speed: 5000, 
  autoplay: {
    delay: 0,
    disableOnInteraction: false, // Importante: No se detiene al tocar el móvil
    pauseOnMouseEnter: false,
  },
  slidesPerView: 1,
  spaceBetween: 20,
  freeMode: true,
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  }
});
