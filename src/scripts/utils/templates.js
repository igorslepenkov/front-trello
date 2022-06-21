// html templates for the card constructor function

function getTemplateCard(buttons, title, description, userName, time) {
  return `
	${buttons}
	<div class="card__details">
		<h4 class="card__title">${title}</h4>
		<p class="card__description">${description}</p>
		<p class="card__user">${userName}</p>
		<p class="card__time">${time}</p>
	</div>
`;
}

function getTemplateTodoCardBtn() {
  return `
	<div class="card__buttons">
		<button type="button" class="card__button card__button--edit">edit</button>
		<button type="button" class="card__button card__button--delete" data-action="delete">delete</button>
	</div>
`;
}

function getTemplateInProgressCardBtn() {
  return `
	<div class="card__buttons">
		<button type="button" class="card__button card__button--complete" data-action="complete">complete</button>
	</div>
`;
}

function getTemplateCompletedCardBtn() {
  return `
	<div class="card__buttons">
		<button type="button" class="card__button card__button--delete" data-action="delete">delete</button>
	</div>
`;
}

export {
  getTemplateCard,
  getTemplateTodoCardBtn,
  getTemplateInProgressCardBtn,
  getTemplateCompletedCardBtn,
};
