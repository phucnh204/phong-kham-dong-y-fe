import { mountHTML } from "../utils/dom.js";

export async function mountCardDoctor() {
  await mountHTML("card-doctor", "src/components/card-doctor.html");

  const grid = document.getElementById("doctor-grid");
  if (!grid) return;

  try {
    const res = await fetch("http://localhost:8080/doctors"); // API thật
    if (!res.ok) throw new Error("Lỗi khi gọi API doctor: " + res.status);
    const doctors = await res.json();

    // Làm sạch trước
    grid.innerHTML = "";

    doctors.forEach((doctor, index) => {
      const div = document.createElement("div");
      div.className =
        "doctor-item text-center p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300" +
        (index >= 4 ? " hidden" : "");

      div.innerHTML = `
        <img src="${doctor.imageUrl}" alt="${doctor.name}" class="w-auto h-36 mx-auto object-cover mb-4" />
        <h3 class="mt-2 font-bold text-xl text-green-700">${doctor.name}</h3>
        <p class="text-gray-600">${doctor.specialization}</p>
        <p class="text-gray-500 text-sm mt-2 p-2">${doctor.description}</p>
      `;

      grid.appendChild(div);
    });
  } catch (e) {
    console.error("Không load được dữ liệu bác sĩ:", e);
  }

  // Xử lý nút "Xem thêm"
  document.getElementById("show-more-btn-2").addEventListener("click", () => {
    document.querySelectorAll(".doctor-item.hidden").forEach((el) => {
      el.classList.remove("hidden");
    });
    document.getElementById("show-more-btn-2").classList.add("hidden");
    document.getElementById("hide-btn-2").classList.remove("hidden");
  });

  document.getElementById("hide-btn-2").addEventListener("click", () => {
    document.querySelectorAll(".doctor-item").forEach((el, index) => {
      if (index >= 4) el.classList.add("hidden");
    });
    document.getElementById("show-more-btn-2").classList.remove("hidden");
    document.getElementById("hide-btn-2").classList.add("hidden");
  });
}

