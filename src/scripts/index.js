import { DigitalClock } from "./components/Сlock.js";
import { Card, renderCard } from "./components/Card.js";
import {enableDrag} from "./components/Column.js";

function initApp() {
  const clock = new DigitalClock();
	clock.start();

  const card1 = new Card("", "test1", "test", "test", "column-todo");
  card1.render();

	const card2 = new Card("", "test2", "test", "test", "column-todo");
  card2.render();

	const card3 = new Card("", "test3", "test", "test", "column-todo");
  card3.render();

	enableDrag();
}
initApp();
