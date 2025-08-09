import { mountHTML } from "./../../utils/dom.js";
export async function mountAbout() {
  await mountHTML("about", "src/components/about.html");
}
