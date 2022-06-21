import { DigitalClock } from "./components/Сlock.js";
import { enableDrag } from "./components/Column.js";
import { Card } from "./components/Card.js";
import { getMockApiCards } from "./services/mockApi.js";

async function initApp() {
  const clock = new DigitalClock();
  clock.start();

  enableDrag();
}

document.addEventListener("DOMContentLoaded", initApp);
