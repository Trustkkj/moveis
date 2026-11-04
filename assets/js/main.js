"use strict";
const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobile = window.matchMedia("(max-width: 1000px)");
function closeMenu(restoreFocus = false) {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  header.classList.remove("menu-open");
  document.body.classList.remove("menu-is-open");
  if (restoreFocus) menuToggle.focus();
}
menuToggle.addEventListener("click", () => {
  const opened = menuToggle.getAttribute("aria-expanded") === "true";
  if (opened) return closeMenu();
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Fechar menu");
  header.classList.add("menu-open");
  document.body.classList.add("menu-is-open");
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
mobile.addEventListener("change", () => closeMenu());
document.addEventListener("keydown", (event) => {
  if (menuToggle.getAttribute("aria-expanded") !== "true") return;
  if (event.key === "Escape") closeMenu(true);
  if (event.key === "Tab") {
    const links = [...navigation.querySelectorAll("a")];
    if (event.shiftKey && document.activeElement === menuToggle) {
      event.preventDefault();
      links.at(-1).focus();
    } else if (!event.shiftKey && document.activeElement === links.at(-1)) {
      event.preventDefault();
      menuToggle.focus();
    }
  }
});
function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
if ("IntersectionObserver" in window && !motion.matches) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.08 },
  );
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("will-reveal");
    observer.observe(element);
  });
}
const filters = document.querySelectorAll("[data-filter]");
const projects = document.querySelectorAll(".project");
filters.forEach((button) =>
  button.addEventListener("click", () => {
    filters.forEach((filter) => {
      filter.classList.toggle("active", filter === button);
      filter.setAttribute("aria-pressed", String(filter === button));
    });
    let count = 0;
    projects.forEach((project) => {
      project.hidden =
        button.dataset.filter !== "all" &&
        project.dataset.category !== button.dataset.filter;
      if (!project.hidden) {
        count++;
        project.classList.add("visible");
      }
    });
    document.querySelector("#filter-status").textContent =
      `${count} referências visuais exibidas.`;
  }),
);
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
let lastProject;
document.querySelectorAll(".project-open").forEach((button) =>
  button.addEventListener("click", () => {
    lastProject = button;
    const image = button.querySelector("img");
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    document.querySelector("#lightbox-title").textContent =
      button.dataset.title;
    document.querySelector("#lightbox-credit").textContent =
      `Fotografia: ${button.dataset.credit}`;
    lightbox.showModal();
    document.body.classList.add("lightbox-is-open");
  }),
);
document
  .querySelector(".lightbox-close")
  .addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target !== lightbox) return;
  const rect = lightbox.getBoundingClientRect();
  if (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  )
    lightbox.close();
});
lightbox.addEventListener("close", () => {
  document.body.classList.remove("lightbox-is-open");
  lastProject?.focus({ preventScroll: true });
});
const form = document.querySelector("#quote-form");
const sendButton = document.querySelector("#whatsapp-send");
const status = document.querySelector("#whatsapp-status");
const configuredNumber = String(window.NORD_CONFIG?.whatsappNumber || "");
const numberAuthorized = /^[1-9]\d{9,14}$/.test(configuredNumber);
if (numberAuthorized)
  status.textContent =
    "Preencha os campos e visualize a mensagem para habilitar o envio ao WhatsApp configurado.";
function validateTrimmedFields() {
  const minimums = { name: 2, city: 2, description: 10 };
  Object.entries(minimums).forEach(([name, min]) => {
    const input = form.elements[name];
    input.setCustomValidity(
      input.value.trim().length < min
        ? `Preencha este campo com pelo menos ${min} caracteres, sem contar espaços nas extremidades.`
        : "",
    );
  });
}
function buildMessage() {
  return `Olá, ATELIÊ NÓRD! Gostaria de conversar sobre um projeto sob medida.\n\nNome: ${form.elements.name.value.trim()}\nAmbiente: ${form.elements.environment.value}\nCidade ou região: ${form.elements.city.value.trim()}\n\nSobre o projeto:\n${form.elements.description.value.trim()}`;
}
form.addEventListener("input", () => {
  validateTrimmedFields();
  sendButton.disabled = true;
  document.querySelector("#message-preview").hidden = true;
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  validateTrimmedFields();
  if (!form.reportValidity()) return;
  document.querySelector("#message-text").textContent = buildMessage();
  document.querySelector("#message-preview").hidden = false;
  sendButton.disabled = !numberAuthorized;
  status.textContent = numberAuthorized
    ? "Mensagem pronta. Ao continuar, o WhatsApp abrirá para você revisar e enviar."
    : "Prévia pronta. Envio desativado: nenhum número de WhatsApp autorizado foi configurado. Nenhum dado saiu desta página.";
});
sendButton.addEventListener("click", () => {
  validateTrimmedFields();
  if (!numberAuthorized || !form.reportValidity()) return;
  const url = `https://wa.me/${configuredNumber}?text=${encodeURIComponent(buildMessage())}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
document.querySelectorAll("[data-environment]").forEach((link) =>
  link.addEventListener("click", () => {
    form.elements.environment.value = link.dataset.environment;
    form.dispatchEvent(new Event("input"));
  }),
);
document.querySelector("#year").textContent = new Date().getFullYear();

// Somente disponibiliza a prévia quando os listeners de validação estão ativos.
document.querySelector(".preview-button").disabled = false;
