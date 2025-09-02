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

    // services.forEach((service, index) => {
    //   const div = document.createElement("div");
    //   div.className =
    //     "service-item bg-white p-4 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300" +
    //     (index >= 8 ? " hidden" : "");
    //   div.setAttribute("data-aos", "fade-up");
    //   div.setAttribute("data-aos-duration", "1000");

    //   div.innerHTML = `
    //     <img src="${service.imageUrl}" alt="${service.serviceName}"
    //         class="w-full h-48 object-cover rounded-lg mb-4" />
    //     <h3 class="font-semibold text-xl text-center">${service.serviceName}</h3>
    //     <p class="text-center">${service.description}</p>
    //   `;

    //   grid.appendChild(div);
    // });

    // Nút xem thêm
    
  services.forEach((service, index) => {
  const div = document.createElement("div");

  div.className = [
  "service-item",
  "bg-white/80",
  "backdrop-blur-md",
  // "p-6",
  "rounded-2xl",
  "shadow-lg",
  "hover:shadow-2xl",
  "hover:-translate-y-2",
  "hover:scale-[1.03]",
  "transition-transform",
  "duration-500",
  "ease-out",
  "cursor-pointer",
  "border",
  "border-gray-200",
  "hover:border-blue-300",
  "hover:ring-2",
  "hover:ring-blue-100",
  "group",
  index >= 8 ? "hidden" : ""
].join(" ");


  div.setAttribute("data-aos", index % 2 === 0 ? "fade-up" : "zoom-in");
  div.setAttribute("data-aos-duration", "900");
  div.setAttribute("data-aos-delay", `${index * 120}`);
  div.setAttribute("data-aos-anchor-placement", "top-bottom");

  div.innerHTML = `
    <div class="overflow-hidden rounded-lg mb-4 relative aspect-video">
      <img src="${service.imageUrl}" 
           alt="${service.serviceName}"
           class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2" 
           onerror="this.src='https://via.placeholder.com/400x300?text=Service+Image'" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
    
    <div class="text-center space-y-3">
      <h3 class="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
        ${service.serviceName}
      </h3>
      <p class="text-gray-600 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
        ${service.description}
      </p>

      <!-- CTA button -->
      <div class="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <button class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/50">
          Khám phá
          <svg class="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  `;

  div.addEventListener("click", () => {
    console.log("Service clicked:", service.serviceName);
    // showServiceDetails(service);
  });

  grid.appendChild(div);
});


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

