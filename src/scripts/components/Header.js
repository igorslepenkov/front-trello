export function displayCurrentTime () {
	const headerClock = document.querySelector("#header__clock");

	const date = new Date ();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	headerClock.textContent = `${hours}:${minutes}:${seconds}`;
}
 