import { getAllUsers, getUserById } from "../services/jsonPlaceholderApi.js";
import { getFormButtons } from "../utils/templates.js";
import { updateMockApiCard, postMockApiCard } from "../services/mockapi.js";
import { Card } from "./Card.js";
import { getDateTime } from "../utils/getDateTime.js";
import { GLOBAL_CONSTANTS } from "../utils/globalConstants.js";
import { updateCardCounter } from "./Desk.js";

function AddEditForm(cardToEdit = null) {
  this.getUsersSelectElement = (formElement, users) => {
    const select = document.createElement("select");

    for (const user of users) {
      const option = document.createElement("option");
      option.textContent = `${user.name}`;
      option.value = `${user.id}`;

      select.insertAdjacentElement("beforeend", option);

      if (cardToEdit && cardToEdit.user.id === user.id) {
        option.selected = true;
      }
    }

    formElement.insertAdjacentElement("beforeend", select);

    return select;
  };

  this.editCard = async (card) => {
    card.title = this.titleInput.value;
    card.description = this.descriptionInput.value;
    card.user = await getUserById(this.select.value);

    const newCard = new Card(await updateMockApiCard(card));

    newCard.render();

    this.remove();
  };

  this.addCard = async () => {
    const user = await getUserById(this.select.value);

    const cardData = {
      title: this.titleInput.value,
      description: this.descriptionInput.value,
      user,
      time: getDateTime(),
      column: GLOBAL_CONSTANTS.COLUMNS.TODO,
    };

    const card = await postMockApiCard(cardData);
		await updateCardCounter()
    new Card(card).render();
    this.remove();

    await updateCardCounter();
  };

  this.onClick = async ({ target }) => {
    if (target.dataset.action === "cancel") {
      this.remove();
    } else if (target.dataset.action === "confirm") {
      if (this.form.name === "edit") {
        await this.editCard(cardToEdit);
      } else if (this.form.name === "add") {
        await this.addCard();
      }
    }
  };

  this.render = async () => {
    const container = document.querySelector("#container");
    const wrapper = document.createElement("div");
    const form = document.createElement("form");

    const titleInput = document.createElement("input");
    const descriptionInput = document.createElement("textarea");

    const users = await getAllUsers();
    const select = this.getUsersSelectElement(form, users);

    const buttons = document.createElement("div");
    buttons.insertAdjacentHTML("beforeend", getFormButtons());

    wrapper.classList.add("form--wrapper");
    form.classList.add("form");
    cardToEdit ? (form.name = "edit") : (form.name = "add");
    titleInput.classList.add("form__title-input");
    descriptionInput.classList.add("form__description-input");
    select.classList.add("form__select-user-input");
    buttons.classList.add("form__buttons");

    if (cardToEdit) {
      titleInput.value = cardToEdit.title;
      descriptionInput.value = cardToEdit.description;
    }

    form.addEventListener("click", this.onClick);

    form.insertAdjacentElement("beforeend", titleInput);
    form.insertAdjacentElement("beforeend", descriptionInput);
    form.insertAdjacentElement("beforeend", select);
    form.insertAdjacentElement("beforeend", buttons);

    wrapper.insertAdjacentElement("beforeend", form);

    container.insertAdjacentElement("beforeend", wrapper);

    this.wrapper = wrapper;
    this.form = form;
    this.titleInput = titleInput;
    this.descriptionInput = descriptionInput;
    this.select = select;
  };

  this.remove = () => {
    this.wrapper.remove();
  };

  this.render();
}

export { AddEditForm };
