// components/navbar.js
import { mountHTML } from "./../../utils/dom.js";

export async function mountNavbar() {
  await mountHTML("navbar", "src/components/navbar.html", () => {
    setupNavigation();
    setupNavigationFixed();
  });
}

function setupNavigation() {
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-menu");
  const menu = document.getElementById("menu");
  let overlay = document.getElementById("overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.className = "fixed left-10  bg-opacity-50 z-30 hidden ";
    document.body.appendChild(overlay);
  }
  if (!menuBtn || !closeBtn || !menu) return;

  function openMenu(e) {
    if (e) e.stopPropagation();
    menu.classList.remove("translate-x-full");
    menu.classList.add("translate-x-0");
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    document.body.style.touchAction = "none";
  }
  function closeMenu() {
    menu.classList.add("translate-x-full");
    menu.classList.remove("translate-x-0");
    overlay.classList.add("hidden");
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
  }

  menuBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const id = href.substring(1);
      const target = document.getElementById(id);
      if (!target) return;

      const navbar = document.querySelector("nav");
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const top = target.offsetTop - navbarHeight - 20;

      if (window.innerWidth < 768) {
        // Đóng menu trước
        closeMenu();

        // Đợi menu đóng hoàn tất (500ms là thời gian transition của menu)
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Sau đó mới scroll
        window.scrollTo({
          top: Math.max(0, top),
          behavior: "instant",
        });
      } else {
        window.scrollTo({
          top: Math.max(0, top),
          behavior: "smooth",
        });
      }

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

function setupNavigationFixed() {
  const navbar = document.getElementById("smart-navbar");
  if (!navbar) return;

  // Set initial state
  updateNavbarState();

  // Add scroll event listener
  window.addEventListener("scroll", () => {
    updateNavbarState();
  });

  function updateNavbarState() {
    if (window.scrollY > 0) {
      navbar.classList.remove("relative");
      navbar.classList.add(
        "fixed",
        "top-0",
        "left-0",
        "right-0",
        "w-full",
        "shadow-md"
      );
    } else {
      navbar.classList.remove(
        "fixed",
        "top-0",
        "left-0",
        "right-0",
        "w-full",
        "shadow-md"
      );
      navbar.classList.add("relative");
    }
  }
}
