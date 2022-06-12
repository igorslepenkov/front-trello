import {DigitalClock} from "./components/clock.js";

function initApp () {
	setInterval( () => {
		const clock = new DigitalClock;
		clock.renderClock();
	}, 1000);
}

initApp();