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
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const asunto = document.getElementById("asunto").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (!nombre || !email || !mensaje) {
    formStatus.style.color = "#dc2626";
    formStatus.textContent = "Por favor, rellena los campos obligatorios.";
    return;
  }

  const subject = asunto || `Mensaje de ${nombre}`;
  const body = `${mensaje}\n\n— ${nombre}\nEmail: ${email}`;
  const mailto = `mailto:simeon.ivanov.stoev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  formStatus.style.color = "#059669";
  formStatus.textContent = "¡Gracias! Se abrirá tu cliente de correo para enviar el mensaje.";
  window.location.href = mailto;
});

// ===================== AÑO ACTUAL EN EL FOOTER =====================
document.getElementById("year").textContent = new Date().getFullYear();
