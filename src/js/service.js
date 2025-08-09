import { mountHTML } from "./../../utils/dom.js";
export async function mountService() {
  await mountHTML("service", "src/components/service.html");
}
