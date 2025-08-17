import { mountNavbar } from "./src/js/navbar.js";
import { mountBanner } from "./src/js/banner.js";
import { mountService } from "./src/js/service.js";
import { mountWhyChoose } from "./src/js/why-choose.js";
import { mountAbout } from "./src/js/about.js";
import { mountCardDoctor } from "./src/js/card-doctor.js";
import { mountBooking } from "./src/js/booking.js";
import { mountFooter } from "./src/js/footer.js";
import { mountPopup } from "./src/js/popup.js";
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
    await mountPopup();
  } catch (e) {
    console.error("Lopoix load trang :", e);
  }
})();
