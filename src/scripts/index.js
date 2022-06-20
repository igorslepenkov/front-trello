import { DigitalClock } from "./components/Сlock.js";
import { enableDrag, updateCardCounter } from "./components/Desk";
import { Card } from "./components/Card.js";
import { GLOBAL_CONSTANTS } from "./utils/globalConstants.js";
import { postMockApiCard, getMockApiCards } from "./services/mockapi.js"

async function initApp() {
  const clock = new DigitalClock();
  clock.start();

  const card1 = new Card({
    title: "title",
    user: { name: "Test Testovich" },
    description: "Hello world!",
    column: GLOBAL_CONSTANTS.COLUMNS.TODO,
  }).render();

  const card2 = new Card({
    title: "title1",
    user: { name: "Test Akakievich" },
    description: "Peace!",
    column: GLOBAL_CONSTANTS.COLUMNS.TODO,
  }).render();

  const card3 = new Card({
    title: "title2",
    user: { name: "Test Evkakievich" },
    description: "Are you ready for pain?",
    column: GLOBAL_CONSTANTS.COLUMNS.TODO,
  }).render();


	await	postMockApiCard(card1);
	await	postMockApiCard(card2);
	await	postMockApiCard(card3);

	await updateCardCounter();

  enableDrag();
}

document.addEventListener("DOMContentLoaded", initApp);
