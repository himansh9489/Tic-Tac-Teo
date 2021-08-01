const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winning-message");
const restartButton = document.getElementById("restartButton");
const returnButton = document.getElementById("returnButton");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn;
let player1Name;
let player2Name;

console.log(cellElements);

startGame();

restartButton.addEventListener("click", restartGame);

returnButton.addEventListener("click", function () {
  location.href = "index.html";
});

function restartGame() {
  winningMessageElement.classList.remove("show");
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
  });
  startGame();
}

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
}
// to handle the click event for each cell
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  //place mark
  placeMark(cell, currentClass);
  // check for win/draw
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    //switch turns
    swapTurn();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw";
    winningMessageElement.style.color = "yellow";
  } else {
    player1Name = localStorage.getItem("player1Name");
    player2Name = localStorage.getItem("player2Name");
    //console.log(player1Name);
    //console.log(player2Name);
    if (circleTurn) {
      if (player2Name == "") {
        winningMessageTextElement.innerText = `${CIRCLE_CLASS} wins!`;
      } else {
        winningMessageTextElement.innerText = `${player2Name} wins!`;
      }
      winningMessageElement.style.color = "green";
    } else {
      if (player1Name == "") {
        winningMessageTextElement.innerText = `${X_CLASS} wins!`;
      } else {
        winningMessageTextElement.innerText = `${player1Name} wins!`;
      }
      winningMessageElement.style.color = "blue";
    }
  }
  winningMessageElement.classList.add("show");
}

// to print X/O in the each cell
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
// to change form X to O or Vise Versa
function swapTurn() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATION.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}
