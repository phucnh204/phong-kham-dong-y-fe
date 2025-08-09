import { mountHTML } from "./../../utils/dom.js";
export async function mountCardDoctor() {
  await mountHTML("card-doctor", "src/components/card-doctor.html");
}
