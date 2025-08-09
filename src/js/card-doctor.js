import { mountHTML } from "./../../utils/dom.js";

// Hàm tải thông tin bác sĩ
export async function mountCardDoctor() {
  await mountHTML("card-doctor", "src/components/card-doctor.html");

  // Hiển thị các bác sĩ ẩn khi nhấn "Xem Thêm"
  document
    .getElementById("show-more-btn-2")
    .addEventListener("click", function () {
      const hiddenDoctors = document.querySelectorAll(".doctor-item.hidden");
      hiddenDoctors.forEach((doctor) => {
        doctor.classList.remove("hidden"); // Loại bỏ lớp 'hidden' để hiển thị
      });

      // Ẩn nút "Xem Thêm"
      document.getElementById("show-more-btn-2").style.display = "none";

      // Hiển thị nút "Ẩn Bớt"
      document.getElementById("hide-btn-2").style.display = "inline-block";
    });

  // Ẩn các bác sĩ khi nhấn "Ẩn Bớt"
  document.getElementById("hide-btn-2").addEventListener("click", function () {
    const allDoctors = document.querySelectorAll(".doctor-item");
    allDoctors.forEach((doctor, index) => {
      if (index >= 4) {
        doctor.classList.add("hidden"); // Thêm lớp 'hidden' để ẩn các bác sĩ từ bác sĩ thứ 5
      }
    });

    // Hiển thị lại nút "Xem Thêm"
    document.getElementById("show-more-btn-2").style.display = "inline-block";

    // Ẩn nút "Ẩn Bớt"
    document.getElementById("hide-btn-2").style.display = "none";
  });
}
