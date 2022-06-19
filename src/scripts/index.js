import { DigitalClock } from "./components/Сlock.js";
import { enableDrag } from "./components/Column.js";

async function initApp() {
  const clock = new DigitalClock();
  clock.start();
  
  enableDrag();
}

initApp();
