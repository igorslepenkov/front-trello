import {DigitalClock} from "./components/clock.js";
import {enableDrag} from "./utils/drag.js"

function initApp () {
	setInterval( () => {
		const clock = new DigitalClock;
		clock.renderClock();
	}, 1000);
}

initApp();

enableDrag()