import { throws } from "assert";

function CreateWarningModal({type}) {
	this.modal = null;
	this.message = "";
	if (type === "dragend") {
		this.message = "Please, complete current tasks before starting new ones!";
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

		confirmBtn.addEventListener('click', () => {
			modal.close();
			this.modal.remove();
		});
	
		cancelBtn.addEventListener('click', () => {
			modal.close();
			this.modal.remove();
		});

		buttonsContainer.append(cancelBtn, confirmBtn);
		modal.append(title, message, buttonsContainer)
		container.append(modal)

		this.modal = modal;
	}

	this.popup = () => {
		this.modal.showModal();
	}

	this.remove = () => {
		this.modal.remove();
	} 
}


export {CreateWarningModal}