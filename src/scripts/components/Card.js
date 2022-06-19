import { v4 as uuidv4 } from "uuid";
import {getTemplateCard, getTemplateTodoCardBtn, getTemplateInProgressCardBtn, getTemplateCompletedCardBtn} from "../utils/templates.js"

function Card(id, title, user, description, column) {
  
	this.id = id || uuidv4();
  this.title = title;
  this.user = user;
  this.description = description;
	this.time = null;
  this.column = column;

  this.getDateTime = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return this.time = `${day}.${month}.${year} | ${hours}:${minutes}`;
  };

  this.render = () => {
    let appendColumn = null;

    const cardElement = document.createElement("div");
    cardElement.id = this.id;
    cardElement.classList.add("card");
		cardElement.draggable = "true";
		cardElement.dataset.dragged = "false";
    let buttons = null;

    if (column === "column-todo") {
      cardElement.classList.add("card--todo");
      appendColumn = document.querySelector("#column-todo");
      buttons = getTemplateTodoCardBtn();
    } else if (column === "column-in-progress") {
      cardElement.classList.add("card--in-progress");
      appendColumn = document.querySelector("#column-in-progress");
      buttons = getTemplateInProgressCardBtn();
    } else if (column === "column-completed") {
      cardElement.classList.add("card--complited");
      appendColumn = document.querySelector("#column-completed");
      buttons = getTemplateCompletedCardBtn();
    }

		cardElement.addEventListener("dragstart", ({target}) => {
			target.dataset.dragged = "true";
			target.classList.add("card--dragged");
		});

		cardElement.addEventListener("dragend", ({target}) => {
			target.dataset.dragged = "false";
			target.classList.remove("card--dragged");
			target.column =  event.composedPath()[2].id;
			this.column = target.column;

			const currentClass = target.classList[1];
			if (target.column === "column-todo") {
				cardElement.classList.replace(currentClass, "card--todo")
				buttons = getTemplateTodoCardBtn();
			} else if (target.column === "column-in-progress") {
				cardElement.classList.replace(currentClass, "card--in-progress");
				buttons = getTemplateInProgressCardBtn();
			} else if (target.column === "column-completed") {
				cardElement.classList.replace(currentClass, "card--complited");
				buttons = getTemplateCompletedCardBtn();
			}
	
			target.innerHTML = getTemplateCard(buttons, this.title, this.description, this.user.name, this.time)
		})

    const appendColumnContent = appendColumn.querySelector(".column__content");

		const html = getTemplateCard(buttons, this.title, this.description, this.user.name, this.getDateTime());

    cardElement.insertAdjacentHTML("afterbegin", html);
    appendColumnContent.insertAdjacentElement("beforeend", cardElement);
  };	
}


export { Card };
