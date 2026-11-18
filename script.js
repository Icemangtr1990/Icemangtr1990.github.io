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

// ===================== MODO CLARO / OSCURO =====================
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle?.querySelector(".theme-icon");
const raiz = document.documentElement;

function aplicarTema(tema) {
  raiz.setAttribute("data-theme", tema);
  if (themeToggle) {
    themeToggle.setAttribute("aria-label", tema === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
  }
  if (themeIcon) themeIcon.textContent = tema === "dark" ? "☀️" : "🌙";
}

const temaGuardado = localStorage.getItem("portfolio-theme");
const temaInicial = temaGuardado ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
aplicarTema(temaInicial);

themeToggle?.addEventListener("click", () => {
  const siguiente = raiz.getAttribute("data-theme") === "dark" ? "light" : "dark";
  aplicarTema(siguiente);
  localStorage.setItem("portfolio-theme", siguiente);
});

// ===================== CONTADORES ANIMADOS =====================
const cifras = document.querySelectorAll(".highlight strong, .stat strong");

function animarCifra(elemento) {
  const objetivo = parseInt(elemento.textContent, 10);
  if (isNaN(objetivo) || objetivo <= 0 || objetivo > 100) return;

  const duracion = 1100;
  const inicio = performance.now();
  const valorFinal = elemento.textContent;

  function paso(ahora) {
    const progreso = Math.min((ahora - inicio) / duracion, 1);
    const easing = 1 - Math.pow(1 - progreso, 3);
    elemento.textContent = Math.round(objetivo * easing) + (valorFinal.includes("+") ? "+" : "");
    if (progreso < 1) requestAnimationFrame(paso);
    else elemento.textContent = valorFinal;
  }
  requestAnimationFrame(paso);
}

if ("IntersectionObserver" in window) {
  const observadorCifras = new IntersectionObserver((entradas, obs) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        animarCifra(entrada.target);
        obs.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.6 });
  cifras.forEach((cifra) => observadorCifras.observe(cifra));
}

// ===================== COPIAR EMAIL =====================
const copiarEmail = document.getElementById("copyEmail");

copiarEmail?.addEventListener("click", async () => {
  const email = copiarEmail.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    copiarEmail.textContent = "✓ ¡Copiado!";
    copiarEmail.classList.add("copiado");
    setTimeout(() => {
      copiarEmail.textContent = "⧉ Copiar email";
      copiarEmail.classList.remove("copiado");
    }, 2000);
  } catch (e) {
    copiarEmail.textContent = "No se pudo copiar";
    setTimeout(() => { copiarEmail.textContent = "⧉ Copiar email"; }, 2000);
  }
});

// ===================== AÑO ACTUAL EN EL FOOTER =====================
document.getElementById("year").textContent = new Date().getFullYear();
