import { DigitalClock } from "./components/Сlock.js";
import { enableDrag } from "./components/Column.js";
import {Card} from "./components/Card.js"

async function initApp() {
  const clock = new DigitalClock();
  clock.start();

	const card1 = new Card ("", "title", "user", "description", "column-todo");
	card1.render()
	const card2 = new Card ("", "title", "user", "description", "column-todo");
	card2.render()
	const card3 = new Card ("", "title", "user", "description", "column-todo");
	card3.render()
  
  enableDrag();
}

initApp();
