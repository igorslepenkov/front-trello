function DigitalClock() {

	this.date = new Date();
	this.hours = this.date.getHours().toString().padStart(2, "0");
	this.minutes = this.date.getMinutes().toString().padStart(2, "0");
	this.seconds = this.date.getSeconds().toString().padStart(2, "0");

	this.renderClock = function () {
		const headerClock = document.querySelector("#clock");
		headerClock.textContent = `${this.hours}:${this.minutes}:${this.seconds}`;
	};
}

export { DigitalClock };