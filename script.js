const board = document.getElementById('board');
const status = document.getElementById('status');
const cells = [];

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    if (gameBoard.includes('')) {
        return null; // Game is still ongoing
    }

    return 'T'; // It's a tie
}

function handleClick(e) {
    const index = e.target.dataset.index;

    if (gameBoard[index] || gameOver) return;

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    const winner = checkWinner();

    if (winner) {
        if (winner === 'T') {
            status.textContent = "It's a tie!";
        } else {
            status.textContent = `Player ${winner} wins!`;
        }
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    cells.push(cell);
    board.appendChild(cell);
}
