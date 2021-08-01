const player = document.getElementById("player");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const submitButton = document.getElementById("submit-btn");

let player1Name;
let player2Name;

submitButton.addEventListener("click", handleSubmitClick, { once: true });

function handleSubmitClick() {
  console.log(player1.value);
  console.log(player2.value);

  localStorage.setItem("player1Name", player1.value);
  localStorage.setItem("player2Name", player2.value);
  player1.value = "";
  player2.value = "";
  location.href = "main.html";
}
