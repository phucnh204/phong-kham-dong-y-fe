import { mountHTML } from "./src/utils/dom.js";

import { mountService } from "./src/js/service.js";

import { mountPopup } from "./src/js/popup.js";
import { mountNavbar } from "./src/js/navbar.js";
import { mountBanner } from "./src/js/banner.js";
import { mountWhyChoose } from "./src/js/why-choose.js";
import { mountAbout } from "./src/js/about.js";
import { mountCardDoctor } from "./src/js/card-doctor.js";
import { mountBooking } from "./src/js/booking.js";
import { mountFooter } from "./src/js/footer.js";
import { mountHeader as _mountHeader } from "./src/js/header.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await mountHTML("service", "src/components/service.html");
    await mountService();

    await mountHTML("card-doctor", "src/components/card-doctor.html");
    await mountCardDoctor();

    await mountHTML("dat-lich", "src/components/dat-lich.html");
    await mountBooking();

    await mountPopup();
    await _mountHeader();
    await mountNavbar();
    await mountBanner();
    await mountWhyChoose();
    await mountAbout();

    await mountFooter();
  } catch (e) {
    console.error("❌ Lỗi load trang:", e); // LOG BẮT BUỘC
  }
});
