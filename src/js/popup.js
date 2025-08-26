import { mountHTML } from "./../../utils/dom.js";

export async function mountPopup() {
  await mountHTML("popup-2", "src/components/popup-2.html");

  setTimeout(() => {
    const popup = document.getElementById("popup-2");
    if (!popup) return;

    // Hiện popup - xóa class hidden
    popup.classList.remove("hidden");

    const closeBtn = document.getElementById("close-popup-2");
    const overlay = document.getElementById("popup-2-overlay");

    function closePopup() {
      popup.classList.add("hidden");
    }

    if (closeBtn) closeBtn.addEventListener("click", closePopup);
    if (overlay) overlay.addEventListener("click", closePopup);
  }, 1000);
}
