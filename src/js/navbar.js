// components/navbar.js
import { mountHTML } from "./../../utils/dom.js";

export async function mountNavbar() {
  await mountHTML("navbar", "src/components/navbar.html", setupNavigation);
}

function setupNavigation() {
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-menu");
  const menu = document.getElementById("menu");
  let overlay = document.getElementById("overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.className = "fixed inset-0 bg-black bg-opacity-50 z-30 hidden";
    document.body.appendChild(overlay);
  }
  if (!menuBtn || !closeBtn || !menu) return;

  function openMenu(e) {
    if (e) e.stopPropagation();
    menu.classList.remove("translate-x-full");
    menu.classList.add("translate-x-0");
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    menu.classList.add("translate-x-full");
    menu.classList.remove("translate-x-0");
    overlay.classList.add("hidden");
    document.body.style.overflow = "";
  }

  menuBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.innerWidth < 768) closeMenu();
      const id = link.getAttribute("href").substring(1);
      const target = document.getElementById(id);
      if (!target) return;
      const navbar = document.querySelector("nav");
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const top = target.offsetTop - navbarHeight - 20;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      navLinks.forEach((n) => n.classList.remove("active"));
      link.classList.add("active");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) closeMenu();
  });

  window.addEventListener("scroll", () => {
    const sections = ["banner", "about", "service", "card-doctor"];
    let current = "";
    sections.forEach((id) => {
      const s = document.getElementById(id);
      if (!s) return;
      const top = s.offsetTop - 100;
      const h = s.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + h) current = id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  });
}
