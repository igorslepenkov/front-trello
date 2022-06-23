import { getMockApiCards, deleteMockApiCard } from "../services/mockapi.js";
import { GLOBAL_CONSTANTS } from "../utils/globalConstants.js";
import { AddEditForm } from "./AddEditForm.js";
import { Card } from "./Card.js";
import { CreateWarningModal } from "./WarningModal.js";

const addBtn = document.querySelector("#btn-add-todo");
addBtn.addEventListener("click", () => {
  new AddEditForm();
});

const deleteCompletedBtn = document.querySelector("#btn-delete-all")
deleteCompletedBtn.addEventListener("click", (event) => {
	const modal = new CreateWarningModal (event);
	modal.render();
});

function enableDrag() {
  const columns = document.querySelectorAll(".column");

  columns.forEach((column) => {
    column.addEventListener("dragover", onColumnDragover);
  });

  function onColumnDragover(event) {
    event.preventDefault();
    const { currentTarget, clientY } = event;

    const cardsContainer = currentTarget.children[1];
    const dragged = document.querySelector(`[data-dragged='true']`);

    const appendPlace = getDraggableInsertPlace(currentTarget, clientY);

    if (appendPlace == Number.NEGATIVE_INFINITY) {
      cardsContainer.appendChild(dragged);
    } else cardsContainer.insertBefore(dragged, appendPlace);
  }

  function getDraggableInsertPlace(container, mousePositionY) {
    const cards = [
      ...container.querySelectorAll(
        `[data-dragged='false']:not([data-dragged='true'])`
      ),
    ];

    const appendPlace = cards.reduce((closest, card) => {
      const cardBox = card.getBoundingClientRect();
      const offset = mousePositionY - cardBox.top - cardBox.height / 2;
      if (offset < 0 && offset > closest) {
        return card;
      } else {
        return closest;
      }
    }, Number.NEGATIVE_INFINITY);

    return appendPlace;
  }
}

const updateCardCounter = async () => {
  const cards = await getMockApiCards();

  const todo = cards.filter(
    (card) => card.column === GLOBAL_CONSTANTS.COLUMNS.TODO
  );
  const inProgress = cards.filter(
    (card) => card.column === GLOBAL_CONSTANTS.COLUMNS.IN_PROGRESS
  );
  const done = cards.filter(
    (card) => card.column === GLOBAL_CONSTANTS.COLUMNS.DONE
  );

  const counterTodo = document.getElementById(GLOBAL_CONSTANTS.COUNTERS.TODO);
  const counterInProgress = document.getElementById(
    GLOBAL_CONSTANTS.COUNTERS.IN_PROGRESS
  );
  const counterDone = document.getElementById(GLOBAL_CONSTANTS.COUNTERS.DONE);

  counterTodo.textContent = todo.length;
  counterInProgress.textContent = inProgress.length;
  counterDone.textContent = done.length;
};

function checkInProgressCounter (event) {
	const inProgressCounterValue = document.getElementById(GLOBAL_CONSTANTS.COUNTERS.IN_PROGRESS).textContent;
	let checkResult = null; 
	if (event.type === "dragend") {
		const dropColumn = event.composedPath()[2];
		checkResult = dropColumn.id === GLOBAL_CONSTANTS.COLUMNS.IN_PROGRESS && inProgressCounterValue >= 6
	} else {
		checkResult 
	}
	return checkResult
}

const removeAllCompletedCards = async () => {
  const cards = await getMockApiCards();

  for (const card of cards) {
    if (card.column === GLOBAL_CONSTANTS.COLUMNS.DONE) {
      await deleteMockApiCard(card);
      const cardElement = document.querySelector(`#card-${card.id}`);
      cardElement.remove();
    }
  }
  await updateCardCounter();
};

export { enableDrag, updateCardCounter, checkInProgressCounter, removeAllCompletedCards };