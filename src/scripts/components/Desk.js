import { getMockApiCards } from "../services/mockapi.js";
import { GLOBAL_CONSTANTS } from "../utils/globalConstants.js";
import { AddEditForm } from "./AddEditForm.js";

const todoColumn = document.querySelector(`#${GLOBAL_CONSTANTS.COLUMNS.TODO}`);
const inProgressColumn = document.querySelector(
  `#${GLOBAL_CONSTANTS.COLUMNS.IN_PROGRESS}`
);
const doneColumn = document.querySelector(`#${GLOBAL_CONSTANTS.COLUMNS.DONE}`);

const addBtn = todoColumn.querySelector("#btn-add-todo");
addBtn.addEventListener("click", () => {
  const form = new AddEditForm();
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

export { enableDrag, updateCardCounter };
