import {
  resetBoard,
  setRandomNumber,
  updateScore,
  undoLaststep,
  toggleGameOver
} from "../redux/actions";
import { store } from "../redux/app-redux";

//local function
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
export function generateTwoRandomNumber(board) {
  generateRandomNumber(board);
  generateRandomNumber(board);
}
//Exported Functions
export function isGameOver() {
  const board = [...store.getState().board];
  //check if any empty blocks are there
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) if (board[i][j == ""]) return;

  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (board[i][j] == board[i + 1][j] || board[i][j] == board[i][j + 1])
        return;

  console.log("Game Over");
  store.dispatch(toggleGameOver(!store.getState().isGameOver));
}
export function generateRandomNumber(board) {
  const itemsToSet = [2, 4];
  const row = getRandomInt(4);
  const col = getRandomInt(4);
  if (board[row][col] != "") {
    setRandomNumber(board);
  } else {
    const numberTobeSet =
      itemsToSet[Math.floor(Math.random() * itemsToSet.length)];
    board[row][col] = numberTobeSet;
    store.dispatch(setRandomNumber(board));
  }
  totalScore();
}
//due to some bug using  this funciton rightCheckIsMoved
export function rightCheckIsMoved(
  oldBoard,
  newBoard,
  callbackGenerateRandomNumber
) {
  console.log(oldBoard, " right check");
  let copyReversOldBoard = [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""]
  ];
  for (let i = 0; i < 4; i++) {
    for (let j = 3, k = 0; k < 4; j--, k++) {
      copyReversOldBoard[i][k] = oldBoard[i][j];
    }
  }
  checkIsMoved(copyReversOldBoard, newBoard, callbackGenerateRandomNumber);
}
export function checkIsMoved(oldBoard, newBoard, callbackGenerateRandomNumber) {
  const rowElements = [0, 1, 2, 3];
  const colElements = [0, 1, 2, 3];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (oldBoard[i][j] != newBoard[i][j]) {
        console.log(oldBoard[i][j], " ", newBoard[i][j], " changed");
        callbackGenerateRandomNumber(
          newBoard,
          [...rowElements],
          [...colElements]
        );
        return;
      }
    }
  }
}
export function totalScore() {
  const board = [...store.getState().board];
  let TotalScore = 0;
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++)
      if (board[i][j] != "") TotalScore += parseInt(board[i][j]);

  store.dispatch(updateScore(TotalScore));
  // return TotalScore;
}
export function reset() {
  let board = [...store.getState().board];
  totalScore();

  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) board[i][j] = "";
  store.dispatch(resetBoard(board));
  generateTwoRandomNumber(board);
}
export function undo() {
  let currentBoard = [...store.getState().board];
  const previousBoard = [...store.getState().previousBoard];
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) currentBoard[i][j] = previousBoard[i][j];
  store.dispatch(undoLaststep(currentBoard));
}
//onclick yes after game over
export function resetAfterGameOver() {
  store.dispatch(toggleGameOver(!store.getState().isGameOver));
  reset();
}
export function onCLickNoToggleGameOver() {
  const isGameOver = !store.getState().isGameOver;
  store.dispatch(toggleGameOver(isGameOver));
  console.log(store.getState().isGameOver);
}
//checks
export function isRowEmpty(rowIndex, board) {
  for (let col = 0; col < 4; col++) {
    if (board[rowIndex][col] == "") {
      return col;
    }
  }
  return null;
}
export function isColEmpty(colIndex, board) {
  for (let row = 0; row > 4; row++) {
    if (board[colIndex][row] == "") {
      return row;
    }
  }
  return null;
}
