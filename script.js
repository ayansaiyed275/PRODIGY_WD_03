
let boxes = document.querySelectorAll(".box");
let turnDisplay = document.querySelector(".turn-box");
let resultDisplay = document.querySelector("#results");
let playAgainBtn = document.querySelector("#play-again");
let modeSelect = document.querySelector("#game-mode");

let turn = "X";
let isGameOver = false;
let isComputerMode = false;

function initializeGame() {
    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
        e.addEventListener("click", handleBoxClick);
    });

    turn = "X";
    isGameOver = false;
    resultDisplay.innerHTML = "";
    playAgainBtn.style.display = "none";
    document.querySelector(".bg").style.left = "0";
    removeLine();
}

function handleBoxClick(event) {
    if (!isGameOver && event.target.innerHTML === "") {
        event.target.innerHTML = turn;
        checkWin();
        checkDraw();
        if (!isGameOver) {
            changeTurn();
            if (isComputerMode && turn === "O") {
                setTimeout(computerMove, 500);
            }
        }
    }
}

function changeTurn() {
    turn = turn === "X" ? "O" : "X";
    document.querySelector(".bg").style.left = turn === "X" ? "0" : "85px";
}

function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (boxes[a].innerHTML && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML) {
            isGameOver = true;
            resultDisplay.innerHTML = turn + " Wins!";
            playAgainBtn.style.display = "inline";
            drawLine(condition);
            boxes[a].style.backgroundColor = "#000";
            boxes[b].style.backgroundColor = "#000";
            boxes[c].style.backgroundColor = "#000";
            boxes[a].style.color = "#fff";
            boxes[b].style.color = "#fff";
            boxes[c].style.color = "#fff";

            break;
        }
    }
}

function checkDraw() {
    if (!isGameOver && [...boxes].every(box => box.innerHTML !== "")) {
        isGameOver = true;
        resultDisplay.innerHTML = "Draw";
        playAgainBtn.style.display = "inline";
    }
}

function computerMove() {
    let emptyBoxes = [...boxes].filter(box => box.innerHTML === "");
    if (emptyBoxes.length > 0) {
        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        randomBox.click();
    }
}

function drawLine(winningBoxes) {
    let line = document.createElement('div');
    line.className = 'winning-line';
    document.querySelector('.main-grid').appendChild(line);

    let start = boxes[winningBoxes[0]].getBoundingClientRect();
    let end = boxes[winningBoxes[2]].getBoundingClientRect();

    let angle = Math.atan2(end.top - start.top, end.left - start.left);
    let length = Math.sqrt(Math.pow(end.left - start.left, 2) + Math.pow(end.top - start.top, 2));

    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}rad)`;
    line.style.top = `${start.top + start.height / 2 - line.offsetHeight / 2}px`;
    line.style.left = `${start.left + start.width / 2}px`;
}

function removeLine() {
    let line = document.querySelector('.winning-line');
    if (line) line.remove();
}

modeSelect.addEventListener("change", (event) => {
    isComputerMode = event.target.value === "computer";
    initializeGame();
});

playAgainBtn.addEventListener("click", initializeGame);

initializeGame();