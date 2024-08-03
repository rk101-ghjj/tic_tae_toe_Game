let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;
let playerXScore = 0;
let playerOScore = 0;

boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
        }
    });
});

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 !== "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " wins";
            document.querySelector("#play-again").style.display = "inline";
            updateScore(turn);

            for (let j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6";
                boxes[winConditions[i][j]].style.color = "#000";
            }
        }
    }
}

function checkDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });

        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

function updateScore(winner) {
    if (winner === "X") {
        playerXScore++;
    } else {
        playerOScore++;
    }
    updateLeaderboard();
}

function updateLeaderboard() {
    // Here, you would normally send the updated scores to a server
    // For the sake of this example, we'll simulate it

    let leaderboard = [
        { player: "Player X", score: playerXScore },
        { player: "Player O", score: playerOScore }
    ];

    leaderboard.sort((a, b) => b.score - a.score);

    let leaderboardBody = document.querySelector("#leaderboard-body");
    leaderboardBody.innerHTML = "";
    leaderboard.forEach((entry, index) => {
        let row = document.createElement("tr");
        let rankCell = document.createElement("td");
        rankCell.innerHTML = index + 1;
        let playerCell = document.createElement("td");
        playerCell.innerHTML = entry.player;
        let scoreCell = document.createElement("td");
        scoreCell.innerHTML = entry.score;
        row.appendChild(rankCell);
        row.appendChild(playerCell);
        row.appendChild(scoreCell);
        leaderboardBody.appendChild(row);
    });
}

document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
});

