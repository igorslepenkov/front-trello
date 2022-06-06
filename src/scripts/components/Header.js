export function displayCurrentTime () {
	const headerClock = document.querySelector("#header__clock");

	const date = new Date ();
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const seconds = date.getSeconds().toString().padStart(2, "0");

	headerClock.textContent = `${hours}:${minutes}:${seconds}`;
}
 