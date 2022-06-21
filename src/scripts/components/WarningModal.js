
function enableWarningModal() {
	const modal = document.querySelector('#modal-warning');
	const message = modal.querySelector('#warning-message');
	const confirmBtn = modal.querySelector('[data-action="confirm"]');
	const cancelBtn = modal.querySelector('[data-action="cancel"]');


	confirmBtn.addEventListener('click', () => {
		modal.close()
		message.textContent = ""
		return "confirmed"
	});

	cancelBtn.addEventListener('click', () => {
		modal.close()
		message.textContent = ""
		return "canceled"
	});
}

function popWarningModal(event) {
	const modal = document.querySelector('#modal-warning');
	const message = modal.querySelector('#warning-message');

	if (event.target.dragged === "true") {
		message.textContent = "Please, complete current tasks before starting new ones!"
		modal.openModal()
	} else if (event.target.id === "btn-delete-all") {
		modal.openModal()
	}	
}


export {enableWarningModal, popWarningModal}