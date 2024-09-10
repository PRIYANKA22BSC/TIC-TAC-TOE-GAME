

let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newgame");
let gif = document.querySelector(".gif");
let msg = document.querySelector(".msg");
let turnO = true; //playerX, playerO
let count = 0; //To Track Draw
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  gif.classList.remove("show"); // Hide the message for a new game
  msg.innerText = ""; // Clear the message text
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") { // Only proceed if the box is empty
      if (turnO) {
        //playerO
        box.innerText = "O";
        turnO = false;
      } else {
        //playerX
        box.innerText = "X";
        turnO = true;
      }
      
      box.disabled = true;
      count++;

      let isWinner = checkWinner();
      if (count === 9 && !isWinner) {
        gameDraw();
      }
    }
  });
});


const gameDraw = () => {
  msg.innerText = `Game was  Draw.`;
  gif.classList.add("show"); // Show the draw message
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const showWinner = (winner) => {
  msg.innerText = `Player ${winner} won the game!`;
  gif.classList.add("show"); // Apply the 'show' class to reveal the message
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false; // No winner yet
};

newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
