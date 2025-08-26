import { mountHTML } from "./../../utils/dom.js";

export async function mountPopup() {
  await mountHTML("popup-2", "src/components/popup-2.html");

  // Đợi 1 giây rồi mới kiểm tra và hiển thị
  setTimeout(() => {
    // Kiểm tra localStorage
    const lastPopupTime = localStorage.getItem("lastPopupTime");
    const currentTime = new Date().getTime();
    const ONE_DAY = 24 * 60 * 60 * 1000;

    // Kiểm tra điều kiện hiển thị
    if (!lastPopupTime || currentTime - parseInt(lastPopupTime) > ONE_DAY) {
      const popup = document.getElementById("popup-2");
      if (!popup) return;

      // Hiện popup
      popup.classList.remove("popup-hidden");
      popup.classList.add("popup-visible"); // Thêm class này để đảm bảo hiển thị

      // Lưu thời điểm hiển thị
      localStorage.setItem("lastPopupTime", currentTime.toString());

      // Xử lý đóng popup
      const closeBtn = document.getElementById("close-popup-2");
      const overlay = document.getElementById("popup-2-overlay");

      function closePopup() {
        popup.classList.remove("popup-visible");
        popup.classList.add("popup-hidden");
      }

      if (closeBtn) closeBtn.addEventListener("click", closePopup);
      if (overlay) overlay.addEventListener("click", closePopup);
    }
  }, 1000);
}
