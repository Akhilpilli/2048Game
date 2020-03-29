//ACTION TYPES

export const SWIPE_LEFT = "SWIPE_LEFT";
export const SWIPE_UP = "SWIPE_UP";
export const SWIPE_RIGHT = "SWIPE_RIGHT";
export const SWIPE_DOWN = "SWIPE_DOWN";
export const UPDATE_RANDOM_GENERATED_NUMBER = "UPDATE_RANDOM_GENERATED_NUMBER";
export const RESET_BOARD = "RESET_BOARD";
export const UPDATE_SCORE = "UPDATE_SCORE";
export const UNDO = "UNDO";
export const TOGGLE_GAME_OVER = "TOGGLE_GAME_OVER";

// ACTION CREATORS

export function swipeLeft(board, previousBoard) {
  return { type: SWIPE_LEFT, board, previousBoard };
}
export function swipeUp(board, previousBoard) {
  return { type: SWIPE_UP, board, previousBoard };
}
export function swipeRight(board, previousBoard) {
  return { type: SWIPE_RIGHT, board, previousBoard };
}
export function swipeDown(board, previousBoard) {
  return { type: SWIPE_DOWN, board, previousBoard };
}
export function setRandomNumber(board) {
  return {
    type: UPDATE_RANDOM_GENERATED_NUMBER,
    board
  };
}
export function updateScore(score) {
  return {
    type: UPDATE_SCORE,
    score
  };
}
export function resetBoard(board) {
  return {
    type: RESET_BOARD,
    board
  };
}
export function undoLaststep(board) {
  return {
    type: UNDO,
    board
  };
}
export function toggleGameOver(isGameOver) {
  return {
    type: TOGGLE_GAME_OVER,
    isGameOver
  };
}
