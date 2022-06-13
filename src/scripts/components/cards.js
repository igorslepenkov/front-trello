function Card(id, title, user, description, column) {
  this.id = id;
  this.title = title;
  this.user = user;
  this.description = description;
  this.getDateTime = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}.${month}.${year} | ${hours}:${minutes}`;
  };
  this.time = this.getDateTime();
  this.column = column;
}

function renderCard({ id, title, description, user: { name }, time, column }) {
  let appendColumn = null;

  const cardElement = document.createElement("div");
  cardElement.id = id;
  cardElement.classList.add('card');
  let buttons = null;

  if (column === 'todo') {
    cardElement.classList.add('todo-card');
    appendColumn = document.querySelector('#todo');
    buttons = `
      <div class="card__buttons">
        <button class="card__button__edit">edit</button>
        <button class="card__button__delete">delete</button>
      </div>
    `;
  } else if (column === 'in-progress') {
    cardElement.classList.add('in-progress-card');
    appendColumn = document.querySelector('#in-progress');
    buttons = `
      <div class="card__buttons">
        <button class="card__buttton__complete">complete</button>
      </div>
    `;
  } else if (column === 'completed') {
    cardElement.classList.add('completed-card');
    appendColumn = document.querySelector('#completed');
    buttons = `
      <div class="card__buttons">
        <button class="card__button__delete">delete</button>
      </div>
    `;
  }

  const appendColumnContent = appendColumn.querySelector('.column__content');

  const html = `
      ${buttons}
      <div class="card__details">
        <h4 class="card__title">${title}</h4>
        <p class="card__description">${description}</p>
        <p class="card__user">${name}</p>
        <p class="card__time">${time}</p>
      </div>
  `;

  cardElement.insertAdjacentHTML("afterbegin", html);
  appendColumnContent.insertAdjacentElement('beforeend', cardElement);
}

export { Card, renderCard };
