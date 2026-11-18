// ===================== MENÚ MÓVIL =====================
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

function cerrarMenu() {
  nav.classList.remove("open");
  menuToggle.classList.remove("active");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = nav.classList.toggle("open");
  menuToggle.classList.toggle("active", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Cerrar al pulsar un enlace, fuera del menú o con Escape
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", cerrarMenu);
});
document.addEventListener("click", (event) => {
  if (nav.classList.contains("open") && !nav.contains(event.target)) cerrarMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") cerrarMenu();
});

// ===================== BARRA DE PROGRESO =====================
const scrollProgress = document.getElementById("scrollProgress");

function actualizarProgreso() {
  const altura = document.documentElement.scrollHeight - window.innerHeight;
  const porcentaje = altura > 0 ? (window.scrollY / altura) * 100 : 0;
  scrollProgress.style.width = Math.min(porcentaje, 100) + "%";
}
window.addEventListener("scroll", actualizarProgreso, { passive: true });
window.addEventListener("resize", actualizarProgreso);
actualizarProgreso();

// ===================== SCROLL SPY ( enlace activo ) =====================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  const scrollY = window.scrollY + 120;
  let current = "inicio";

  sections.forEach((section) => {
    if (scrollY >= section.offsetTop) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}
window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();

// ===================== ANIMACIONES AL HACER SCROLL =====================
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // Barras de habilidades: animar cuando la sección entra en pantalla
  const skillsBars = document.querySelector(".skills-bars");
  if (skillsBars) {
    const barsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            skillsBars.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    barsObserver.observe(skillsBars);
  }
} else {
  revealElements.forEach((el) => el.classList.add("in-view"));
  document.querySelector(".skills-bars")?.classList.add("in-view");
}

// ===================== FORMULARIO DE CONTACTO =====================
// El envío real lo gestiona Formsubmit (action del formulario).
// Aquí solo damos feedback mientras se procesa; NO cancelamos el submit.
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", () => {
    const button = contactForm.querySelector('button[type="submit"]');
    const status = document.getElementById("formStatus");
    if (button) {
      button.disabled = true;
      button.textContent = "Enviando…";
    }
    if (status) {
      status.style.color = "#64748b";
      status.textContent = "Enviando tu mensaje…";
    }
  });
}

// ===================== AÑO ACTUAL EN EL FOOTER =====================
document.getElementById("year").textContent = new Date().getFullYear();
