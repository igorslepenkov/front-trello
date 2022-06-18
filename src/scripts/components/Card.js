import { v4 as uuidv4 } from "uuid";

function Card(id, title, user, description, column) {
  id ? (this.id = id) : (this.id = uuidv4());
  this.title = title;
  this.user = user;
  this.description = description;
  this.getDateTime = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}.${month}.${year} | ${hours}:${minutes}`;
  };
  this.time = this.getDateTime();
  this.column = column;

  this.render = () => {
    let appendColumn = null;

    const cardElement = document.createElement("div");
    cardElement.id = this.id;
    cardElement.classList.add("card");
    let buttons = null;

    if (column === "todo") {
      cardElement.classList.add("card--todo");
      appendColumn = document.querySelector("#column-todo");
      buttons = `
        <div class="card__buttons">
          <button type="button" class="card__button card__button--edit">edit</button>
          <button type="button" class="card__button card__button--delete">delete</button>
        </div>
      `;
    } else if (column === "in-progress") {
      cardElement.classList.add("card--in-progress");
      appendColumn = document.querySelector("#column-in-progress");
      buttons = `
        <div class="card__buttons">
          <button type="button" class="card__buttton card__button--complete">complete</button>
        </div>
      `;
    } else if (column === "completed") {
      cardElement.classList.add("card--complited");
      appendColumn = document.querySelector("#column-completed");
      buttons = `
        <div class="card__buttons">
          <button type="button" class="card__button card__button--delete">delete</button>
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
  };
}

export { Card };
