export function setTodayMinForDateInputs(root = document) {
  const tzVN = "Asia/Ho_Chi_Minh";
  const nowVN = new Date(
    new Date().toLocaleString("en-US", { timeZone: tzVN })
  );
  const yyyy = nowVN.getFullYear();
  const mm = String(nowVN.getMonth() + 1).padStart(2, "0");
  const dd = String(nowVN.getDate()).padStart(2, "0");
  const today = `${yyyy}-${mm}-${dd}`;
  root.querySelectorAll('input[type="date"]').forEach((el) => (el.min = today));
}

export async function loadInlineScripts(container) {
  const scripts = container.querySelectorAll("script");
  for (const old of scripts) {
    const s = document.createElement("script");
    if (old.src) s.src = old.src;
    else s.textContent = old.textContent;
    document.head.appendChild(s);
    document.head.removeChild(s);
  }
}

export async function mountHTML(containerId, url, after) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  el.innerHTML = await res.text();
  if (after) after(el);
}
