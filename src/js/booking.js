import {
  mountHTML,
  setTodayMinForDateInputs,
  loadInlineScripts,
} from "./../../utils/dom.js";

const notyf = new Notyf();
//  CẤU HÌNH EMAILJS
const EMAILJS_PUBLIC_KEY = "lL74gALJybmkQUAEU";
const EMAILJS_SERVICE_ID = "service_0e2hc33";
const EMAILJS_TEMPLATE_ID = "template_ugfj5jn";

// Nạp SDK EmailJS
async function ensureEmailJS() {
  if (window.emailjs && window.__emailjsInited) return;

  if (!window.emailjs) {
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "src/libs/email.min.js";
      // "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      s.async = true;
      s.onload = resolve;
      s.onerror = () => reject(new Error("Không tải được SDK EmailJS"));
      document.head.appendChild(s);
    });
  }
  if (window.emailjs && !window.__emailjsInited) {
    window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    window.__emailjsInited = true;
  }
}

export async function mountBooking() {
  await mountHTML("dat-lich", "src/components/dat-lich.html", () => {
    setupDatLichPopup();
    setTodayMinForDateInputs(document.getElementById("dat-lich"));
  });
}

function setupDatLichPopup() {
  const btn = document.getElementById("btn-dang-ky");
  const popup = document.getElementById("popup");
  const overlay = popup?.firstElementChild;
  const popupContent = document.getElementById("popup-content");
  const closeBtn = document.getElementById("close-popup");
  // const FORM_URL = "./src/components/form-dat-lich.html";
  const FORM_URL = "../src/components/form-dat-lich.html";

  if (!btn || !popup || !overlay || !popupContent || !closeBtn) {
    console.warn("Thiếu element cho popup đặt lịch");
    return;
  }

  function openPopup() {
    popup.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    btn.setAttribute("aria-expanded", "true");
    setTodayMinForDateInputs(popup);
  }

  function closePopup() {
    popup.classList.add("hidden");
    document.body.style.overflow = "";
    btn.setAttribute("aria-expanded", "false");
  }

  //
  btn.addEventListener("click", async () => {
    try {
      popupContent.innerHTML =
        '<div class="p-8 text-center text-gray-500"><div class="inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>Đang tải form...</div>';
      const res = await fetch(FORM_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("Không tải được form đặt lịch");
      popupContent.innerHTML = await res.text();
      await loadInlineScripts(popupContent);
      openPopup();
    } catch (e) {
      popupContent.innerHTML = `
        <div class="p-8 text-center text-red-600">
          <h3 class="text-lg font-semibold mb-2">Lỗi tải form</h3>
          <p>${e.message || "Đã có lỗi xảy ra"}</p>
          <button class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onclick="document.getElementById('popup').classList.add('hidden'); document.body.style.overflow='';">
            Đóng
          </button>
        </div>`;
      openPopup();
    }
  });

  closeBtn.addEventListener("click", closePopup);
  popup.addEventListener("click", (e) => {
    if (e.target === overlay) closePopup();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !popup.classList.contains("hidden")) closePopup();
  });

  // Gửi EmailJS
  popupContent.addEventListener("submit", async (e) => {
    const form = e.target.closest("form");
    if (!form) return;
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate bắt buộc
    if (!data.fullName || !data.phone || !data.appointmentDate) {
      notyf.error("Vui lòng điền đầy đủ Họ tên, SĐT và Ngày khám!");
      return;
    }

    // Validate số điện thoại VN
    const phone = (data.phone || "").trim();
    const vnPhoneOk = /^(?:\+?84|0)(?:\d){9,10}$/.test(phone);
    if (!vnPhoneOk) {
      notyf.error(
        "Số điện thoại Việt Nam chưa hợp lệ (vd: 0912345678 hoặc +84912345678)."
      );
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn?.textContent;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Đang gửi...";
    }

    try {
      // Đảm bảo EmailJS sẵn sàng (nếu đã nạp qua index.html thì có thể bỏ dòng này)

      await ensureEmailJS();

      const payload = {
        from_name: (data.fullName || "").trim(),
        phone: phone,
        appointment_date: data.appointmentDate,
        appointment_time: data.appointmentTime,
        email: data.email || "",
        message: data.message,
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload);

      notyf.success(
        "Cảm ơn bạn đã tinm tưởng! Chúng tôi đã nhận được thông tin và sẽ liên hệ sớm nhất."
      );
      form.reset();
      closePopup();
    } catch (err) {
      console.error(err);
      notyf.error("Có lỗi khi gửi đặt lịch. Vui lòng thử lại sau ít phút.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText || "Gửi đặt lịch hẹn";
      }
    }
  });
}
