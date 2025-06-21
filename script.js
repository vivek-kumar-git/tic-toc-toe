const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const xScoreText = document.getElementById('xScore');
const oScoreText = document.getElementById('oScore');
const resetButton = document.getElementById('reset');
const newGameButton = document.getElementById('newGame');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let xScore = 0;
let oScore = 0;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// Handle player move
function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
    updateScore(currentPlayer);
    gameActive = false;
  } else if (board.every(cell => cell !== '')) {
    statusText.textContent = "It's a Draw! 🤝";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Check for winner
function checkWin() {
  return winConditions.some(condition => {
    return condition.every(index => board[index] === currentPlayer);
  });
}

// Update scoreboard
function updateScore(player) {
  if (player === 'X') {
    xScore++;
    xScoreText.textContent = xScore;
  } else {
    oScore++;
    oScoreText.textContent = oScore;
  }
}

// Reset board only
function resetBoard() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
}

// Reset board + scores
function resetFullGame() {
  xScore = 0;
  oScore = 0;
  xScoreText.textContent = '0';
  oScoreText.textContent = '1';
  resetBoard();
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetBoard);
newGameButton.addEventListener('click', resetFullGame);
