export function moveLeft(board) {
  for (let i = 0; i < 4; i++) {
    board[i] = move_empty_to_end(board[i]);
    board[i] = add_adjacent_if_similar(board[i]);
    board[i] = set_values_to_row(board[i]);
  }
  return board;
}
export function moveUp(board) {
  let invertedBoard = board;
  board = invert_board(board);
  for (let i = 0; i < 4; i++) {
    board[i] = move_empty_to_end(board[i]);
    board[i] = add_adjacent_if_similar(board[i]);
    board[i] = set_values_to_row(board[i]);
  }
  board = invert_board(board);
  return board;
}
export function moveRight(board) {
  for (let i = 0; i < 4; i++) {
    board[i] = board[i].reverse();
    board[i] = move_empty_to_end(board[i]);
    board[i] = add_adjacent_if_similar(board[i]);
    board[i] = set_values_to_row(board[i]);
    board[i] = board[i].reverse();
  }
  return board;
}
export function moveDown(board) {
  board = invert_board(board);
  for (let i = 0; i < 4; i++) {
    board[i] = board[i].reverse();
    board[i] = move_empty_to_end(board[i]);
    board[i] = add_adjacent_if_similar(board[i]);
    board[i] = set_values_to_row(board[i]);
    board[i] = board[i].reverse();
  }
  board = invert_board(board);
  return board;
}

//To make copy of board
export function swapCurrentAndPrevious(copyBoard, board) {
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) copyBoard[i][j] = board[i][j];
  return copyBoard;
}

function invert_board(board) {
  let dubBoard = [...board];
  for (let i = 0; i < 4; i++) {
    board[i] = [dubBoard[0][i], dubBoard[1][i], dubBoard[2][i], dubBoard[3][i]];
  }
  return board;
}

function move_empty_to_end(array) {
  let resultArray = array.filter(el => el != "");
  return resultArray.map(el => parseInt(el));
}

function add_adjacent_if_similar(filteredArray) {
  let sum_results = [];
  filteredArray.length = 4;
  for (let i = 0, j = 1; i < filteredArray.length; i++, j++) {
    if (filteredArray[i] == filteredArray[j] && !isNaN(filteredArray[i])) {
      sum_results.push(filteredArray[i] + filteredArray[j]);
      filteredArray[j] = "";
      i++;
      j++;
    } else if (!isNaN(filteredArray[i])) {
      sum_results.push(filteredArray[i]);
    }
  }
  return sum_results;
}

function set_values_to_row(board) {
  board.length = 4;
  let newBoard = [];
  for (let i = 0; i < 4; i++) {
    board[i] == undefined ? newBoard.push("") : newBoard.push(board[i]);
  }
  return newBoard;
}
