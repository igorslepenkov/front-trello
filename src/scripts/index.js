import { DigitalClock } from "./components/Сlock.js";

async function initApp() {
  const clock = new DigitalClock();
  clock.start();
}
initApp();
