import { removeAllCompletedCards } from "./Desk.js"

function CreateWarningModal(event) {
	this.modal = null;
	this.message = "Please, complete current tasks before starting new ones!";
	console.log(this.message);
	this.event = event
	console.log(event.target.id);
	if (this.event.target.id === "btn-delete-all") {
		this.message = "All completed task are going to be deleted";
	}
	console.log(this.message);

	this.render = () => {
    const container = document.querySelector("#container");

		const modal = document.createElement("dialog");
		const title = document.createElement("h2");
		const message = document.createElement("p");

		const buttonsContainer = document.createElement("div");
		const cancelBtn = document.createElement("button");
		const confirmBtn = document.createElement("button");

		modal.classList.add("modal");
		modal.classList.add("modal--warning");
		modal.id = "modal-warning";

		title.classList.add("modal__title");
		title.textContent = "Warning!";

		message.classList.add("modal__message");
		message.textContent = this.message;

		buttonsContainer.classList.add("modal__buttons");
		cancelBtn.classList.add("modal__button");
		cancelBtn.classList.add("modal__button--cancel");
		cancelBtn.textContent = "Cancel"
		confirmBtn.classList.add("modal__button");
		confirmBtn.classList.add("modal__button--confirm");
		confirmBtn.textContent = "Confirm";

		confirmBtn.addEventListener('click', async () => {
			if (this.event.target.id === "btn-delete-all") {
				await removeAllCompletedCards();
			}			
			this.modal.remove();
		});
	
		cancelBtn.addEventListener('click', () => {
			this.modal.remove();
		});

		buttonsContainer.append(cancelBtn, confirmBtn);
		modal.append(title, message, buttonsContainer)
		container.append(modal)

		modal.showModal();

		this.modal = modal;
	}

	this.remove = () => {
		this.modal.remove();
	} 
}


export {CreateWarningModal}