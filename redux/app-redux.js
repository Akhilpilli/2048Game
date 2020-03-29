import { createStore, applyMiddleware } from "redux";
import reduxThuck from "redux-thunk";
import {
  SWIPE_LEFT,
  SWIPE_UP,
  SWIPE_RIGHT,
  SWIPE_DOWN,
  UPDATE_RANDOM_GENERATED_NUMBER,
  RESET_BOARD,
  UPDATE_SCORE,
  UNDO,
  TOGGLE_GAME_OVER
} from "./actions";

//Inital state

const intialState = {
  board: [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""]
  ],
  previousBoard: [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""]
  ],
  totalScore: 0,
  isGameOver: false
};

//reducers

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case UPDATE_SCORE:
      return { ...state, totalScore: action.score };
    case UPDATE_RANDOM_GENERATED_NUMBER:
      console.log("RANDOM");
      return { ...state, board: action.board };
      break;
    case SWIPE_LEFT:
      console.log("LEFT");
      return {
        ...state,
        board: action.board,
        previousBoard: action.previousBoard
      };
      break;
    case SWIPE_UP:
      console.log("UP");
      return {
        ...state,
        board: action.board,
        previousBoard: action.previousBoard
      };
      break;
    case SWIPE_RIGHT:
      console.log("RIGHT");
      return {
        ...state,
        board: action.board,
        previousBoard: action.previousBoard
      };
      break;
    case SWIPE_DOWN:
      console.log("DOWN");
      return {
        ...state,
        board: action.board,
        previousBoard: action.previousBoard
      };
      break;
    case RESET_BOARD:
      console.log("RESET");
      return { ...state, board: action.board };
      break;
    case UNDO:
      console.log("UNDO");
      return { ...state, board: action.board };
    case TOGGLE_GAME_OVER:
      console.log("TOGGLE_GAME_OVER");
      return { ...state, isGameOver: action.isGameOver };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(reduxThuck));

export { store };
