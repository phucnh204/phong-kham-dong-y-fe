// // CSS styles scroll
// document.head.insertAdjacentHTML(
//   "beforeend",
//   `
//   <style>
//     html {
//       scroll-behavior: smooth;
//     }

//     /* Active nav link styling */
//     .nav-link.active {
//       background-color: rgb(34 197 94);
//       color: white;
//     }
//   </style>
// `
// );

// // Load header
// fetch("./src/components/header.html")
//   .then((res) => res.text())
//   .then((html) => {
//     document.getElementById("header").innerHTML = html;
//   });

// // Load navbar
// fetch("./src/components/navbar.html")
//   .then((res) => res.text())
//   .then((html) => {
//     const navbarElement = document.getElementById("navbar");
//     navbarElement.innerHTML = html;
//     setupNavigation();
//   });

// function setupNavigation() {
//   requestAnimationFrame(() => {
//     const menuBtn = document.getElementById("menu-btn");
//     const closeBtn = document.getElementById("close-menu");
//     const menu = document.getElementById("menu");
//     let overlay = document.getElementById("overlay");

//     // Nếu không tìm thấy overlay, tạo một cái mới
//     if (!overlay) {
//       overlay = document.createElement("div");
//       overlay.id = "overlay";
//       overlay.className = "fixed inset-0 bg-black bg-opacity-50 z-30 hidden";
//       document.body.appendChild(overlay);
//       console.log("Created new overlay element");
//     }

//     if (!menuBtn || !closeBtn || !menu) {
//       console.error("Thiếu element navigation cơ bản:", {
//         menuBtn: !!menuBtn,
//         closeBtn: !!closeBtn,
//         menu: !!menu,
//       });
//       return;
//     }

//     // Open menu
//     menuBtn.addEventListener("click", function (e) {
//       console.log("Menu button clicked");
//       e.stopPropagation();
//       menu.classList.remove("translate-x-full");
//       menu.classList.add("translate-x-0");
//       overlay.classList.remove("hidden");
//       document.body.style.overflow = "hidden";
//     });

//     // Close menu
//     function closeMenu() {
//       console.log("Closing menu");
//       menu.classList.add("translate-x-full");
//       menu.classList.remove("translate-x-0");
//       overlay.classList.add("hidden");
//       document.body.style.overflow = "auto";
//     }

//     closeBtn.addEventListener("click", closeMenu);
//     overlay.addEventListener("click", closeMenu);

//     // Handle navigation links
//     const navLinks = document.querySelectorAll(".nav-link");

//     navLinks.forEach((link) => {
//       link.addEventListener("click", function (e) {
//         e.preventDefault();

//         // Close mobile menu if open
//         if (window.innerWidth < 768) {
//           closeMenu();
//         }

//         // Get target section
//         const targetId = this.getAttribute("href").substring(1);
//         const targetSection = document.getElementById(targetId);

//         if (targetSection) {
//           const navbar = document.querySelector("nav");
//           const navbarHeight = navbar ? navbar.offsetHeight : 0;
//           const targetPosition = targetSection.offsetTop - navbarHeight - 20;

//           // Smooth scroll to target
//           window.scrollTo({
//             top: Math.max(0, targetPosition),
//             behavior: "smooth",
//           });

//           // Update active link
//           navLinks.forEach((nav) => nav.classList.remove("active"));
//           this.classList.add("active");
//         }
//       });
//     });

//     // Handle window resize
//     window.addEventListener("resize", function () {
//       if (window.innerWidth >= 768) {
//         closeMenu();
//       }
//     });

//     // Update active nav on scroll
//     window.addEventListener("scroll", function () {
//       let current = "";
//       const sections = ["banner", "about", "service", "card-doctor"];

//       sections.forEach((sectionId) => {
//         const section = document.getElementById(sectionId);
//         if (section) {
//           const sectionTop = section.offsetTop - 100;
//           const sectionHeight = section.offsetHeight;

//           if (
//             window.scrollY >= sectionTop &&
//             window.scrollY < sectionTop + sectionHeight
//           ) {
//             current = sectionId;
//           }
//         }
//       });

//       // Update nav links
//       navLinks.forEach((link) => {
//         link.classList.remove("active");
//         if (link.getAttribute("href") === `#${current}`) {
//           link.classList.add("active");
//         }
//       });
//     });
//   });
// }

// // Load banner and setup swiper
// fetch("./src/components/banner.html")
//   .then((res) => res.text())
//   .then((html) => {
//     document.getElementById("banner").innerHTML = html;

//     setTimeout(() => {
//       const swiperContainer = document.querySelector(".swiper-container");
//       if (swiperContainer) {
//         const swiper = new Swiper(".swiper-container", {
//           loop: true,
//           autoplay: {
//             delay: 2500,
//           },
//           pagination: {
//             el: ".swiper-pagination",
//             clickable: true,
//           },
//           navigation: {
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//           },
//           breakpoints: {
//             768: {
//               slidesPerView: 1,
//               spaceBetween: 10,
//               height: 250,
//             },
//             1024: {
//               slidesPerView: 1.5,
//               spaceBetween: 5,
//               height: 300,
//             },
//             1280: {
//               slidesPerView: 2,
//               spaceBetween: 5,
//               height: 350,
//             },
//           },
//         });
//       }
//     }, 100);
//   });

// fetch("./src/components/service.html")
//   .then((res) => res.text())
//   .then((html) => {
//     document.getElementById("service").innerHTML = html;
//   });

// fetch("./src/components/why-chosse.html")
//   .then((res) => res.text())
//   .then((html) => {
//     document.getElementById("why-chosse").innerHTML = html;
//   });

// fetch("./src/components/about.html")
//   .then((res) => res.text())
//   .then((html) => {
//     document.getElementById("about").innerHTML = html;
//   });

// fetch("./src/components/card-doctor.html")
//   .then((res) => res.text())
//   .then((html) => {
//     document.getElementById("card-doctor").innerHTML = html;
//   });

// // Load dat-lich và khởi tạo popup
// fetch("./src/components/dat-lich.html")
//   .then((res) => res.text())
//   .then((html) => {
//     const mount = document.getElementById("dat-lich");
//     if (!mount) return;
//     mount.innerHTML = html;

//     // Khởi tạo popup sau khi HTML đã gắn vào DOM
//     setupDatLichPopup();

//     // Nếu trong dat-lich.html có input date thì set min ngay
//     setTodayMinForDateInputs(mount);
//   })
//   .catch((err) => console.error("[dat-lich]", err));

// // Set min date theo múi giờ VN
// function setTodayMinForDateInputs(root = document) {
//   const tzVN = "Asia/Ho_Chi_Minh";
//   const nowVN = new Date(
//     new Date().toLocaleString("en-US", { timeZone: tzVN })
//   );
//   const yyyy = nowVN.getFullYear();
//   const mm = String(nowVN.getMonth() + 1).padStart(2, "0");
//   const dd = String(nowVN.getDate()).padStart(2, "0");
//   const today = `${yyyy}-${mm}-${dd}`;
//   root.querySelectorAll('input[type="date"]').forEach((el) => (el.min = today));
// }

// // Chạy lại các <script> bên trong nội dung vừa load
// async function loadInlineScripts(container) {
//   const scripts = container.querySelectorAll("script");
//   for (const old of scripts) {
//     const s = document.createElement("script");
//     if (old.src) s.src = old.src;
//     else s.textContent = old.textContent;
//     document.head.appendChild(s);
//     document.head.removeChild(s);
//   }
// }

// function setupDatLichPopup() {
//   const btn = document.getElementById("btn-dang-ky");
//   const popup = document.getElementById("popup");
//   const overlay = popup?.firstElementChild;
//   const popupContent = document.getElementById("popup-content");
//   const closeBtn = document.getElementById("close-popup");
//   const FORM_URL = "./src/components/form-dat-lich.html";

//   if (!btn || !popup || !overlay || !popupContent || !closeBtn) {
//     console.warn("Thiếu element cho popup đặt lịch");
//     return;
//   }

//   function openPopup() {
//     popup.classList.remove("hidden");
//     document.body.style.overflow = "hidden";
//     btn.setAttribute("aria-expanded", "true");
//     setTodayMinForDateInputs(popup);
//   }

//   function closePopup() {
//     popup.classList.add("hidden");
//     document.body.style.overflow = "";
//     btn.setAttribute("aria-expanded", "false");
//   }

//   btn.addEventListener("click", async () => {
//     try {
//       popupContent.innerHTML =
//         '<div class="p-8 text-center text-gray-500"><div class="inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>Đang tải form...</div>';

//       const res = await fetch(FORM_URL, { cache: "no-store" });
//       if (!res.ok) throw new Error("Không tải được form đặt lịch");

//       popupContent.innerHTML = await res.text();
//       await loadInlineScripts(popupContent);
//       openPopup();
//     } catch (e) {
//       popupContent.innerHTML = `
//         <div class="p-8 text-center text-red-600">
//           <h3 class="text-lg font-semibold mb-2">Lỗi tải form</h3>
//           <p>${e.message || "Đã có lỗi xảy ra"}</p>
//           <button class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//             onclick="document.getElementById('popup').classList.add('hidden'); document.body.style.overflow='';">
//             Đóng
//           </button>
//         </div>`;
//       openPopup();
//     }
//   });

//   closeBtn.addEventListener("click", closePopup);
//   popup.addEventListener("click", (e) => {
//     if (e.target === overlay) closePopup();
//   });
//   window.addEventListener("keydown", (e) => {
//     if (e.key === "Escape" && !popup.classList.contains("hidden")) closePopup();
//   });

//   // Event delegation cho form bên trong popupContent
//   popupContent.addEventListener("submit", async (e) => {
//     const form = e.target.closest("form");
//     if (!form) return;
//     e.preventDefault();

//     const formData = new FormData(form);
//     const data = Object.fromEntries(formData);

//     if (!data.fullName || !data.phone || !data.appointmentDate) {
//       alert("Vui lòng điền đầy đủ Họ tên, SĐT và Ngày khám!");
//       return;
//     }
//     if (!/^\d{9,12}$/.test(data.phone.trim())) {
//       alert("Số điện thoại chưa hợp lệ.");
//       return;
//     }

//     const submitBtn = form.querySelector('[type="submit"]');
//     const originalText = submitBtn?.textContent;
//     if (submitBtn) {
//       submitBtn.disabled = true;
//       submitBtn.textContent = "Đang gửi...";
//     }

//     try {
//       console.log("Form data:", data); // log ra như bạn muốn
//       alert("Cảm ơn bạn! Chúng tôi sẽ liên hệ xác nhận lịch hẹn sớm nhất.");
//       form.reset();
//       closePopup();
//     } catch (err) {
//       console.error(err);
//       alert("Có lỗi xảy ra, vui lòng thử lại.");
//     } finally {
//       if (submitBtn) {
//         submitBtn.disabled = false;
//         submitBtn.textContent = originalText || "Gửi đặt lịch hẹn";
//       }
//     }
//   });
// }

// // Load footer
// fetch("./src/components/footer.html")
//   .then((res) => res.text())
//   .then((html) => {
//     document.getElementById("footer").innerHTML = html;
//   });
// main.js (type="module")
import { mountNavbar } from "./src/js/navbar.js";
import { mountBanner } from "./src/js/banner.js";
import { mountService } from "./src/js/service.js";
import { mountWhyChoose } from "./src/js/why-choose.js";
import { mountAbout } from "./src/js/about.js";
import { mountCardDoctor } from "./src/js/card-doctor.js";
import { mountBooking } from "./src/js/booking.js";
import { mountFooter } from "./src/js/footer.js";
import { mountHeader as _mountHeader } from "./src/js/header.js";

(async () => {
  try {
    await _mountHeader();
    await mountNavbar();
    await mountBanner();
    await mountService();
    await mountWhyChoose();
    await mountAbout();
    await mountCardDoctor();
    await mountBooking();
    await mountFooter();
  } catch (e) {
    console.error("Lopoix load trang :", e);
  }
})();
