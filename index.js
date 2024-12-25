const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to initialize the game
function initGame() {
    currentPlayer = "X"; // Set initial player to "X"
    gameGrid = ["", "", "", "", "", "", "", "", ""]; // Empty the game grid
    // Reset the UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // Reset the box CSS classes
        box.classList = `box box${index + 1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Turn - Player ${currentPlayer}`;
}

initGame();

// Function to swap the turn
function swapTurn() {
    currentPlayer = currentPlayer === "X" ? "0" : "X";
    // Update UI
    gameInfo.innerText = `Current Turn - Player ${currentPlayer}`;
}

// Function to check if the game is over
function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        // Check if all 3 boxes are non-empty and have the same value
        if (
            gameGrid[position[0]] !== "" &&
            gameGrid[position[0]] === gameGrid[position[1]] &&
            gameGrid[position[1]] === gameGrid[position[2]]
        ) {
            // Determine the winner
            answer = gameGrid[position[0]];

            // Disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            // Highlight the winning boxes
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // If we have a winner
    if (answer !== "") {
        gameInfo.innerText = `Winner - Player ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // Check for a tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") fillCount++;
    });

    // If all boxes are filled and no winner, it's a tie
    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
}

// Function to handle a box click
function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // Swap turn
        swapTurn();
        // Check if the game is over
        checkGameOver();
    }
}

// Add click event listeners to the boxes
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

// Add click event listener to the new game button
newGameBtn.addEventListener("click", initGame);
