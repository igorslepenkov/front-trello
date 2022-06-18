import { DigitalClock } from "./components/Сlock.js";
import { Card, renderCard } from "./components/Card.js";
import {enableDrag} from "./utils/drag";

function initApp() {
  const clock = new DigitalClock();
	clock.start();

  const card1 = new Card("", "test", "test", "test", "todo");
  card1.render();
	console.log(card1);

	enableDrag();
}
initApp();
