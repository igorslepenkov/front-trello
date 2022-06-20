import { DigitalClock } from "./components/Сlock.js";
import { enableDrag } from "./components/Column.js";
import { Card } from "./components/Card.js";

function initApp() {
  const clock = new DigitalClock();
  clock.start();

  const card1 = new Card({
    title: "title",
    user: { name: "Test Testovich" },
    description: "Hello world!",
    column: "column-todo",
  }).render();

  const card2 = new Card({
    title: "title1",
    user: { name: "Test Akakievich" },
    description: "Peace!",
    column: "column-todo",
  }).render();

  const card3 = new Card({
    title: "title2",
    user: { name: "Test Evkakievich" },
    description: "Are you ready for pain?",
    column: "column-todo",
  }).render();

  enableDrag();
}

document.addEventListener("DOMContentLoaded", initApp);
