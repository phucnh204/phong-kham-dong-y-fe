import { mountHTML } from "./../../utils/dom.js";

export async function mountPopup() {
  await mountHTML("popup", "src/components/popup.html");

  setTimeout(() => {
    const popup = document.getElementById("popup");
    if (!popup) return;
    popup.classList.remove("hidden");

    const closeBtn = document.getElementById("close-popup");
    const closeIcon = document.getElementById("popup-close-icon");
    const overlay = document.getElementById("popup-overlay");

    function closePopup() {
      popup.classList.add("hidden");
    }

    if (closeBtn) closeBtn.addEventListener("click", closePopup);
    if (closeIcon) closeIcon.addEventListener("click", closePopup);
    if (overlay) overlay.addEventListener("click", closePopup);
  }, 1000);
}
