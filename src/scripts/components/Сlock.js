import { getDateTime } from "../utils/getDateTime.js";

function DigitalClock() {
  this.render = () => {
    const headerClock = document.querySelector("#clock");
    headerClock.textContent = getDateTime("time");
    this.clock = headerClock;
  };

  this.update = () => {
    this.clock.textContent = getDateTime("time");
  };

  this.start = () => {
    this.render();
    setInterval(this.update, 1000);
  };
}

export { DigitalClock };
