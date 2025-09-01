import { mountHTML } from "./../utils/dom.js";

export async function mountService() {
  

  // Đợi DOM được mount xong trước khi query
  await new Promise(resolve => setTimeout(resolve, 0));

  const grid = document.getElementById("service-grid");
  

  if (!grid) {
    console.error("❌ Không tìm thấy #service-grid. HTML chưa mount?");
    return;
  }

  try {
    

    const res = await fetch("http://localhost:8080/services");
    console.log("Dữ liêuj fetch:", res);

    if (!res.ok) throw new Error("Fetch failed: " + res.status);

    const services = await res.json();
    console.log(" Dữ liệu services:", services);

    grid.innerHTML = "";

    services.forEach((service, index) => {
      const div = document.createElement("div");
      div.className =
        "service-item bg-white p-4 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300" +
        (index >= 8 ? " hidden" : "");
      div.setAttribute("data-aos", "fade-up");
      div.setAttribute("data-aos-duration", "1000");

      div.innerHTML = `
        <img src="${service.imageUrl}" alt="${service.serviceName}"
            class="w-full h-48 object-cover rounded-lg mb-4" />
        <h3 class="font-semibold text-xl text-center">${service.serviceName}</h3>
        <p class="text-center">${service.description}</p>
      `;

      grid.appendChild(div);
    });

    // Nút xem thêm
    document.getElementById("show-more-btn").addEventListener("click", () => {
      document.querySelectorAll(".service-item.hidden").forEach((s) => s.classList.remove("hidden"));
      document.getElementById("show-more-btn").style.display = "none";
      document.getElementById("hide-btn").style.display = "inline-block";
    });

    // Nút ẩn bớt
    document.getElementById("hide-btn").addEventListener("click", () => {
      document.querySelectorAll(".service-item").forEach((s, i) => {
        if (i >= 8) s.classList.add("hidden");
      });
      document.getElementById("show-more-btn").style.display = "inline-block";
      document.getElementById("hide-btn").style.display = "none";
    });
  } catch (e) {
    console.error("❌ Lỗi khi gọi API:", e);
  }
}

