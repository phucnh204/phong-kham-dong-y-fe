import { mountHTML } from "./../../utils/dom.js";

export async function mountHeader() {
  await mountHTML("header", "src/components/header.html");
}
