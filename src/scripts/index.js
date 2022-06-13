import { DigitalClock } from "./components/clock.js";
import { Card, renderCard } from './components/cards.js';

function initApp() {
	setInterval(() => {
		const clock = new DigitalClock();
		clock.renderClock();
	}, 1000);
}
initApp();