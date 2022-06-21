import { getDateTime } from "../utils/getDateTime.js";
import {
  getTemplateCard,
  getTemplateTodoCardBtn,
  getTemplateInProgressCardBtn,
  getTemplateCompletedCardBtn,
} from "../utils/templates.js";
import { GLOBAL_CONSTANTS } from "../utils/globalConstants.js";
import { updateCardCounter } from "./Desk.js";
import { deleteMockApiCard, updateMockApiCard } from "../services/mockApi.js";

function Card(cardDataObject) {
  this.id = cardDataObject.id || null;
  this.title = cardDataObject.title || "Undefined card title";
  this.user = cardDataObject.user || { name: "Undefined username" };
  this.description = cardDataObject.description || "Undefined card description";
  this.column = cardDataObject.column || GLOBAL_CONSTANTS.COLUMNS.TODO;
  this.element = document.querySelector(`#card-${cardDataObject.id}`) || null;
  this.time = cardDataObject.time || getDateTime();

  this.onDragStart = (event) => {
    const { target } = event;
    target.dataset.dragged = "true";
    target.classList.add("card--dragged");
  };

  this.onDragEnd = async (event) => {
    const { target } = event;
    target.dataset.dragged = "false";
    target.classList.remove("card--dragged");

    this.column = event.composedPath()[2].id;

    const currentClass = target.classList[1];
    if (this.column === GLOBAL_CONSTANTS.COLUMNS.TODO) {
      target.classList.replace(currentClass, "card--todo");
    } else if (this.column === GLOBAL_CONSTANTS.COLUMNS.IN_PROGRESS) {
      target.classList.replace(currentClass, "card--in-progress");
    } else if (this.column === GLOBAL_CONSTANTS.COLUMNS.DONE) {
      target.classList.replace(currentClass, "card--complited");
    }

		await updateMockApiCard(this);
		await updateCardCounter();
    this.render();
	};

  this.onClick = async ({ target }) => {
    console.log("hello");
    if (target.dataset.action === "delete") {
      this.element.remove();
      await deleteMockApiCard(this);
    } else if (target.dataset.action === "complete") {
      this.column = GLOBAL_CONSTANTS.COLUMNS.DONE;
      await updateMockApiCard(this);
      this.render();
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
      getDateTime()
    );

    cardElement.insertAdjacentHTML("afterbegin", html);
    appendColumnContent.insertAdjacentElement("beforeend", cardElement);

    cardElement.addEventListener("dragstart", (event) => {
      this.onDragStart(event);
    });
    cardElement.addEventListener("dragend", (event) => this.onDragEnd(event));
    cardElement.addEventListener("click", this.onClick);

    this.element = cardElement;
  };
}

export { Card };
