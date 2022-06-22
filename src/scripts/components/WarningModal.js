
function CreateWarningModal() {
	this.modal = document.querySelector('#modal-warning');
	this.message = this.modal.querySelector('#warning-message');
	this.confirmBtn = this.modal.querySelector('[data-action="confirm"]');
	this.cancelBtn = this.modal.querySelector('[data-action="cancel"]');


	this.confirmBtn.addEventListener('click', () => {
		modal.close()
		message.textContent = ""
		return "confirmed"
	});

	this.cancelBtn.addEventListener('click', () => {
		modal.close()
		message.textContent = ""
		return "canceled"
	});

	this.popWarningModal = (event) => {
		const modal = document.querySelector('#modal-warning');
		const message = modal.querySelector('#warning-message');

		if (event.target.dragged === "true") {
			message.textContent = "Please, complete current tasks before starting new ones!"
			modal.openModal()
		} else if (event.target.id === "btn-delete-all") {
			modal.openModal()
		}	
	}
}


export {CreateWarningModal}