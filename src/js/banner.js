import { mountHTML } from "./../../utils/dom.js";

export async function mountBanner() {
  await mountHTML("banner", "src/components/banner.html", () => {
    setTimeout(() => {
      const el = document.querySelector(".swiper-container");
      if (!el || typeof Swiper === "undefined") return;
      new Swiper(".swiper-container", {
        loop: true,
        autoplay: { delay: 2500 },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          768: { slidesPerView: 1, spaceBetween: 10, height: 250 },
          1024: { slidesPerView: 1.5, spaceBetween: 5, height: 300 },
          1280: { slidesPerView: 2, spaceBetween: 5, height: 350 },
        },
      });
    }, 100);
  });
}
