import { mountHTML } from "./../../utils/dom.js";

export async function mountService() {
  await mountHTML("service", "src/components/service.html");

  // Hiển thị các dịch vụ ẩn khi nhấn "Xem Thêm"
  document
    .getElementById("show-more-btn")
    .addEventListener("click", function () {
      const hiddenServices = document.querySelectorAll(".service-item.hidden");
      hiddenServices.forEach((service) => {
        service.classList.remove("hidden");
      });

      document.getElementById("show-more-btn").style.display = "none";

      document.getElementById("hide-btn").style.display = "inline-block";
    });

  // Ẩn các dịch vụ khi nhấn "Ẩn Bớt"
  document.getElementById("hide-btn").addEventListener("click", function () {
    const allServices = document.querySelectorAll(".service-item");
    allServices.forEach((service, index) => {
      if (index >= 8) {
        service.classList.add("hidden"); // Thêm class 'hidden' để ẩn các dịch vụ từ 9 trở đi
      }
    });

    // Hiển thị lại nút "Xem Thêm"
    document.getElementById("show-more-btn").style.display = "inline-block";

    // Ẩn nút "Ẩn Bớt"
    document.getElementById("hide-btn").style.display = "none";
  });
}
