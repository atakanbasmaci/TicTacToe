let board;
const playerO = "O";
const playerX = "X";
let currPlayer = playerO;
let gameOver = false;
let winner = "";

const restart = document.querySelector(".restart");
const gameOverPanel = document.querySelector(".gameOverPanel");
const gameOverContent = document.querySelector(".gameOverPanel p");
const turnPanel = document.querySelector(".turn");
const whoseTurn = document.querySelector(".player");

window.onload = () => {
    setGame();
}

whoseTurn.innerText = currPlayer;

let setGame = () => {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.innerText = "";

            tile.addEventListener("click", () => {
                if (gameOver) return;

                let coordinates = tile.id.split("-");
                let r = parseInt(coordinates[0]);
                let c = parseInt(coordinates[1]);

                if (board[r][c] !== ' ') return;

                board[r][c] = currPlayer;
                tile.innerText = currPlayer;

                if (currPlayer == playerO) {
                    currPlayer = playerX;
                }
                else {
                    currPlayer = playerO;
                }

                whoseTurn.innerText = currPlayer;

                checkWinner();
            });

            document.querySelector("#board").appendChild(tile);
        }
    }
}

function checkWinner() {
    for (let r = 0; r < 3; r++) {

        //horizontally check
        if (board[r][0] === board[r][1] && board[r][1] === board[r][2] && board[r][0] !== " ") {

            let tile;
            for (let i = 0; i < 3; i++) {
                tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }

            setWinner(tile);
        }
    }

    for (let c = 0; c < 3; c++) {
        //vertically check
        if (board[0][c] === board[1][c] && board[1][c] === board[2][c] && board[0][c] !== " ") {

            let tile;
            for (let i = 0; i < 3; i++) {
                tile = document.getElementById(i.toString() + "-" + c.toString());
                tile.classList.add("winner");
            }

            setWinner(tile);
        }
    }

    //diagonally check
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        let tile;
        for (let i = 0; i < 3; i++) {
            tile = document.getElementById(i.toString() + "-" + i.toString());
            tile.classList.add("winner");
        }

        setWinner(tile);
    }

    //anti-diagonally check
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        //0-2
        let tile = document.getElementById("0-2");
        tile.classList.add("winner");

        //1-1
        tile = document.getElementById("1-1");
        tile.classList.add("winner");

        //2-0
        tile = document.getElementById("2-0");
        tile.classList.add("winner");

        setWinner(tile);
    }

    //check if all cells are filled
    if (board.every((row) => row.every((element) => element !== ' '))) {
        gameOver = true;
        gameOverPanel.style.display = "flex";
        gameOverContent.innerText = "Draw !";
    }
}

function setWinner(tile) {

    if (tile.innerText === "X") {
        winner = playerX;
    } else {
        winner = playerO;
    }

    gameOver = true;

    gameOverPanel.style.display = "flex";
    gameOverContent.innerText += " " + winner + "!";
    turnPanel.style.display = "none";
}

restart.addEventListener('click', () => {
    document.location.reload();
})