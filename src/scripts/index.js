import {DigitalClock} from "./components/_clock.js";

function init () {
	setInterval( () => {
		const clock = new DigitalClock;
		clock.renderClock();
	}, 1000);
}

init();