import { mountHTML } from "./../../utils/dom.js";
export async function mountFooter() {
  await mountHTML("footer", "src/components/footer.html");
}
