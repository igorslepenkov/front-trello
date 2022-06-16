import { DigitalClock } from "./components/Сlock.js";
import { Card, renderCard } from "./components/Card.js";

function initApp() {
  const clock = new DigitalClock();

  const card1 = new Card("", "test", "test", "test", "todo");
  card1.render();
  console.log(card1);
}
initApp();
