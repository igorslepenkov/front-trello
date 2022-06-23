import {
  getTemplateCard,
  getTemplateTodoCardBtn,
  getTemplateInProgressCardBtn,
  getTemplateCompletedCardBtn,
} from "../utils/templates.js";
import { GLOBAL_CONSTANTS } from "../utils/globalConstants.js";
import { updateCardCounter, checkInProgressCounter } from "./Desk.js";
import { deleteMockApiCard, updateMockApiCard } from "../services/mockApi.js";
import { AddEditForm } from "./AddEditForm.js";
import { CreateWarningModal } from "./WarningModal.js";

function Card(cardDataObject) {
  this.id = cardDataObject.id || null;
  this.title = cardDataObject.title || "Undefined card title";
  this.user = cardDataObject.user || { name: "Undefined username" };
  this.description = cardDataObject.description || "Undefined card description";
  this.column = cardDataObject.column;
  this.element = document.querySelector(`#card-${cardDataObject.id}`) || null;
  this.time = cardDataObject.time;

  this.onDragStart = (event) => {
    const { target } = event;
    target.dataset.dragged = "true";
    target.classList.add("card--dragged");
  };

  this.onDragEnd = async (event) => {
    const { target } = event;
    target.dataset.dragged = "false";
    target.classList.remove("card--dragged");

    if (checkInProgressCounter(event)) {
      const modal = new CreateWarningModal(event);
      modal.render();
      event.stopPropagation();
    } else this.column = event.composedPath()[2].id;

    const currentClass = target.classList[1];
    if (this.column === GLOBAL_CONSTANTS.COLUMNS.TODO) {
      target.classList.replace(currentClass, "card--todo");
    } else if (this.column === GLOBAL_CONSTANTS.COLUMNS.IN_PROGRESS) {
      target.classList.replace(currentClass, "card--in-progress");
    } else if (this.column === GLOBAL_CONSTANTS.COLUMNS.DONE) {
      target.classList.replace(currentClass, "card--complited");
    }
    this.render();

    await updateMockApiCard(this);

    await updateCardCounter();
  };

  this.onClick = async (event) => {
    const { target } = event;
    if (target.dataset.action === "delete") {
      this.element.remove();
      await deleteMockApiCard(this);
      await updateCardCounter();
    } else if (target.dataset.action === "complete") {
      this.column = GLOBAL_CONSTANTS.COLUMNS.DONE;
      await updateMockApiCard(this);
      await updateCardCounter();
      this.render();
      await updateCardCounter();
    } else if (target.dataset.action === "edit") {
      new AddEditForm(this);
    } else if (
      target.dataset.action === "forward" ||
      target.parentElement.dataset.action === "forward"
    ) {
      if (
        this.column === GLOBAL_CONSTANTS.COLUMNS.TODO &&
        checkInProgressCounter(event, GLOBAL_CONSTANTS.COLUMNS.IN_PROGRESS)
      ) {
        const modal = new CreateWarningModal(event);
        modal.render();
        event.stopPropagation();
      } else {
        await this.moveForward();
      }
    } else if (
      target.dataset.action === "back" ||
      target.parentElement.dataset.action === "back"
    ) {
      await this.moveBack();
    }
  };

  this.onMouseOver = () => {
    if (!this.element.querySelector(".card__nav-buttons")) {
      const navButtons = document.createElement("div");
      navButtons.classList.add("card__nav-buttons");

      const htmlForwardArrow = '<i class="fa-solid fa-arrow-right"></i>';
      const htmlBackArrow = '<i class="fa-solid fa-arrow-left"></i>';

      if (this.column === GLOBAL_CONSTANTS.COLUMNS.TODO) {
        const forwardButton = document.createElement("button");
        forwardButton.dataset.action = "forward";
        forwardButton.type = "button";
        forwardButton.classList.add("card__forward-button");

        forwardButton.insertAdjacentHTML("afterbegin", htmlForwardArrow);

        navButtons.insertAdjacentElement("beforeend", forwardButton);
        this.element.insertAdjacentElement("beforeend", navButtons);
      } else if (this.column === GLOBAL_CONSTANTS.COLUMNS.IN_PROGRESS) {
        const forwardButton = document.createElement("button");
        const backButton = document.createElement("button");

        forwardButton.classList.add("card__forward-button");
        forwardButton.dataset.action = "forward";
        forwardButton.type = "button";

        backButton.classList.add("card__back-button");
        backButton.dataset.action = "back";
        backButton.type = "button";

        forwardButton.insertAdjacentHTML("afterbegin", htmlForwardArrow);
        backButton.insertAdjacentHTML("afterbegin", htmlBackArrow);

        navButtons.insertAdjacentElement("beforeend", backButton);
        navButtons.insertAdjacentElement("beforeend", forwardButton);

        this.element.insertAdjacentElement("beforeend", navButtons);
      } else if (this.column === GLOBAL_CONSTANTS.COLUMNS.DONE) {
        const backButton = document.createElement("button");
        backButton.dataset.action = "back";
        backButton.type = "button";

        backButton.classList.add("card__back-button");

        backButton.insertAdjacentHTML("afterbegin", htmlBackArrow);

        navButtons.insertAdjacentElement("beforeend", backButton);
        this.element.insertAdjacentElement("beforeend", navButtons);
      }
    }
  };

  this.onMouseLeave = () => {
    if (this.element.querySelector(".card__nav-buttons")) {
      const navButtons = this.element.querySelector(".card__nav-buttons");
      navButtons.remove();
    }
  };

  this.moveForward = async () => {
    if (this.column === GLOBAL_CONSTANTS.COLUMNS.TODO) {
      this.column = GLOBAL_CONSTANTS.COLUMNS.IN_PROGRESS;
      this.render();
      await updateMockApiCard(this);
      await updateCardCounter();
    } else if (this.column === GLOBAL_CONSTANTS.COLUMNS.IN_PROGRESS) {
      this.column = GLOBAL_CONSTANTS.COLUMNS.DONE;
      this.render();
      await updateMockApiCard(this);
      await updateCardCounter();
    }
  };

  this.moveBack = async () => {
    if (this.column === GLOBAL_CONSTANTS.COLUMNS.DONE) {
      this.column = GLOBAL_CONSTANTS.COLUMNS.IN_PROGRESS;
      this.render();
      await updateMockApiCard(this);
      await updateCardCounter();
    } else if (this.column === GLOBAL_CONSTANTS.COLUMNS.IN_PROGRESS) {
      this.column = GLOBAL_CONSTANTS.COLUMNS.TODO;
      this.render();
      await updateMockApiCard(this);
      await updateCardCounter();
    }
  };

  this.render = () => {
    if (this.element) {
      this.element.remove();
    }

    let appendColumn = null;

    const cardElement = document.createElement("div");
    cardElement.id = `card-${this.id}`;
    cardElement.classList.add("card");
    cardElement.draggable = "true";
    cardElement.dataset.dragged = "false";

    let buttons = null;

    if (this.column === GLOBAL_CONSTANTS.COLUMNS.TODO) {
      cardElement.classList.add("card--todo");
      appendColumn = document.querySelector("#column-todo");
      buttons = getTemplateTodoCardBtn();
    } else if (this.column === GLOBAL_CONSTANTS.COLUMNS.IN_PROGRESS) {
      cardElement.classList.add("card--in-progress");
      appendColumn = document.querySelector("#column-in-progress");
      buttons = getTemplateInProgressCardBtn();
    } else if (this.column === GLOBAL_CONSTANTS.COLUMNS.DONE) {
      cardElement.classList.add("card--complited");
      appendColumn = document.querySelector("#column-completed");
      buttons = getTemplateCompletedCardBtn();
    }

    const appendColumnContent = appendColumn.querySelector(".column__content");

    const html = getTemplateCard(
      buttons,
      this.title,
      this.description,
      this.user.name,
      this.time
    );

    cardElement.insertAdjacentHTML("afterbegin", html);
    appendColumnContent.insertAdjacentElement("beforeend", cardElement);

    cardElement.addEventListener("dragstart", (event) => {
      this.onDragStart(event);
    });
    cardElement.addEventListener("dragend", (event) => this.onDragEnd(event));
    cardElement.addEventListener("click", this.onClick);
    cardElement.addEventListener("mouseover", this.onMouseOver);
    cardElement.addEventListener("mouseleave", this.onMouseLeave);

    this.element = cardElement;
  };
}

export { Card };
