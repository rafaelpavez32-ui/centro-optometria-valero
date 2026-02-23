// 1. Variables globales
const hamburger = document.querySelector(".hamburger");
const navWrapper = document.querySelector(".nav-wrapper");
const navbar = document.querySelector(".navbar");
const heroCircles = document.querySelectorAll(".hero-decoration .decoration-circle");
let lastScrollY = window.scrollY;
let ticking = false;

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
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;

      // Efecto Parallax para los círculos del Hero
      if (heroCircles.length > 0) {
        heroCircles[0].style.transform = `translateY(${currentScrollY * 0.1}px) rotate(${currentScrollY * 0.1}deg)`;
        heroCircles[1].style.transform = `translateY(${currentScrollY * 0.2}px) rotate(-${currentScrollY * 0.15}deg)`;
        heroCircles[2].style.transform = `translateY(${currentScrollY * 0.15}px) rotate(${currentScrollY * 0.2}deg)`;
      }
      
      // 1. Si el menú móvil está abierto, la barra se queda quieta
      if (navWrapper && navWrapper.classList.contains('active')) {
        navbar.classList.remove('navbar--hidden');
        ticking = false;
        return;
      }

      // 2. Si estamos cerca del tope de la web, FORZAR que aparezca siempre
      if (currentScrollY < 100) {
        navbar.classList.remove('navbar--hidden');
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      // 3. Detectar dirección:
      if (currentScrollY > lastScrollY) {
        // BAJANDO -> Ocultar barra
        navbar.classList.add('navbar--hidden');
      } else if (currentScrollY < lastScrollY) {
        // SUBIENDO -> Mostrar barra
        navbar.classList.remove('navbar--hidden');
      }
      
      // Actualizar posición
      lastScrollY = currentScrollY;
      ticking = false;
    });
    ticking = true;
  }
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

document.querySelectorAll(".servicio-card, .tech-card, .equipo-card, .galeria-item").forEach(card => {
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

// 7b. Configuración de Swiper (Carrusel de Marcas)
const marcasCarousel = new Swiper('.marcas-carousel', {
  loop: true,
  speed: 4000, // Velocidad de la animación
  autoplay: {
    delay: 0, // Sin pausa entre transiciones
    disableOnInteraction: false,
    pauseOnMouseEnter: true, // Pausa al pasar el ratón por encima
  },
  slidesPerView: 'auto', // Muestra tantos como quepan en el contenedor
  spaceBetween: 30, // Espacio entre marcas
});

// 8. Slideshow de Imágenes en Hero
const heroSlideshow = () => {
    const container = document.querySelector('.hero-image-slideshow');
    if (!container) return; // Si no existe el contenedor, no hacer nada

    const images = container.querySelectorAll('.hero-main-img');
    if (images.length < 2) return; // No hay suficientes imágenes para un slideshow

    let currentIndex = 0;
    const slideInterval = 4000; // Tiempo en milisegundos (4 segundos)

    setInterval(() => {
        // Ocultar la imagen actual
        images[currentIndex].classList.remove('is-visible');

        // Calcular el índice de la siguiente imagen
        currentIndex = (currentIndex + 1) % images.length;

        // Mostrar la siguiente imagen
        images[currentIndex].classList.add('is-visible');
    }, slideInterval);
};

// Iniciar el slideshow
heroSlideshow();
