// ===================== MENÚ MÓVIL =====================
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuToggle.classList.toggle("active");
  const isOpen = nav.classList.contains("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Cerrar el menú al pulsar un enlace
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

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
