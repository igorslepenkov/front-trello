function enableDrag() {

	const columns = document.querySelectorAll(".column");

	columns.forEach(column => {
		column.addEventListener("dragover", onColumnDrop)
	})

	function onColumnDrop(event) {
		event.preventDefault();
		const {currentTarget, clientY} = event;
		
		const cardsContainer = currentTarget.children[1];
		const dragged = document.querySelector(`[data-dragged='true']`);

		const appendPlace = getDraggableInsertPlace(currentTarget, clientY);


		if (appendPlace == Number.NEGATIVE_INFINITY) {
			cardsContainer.appendChild(dragged);
		} else cardsContainer.insertBefore(dragged, appendPlace);
	}

	function getDraggableInsertPlace(container, mousePositionY) {
		const cards = [...container.querySelectorAll(`[data-dragged='false']:not([data-dragged='true'])`)];

		const appendPlace = cards.reduce((closest, card) => {
			const cardBox = card.getBoundingClientRect();
			const offset = mousePositionY - cardBox.top - cardBox.height / 2;
			if (offset < 0 && offset > closest) {
				return card
			} else {
				return closest
			}
		}, Number.NEGATIVE_INFINITY)

		return appendPlace
	}
}


export {enableDrag};