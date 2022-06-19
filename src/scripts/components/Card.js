import { getDateTime } from "../utils/getDateTime.js";

function Card(mockapiObject, title, user, description, column) {
  this.id = mockapiObject.id || null;
  this.title = mockapiObject.title || title;
  this.user = mockapiObject.user || user;
  this.description = mockapiObject.description || description;
  this.column = mockapiObject.column || column;
  this.element = document.querySelector(`#card-${mockapiObject.id}`) || null;
  this.time = mockapiObject.time || getDateTime();

  this.render = () => {
    if (this.element) {
      this.element.remove();
    }

    let appendColumn = null;

    const cardElement = document.createElement("div");
    cardElement.id = `card-${this.id}`;
    cardElement.classList.add("card");
    let buttons = null;

    if (this.column === "todo") {
      cardElement.classList.add("card--todo");
      appendColumn = document.querySelector("#column-todo");
      buttons = `
        <div class="card__buttons">
          <button type="button" class="card__button--edit">edit</button>
          <button type="button" class="card__button--delete">delete</button>
        </div>
      `;
    } else if (this.column === "in-progress") {
      cardElement.classList.add("card--in-progress");
      appendColumn = document.querySelector("#column-in-progress");
      buttons = `
        <div class="card__buttons">
          <button type="button" class="card__buttton--complete">complete</button>
        </div>
      `;
    } else if (this.column === "completed") {
      cardElement.classList.add("card--complited");
      appendColumn = document.querySelector("#column-completed");
      buttons = `
        <div class="card__buttons">
          <button type="button" class="card__button--delete">delete</button>
        </div>
      `;
    }

    const appendColumnContent = appendColumn.querySelector(".column__content");

    const html = `
        ${buttons}
        <div class="card__details">
          <h4 class="card__title">${this.title}</h4>
          <p class="card__description">${this.description}</p>
          <p class="card__user">${this.user.name}</p>
          <p class="card__time">${this.time}</p>
        </div>
    `;

    cardElement.insertAdjacentHTML("afterbegin", html);
    appendColumnContent.insertAdjacentElement("beforeend", cardElement);
    this.element = cardElement;
  };

  this.remove = () => {
    this.element.parentElement.removeChild(this.element);
  };
}

export { Card };
