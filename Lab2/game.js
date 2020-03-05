const cross = "\u2715";
const circle = "\u25EF";

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];
let playerMark = cross;
let computerMark = circle;
const board = new Array(9);
const cells = document.getElementsByClassName("cell");
const info = document.getElementsByClassName("info");


document.getElementById("newGameButton").addEventListener("click", startNewGame);
for (const cell of cells) {
    cell.addEventListener("click", function () {
        doTurn(cell);
    });
}

function startNewGame() {
    for (const cell of cells)
        cell.innerHTML = "";
    info[0].innerHTML = "Wybierz swój znacznik";
    document.getElementById("oMarkOptionButton").addEventListener("click", oMarkOptionButtonListener);
    document.getElementById("xMarkOptionButton").addEventListener("click", xMarkOptionButtonListener);
}

const oMarkOptionButtonListener = function () {
    setMarks(circle, cross);
};

const xMarkOptionButtonListener = function () {
    setMarks(cross, circle);
};

function setMarks(playerMark_, computerMark_) {
    playerMark = playerMark_;
    computerMark = computerMark_;
    if (computerMark === cross)
        makeFirstMove();
    document.getElementById("oMarkOptionButton").removeEventListener("click", oMarkOptionButtonListener);
    document.getElementById("xMarkOptionButton").removeEventListener("click", xMarkOptionButtonListener);
    info[0].innerHTML = " ";
}

function doTurn(cell) {
    makePlayerMove(cell);
    if (!checkForResult(playerMark)) {
        makeComputerMove();
        checkForResult(computerMark);
    }
}

function makePlayerMove(cell) {
    cell.innerHTML = playerMark;
}

function makeFirstMove() {
    cells[Math.floor(Math.random() * 9)].innerHTML = cross;
}

function makeComputerMove() {
    let emptyCells = [];
    let scores = new Array(9);
    scores.fill(-1);
    updateBoard();

    for (let cell in board)
        if (board[cell] === "")
            emptyCells.push(cell);

    for (let cellToBeFilled of emptyCells)
        scores[cellToBeFilled] = calculateMove(cellToBeFilled);

    console.log(scores);
    document.getElementById(`${scores.indexOf(Math.max(...scores))}`).innerHTML = computerMark;
}

function calculateMove(cellToBeFilled) {
    let boardAfterMove = board.slice(0);

    boardAfterMove[cellToBeFilled] = computerMark;  //win check
    if (checkForWin(boardAfterMove, computerMark))
        return 5;

    boardAfterMove[cellToBeFilled] = playerMark;    //player-win block check
    if (checkForWin(boardAfterMove, playerMark))
        return 4;

    boardAfterMove[cellToBeFilled] = computerMark;
    const filledWinCombos = new Array(winCombos.length);
    for (let i = 0; i < winCombos.length; i++) {
        filledWinCombos[i] = 0;
        if (boardAfterMove[winCombos[i][0]] === computerMark)
            filledWinCombos[i]++;
        if (boardAfterMove[winCombos[i][1]] === computerMark)
            filledWinCombos[i]++;
        if (boardAfterMove[winCombos[i][2]] === computerMark)
            filledWinCombos[i]++;
        if (boardAfterMove[winCombos[i][0]] !== playerMark ||
            boardAfterMove[winCombos[i][1]] !== playerMark ||
            boardAfterMove[winCombos[i][2]] !== playerMark)
            filledWinCombos[i] = 0;
    }

    return Math.max(...filledWinCombos);
}

function checkForResult(turnMark) {
    updateBoard();

    if (checkForWin(board, turnMark)) {
        info[0].innerHTML = "Wygrał " + (playerMark === turnMark ? "GRACZ!" : "KOMPUTER!") + " Nowa gra?";
        return true;
    } else if (board.filter(value => value === "").length === 0) {
        info[0].innerHTML = "Remis! Nowa gra?";
        return true;
    } else
        return false;
}

function checkForWin(checkedBoard, turnMark) {
    for (let i = 0; i < winCombos.length; i++)
        if (checkedBoard[winCombos[i][0]] === turnMark
            && checkedBoard[winCombos[i][1]] === turnMark
            && checkedBoard[winCombos[i][2]] === turnMark)
            return true;
    return false;
}

function updateBoard() {
    for (let i = 0; i < board.length; i++)
        board[i] = document.getElementById(`${i}`).innerHTML;
}
