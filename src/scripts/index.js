import { DigitalClock } from "./components/Сlock.js";
import { enableDrag, updateCardCounter } from "./components/Desk.js";
import { Card } from "./components/Card.js";
import { getMockApiCards } from "./services/mockApi.js";
import { enableWarningModal } from "./components/WarningModal.js"

async function initApp() {
  const clock = new DigitalClock();
  clock.start();

  const cards = await getMockApiCards();
  cards.forEach((card) => {
    const cardElement = new Card(card);
    cardElement.render();
  });

  await updateCardCounter();

  enableDrag();
}

document.addEventListener("DOMContentLoaded", initApp);
