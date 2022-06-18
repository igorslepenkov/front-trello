function DigitalClock() {
	
	this.hours = "00";
	this.minutes = "00";
	this.seconds = "00";
		
	this.getTime = () => {
		this.date = new Date();
		this.hours = this.date.getHours().toString().padStart(2, "0");
		this.minutes = this.date.getMinutes().toString().padStart(2, "0");
		this.seconds = this.date.getSeconds().toString().padStart(2, "0");
		return `${this.hours}:${this.minutes}:${this.seconds}`;
	};

	this.render = () => {
		const headerClock = document.querySelector("#clock");
		headerClock.textContent = this.getTime();
		this.clock = headerClock;
	};

	this.update = () => {
		this.clock.textContent = this.getTime();
	};

	this.start = () => {
		this.render();
		setInterval(this.update, 1000)
	}
}

export { DigitalClock };
