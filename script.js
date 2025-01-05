const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const message = document.getElementById('message');
const board = document.getElementById('board');
const TicTacToe = {
  curPlayer: 'X',
  curState: Array(9).fill(null),
  gameOver: false,
  init() {
    this.curBoard();
    document.getElementById('Reset').addEventListener('click', () => this.reset());
  },
  //  Create the game board
  curBoard() {
    board.innerHTML = '';
    this.curState.forEach((_, i) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      board.appendChild(cell);
    });
    board.addEventListener('click', (event) => this.handleClick(event));
    this.UImessage(`Player ${this.curPlayer}'s turn`);
  },
  handleClick(event) {// handle cell click
    const cell = event.target;
    const index = cell.dataset.index;
    //check if a cell should be click
    if(this.gameOver || !cell.classList.contains('cell') || this.curState[index]) return;
    cell.classList.add('taken');
    this.curState[index] = this.curPlayer;
    cell.textContent = this.curPlayer;
    const combo = this.checkWin();
    if(combo) {
      this.highlight(combo);
      this.UImessage(`Player ${this.curPlayer} has won`);
      this.gameOver = true;
    }
    else if(this.curState.every((cell) => cell)) {
        this.UImessage("It's a tie!");
        this.gameOver = true;
    }
    else{
      this.curPlayer = this.curPlayer == 'X' ? 'O' : 'X';
      this.UImessage(`Player ${this.curPlayer}'s turn`);
    }
  },
  checkWin() {
    return winningConditions.find((combo) => 
      combo.every((index) => this.curState[index] == this.curPlayer)
    );
  },
  highlight(combo) {
    combo.forEach((index) => board.childNodes[index].style.color = 'red');
  },
  reset() {
    this.curState = Array(9).fill(null);
    this.gameOver = false;
    this.curPlayer = 'X';
    this.curBoard();
  },
  UImessage(msg) {
    message.innerHTML = msg;
  }
}
TicTacToe.init();