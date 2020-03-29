import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { RouteProps } from "react-router";
import { connect } from "react-redux";
import {
  swipeLeft,
  swipeUp,
  swipeRight,
  swipeDown,
  setRandomNumber
} from "../redux/actions";
import {
  //move right issue rightCheckIsMoved.
  rightCheckIsMoved,
  checkIsMoved,
  generateTwoRandomNumber,
  totalScore,
  isRowEmpty,
  isColEmpty,
  isGameOver
} from "../utils/commonFunctions.js";
import { moveLeft, moveRight, moveUp, moveDown } from "../utils/moveFunctions";
import { State, PanGestureHandler } from "react-native-gesture-handler";

const mapStateToProps = state => {
  return {
    board: state.board,
    previousBoard: state.previousBoard
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRandomNumber: board => {
      dispatch(setRandomNumber(board));
    },
    swipeLeft: (board, previousBoard) => {
      dispatch(swipeLeft(board, previousBoard));
    },
    swipeUp: (board, previousBoard) => {
      dispatch(swipeUp(board, previousBoard));
    },
    swipeRight: (board, previousBoard) => {
      let copyReversOldBoard = [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
      ];
      for (let i = 0; i < 4; i++) {
        for (let j = 3, k = 0; k < 4; j--, k++) {
          copyReversOldBoard[i][k] = previousBoard[i][j];
        }
      }
      dispatch(swipeRight(board, copyReversOldBoard));
    },
    swipeDown: (board, previousBoard) => {
      dispatch(swipeDown(board, previousBoard));
    }
  };
};

class Game extends Component<RouteProps> {
  constructor(props) {
    super(props);
    this.state = {
      board: this.props.board,
      previousBoard: this.props.previousBoard
    };
  }
  getRandomInt = max => {
    return Math.floor(Math.random() * max);
  };
  set_random_number = (board, rowElements, colElements) => {
    try {
      const items_to_set = [2, 4];
      const nub = items_to_set[Math.floor(Math.random() * items_to_set.length)];
      const rowIndex = this.getRandomInt(rowElements.length);
      const colIndex = this.getRandomInt(colElements.length);
      const row = rowElements[rowIndex];
      const col = colElements[colIndex];
      if (board[row][col] != "") {
        //will get coloum index if there is any empyt colum in the row or will return null
        const colIndexOfRow = isRowEmpty(row, board);
        if (colIndexOfRow != null) {
          board[row][colIndexOfRow] = nub;
          this.props.setRandomNumber(board);
          return;
        }
        const rowInedxOfCol = isColEmpty(col, board);
        if (rowInedxOfCol != null) {
          board[rowInedxOfCol][col] = nub;
          this.props.setRandomNumber(board);
          return;
        }
        rowElements.splice(rowIndex, 1);
        colElements.splice(colIndex, 1);
        this.set_random_number(board, rowElements, colElements);
      } else {
        board[row][col] = nub;
        this.props.setRandomNumber(board);
      }
    } catch (exception) {
      console.log("error at random generations");
      console.log(exception);
    }
  };

  componentDidMount() {
    const rowElements = [0, 1, 2, 3];
    const colElements = [0, 1, 2, 3];
    this.set_random_number([...this.state.board], rowElements, colElements);
    this.set_random_number([...this.state.board], rowElements, colElements);
    totalScore();
  }

  onSwipeLeft = board => {
    const oldBoard = [...board];
    moveLeft(board);
    this.props.swipeLeft(board, oldBoard);
    checkIsMoved(oldBoard, board, this.set_random_number);
  };
  onSwipeUp = board => {
    const oldBoard = [...board];
    moveUp(board);
    this.props.swipeUp(board, oldBoard);
    checkIsMoved(oldBoard, board, this.set_random_number);
  };
  onSwipeRight = board => {
    const oldBoard = [...this.state.board];
    moveRight(board);
    this.props.swipeRight(board, oldBoard);
    rightCheckIsMoved(oldBoard, board, this.set_random_number);
  };
  onSwipeDown = board => {
    const oldBoard = [...board];
    moveDown(board);
    this.props.swipeDown(board, oldBoard);
    checkIsMoved(oldBoard, board, this.set_random_number);
  };
  _onHandlerStateChange = ({ nativeEvent }) => {
    try {
      if (nativeEvent.oldState === State.ACTIVE) {
        const xEvent = nativeEvent.translationX;
        const yEvent = nativeEvent.translationY;
        const currentBoard = this.state.board;
        if (Math.abs(xEvent) > Math.abs(yEvent)) {
          nativeEvent.translationX < 0
            ? this.onSwipeLeft(currentBoard)
            : this.onSwipeRight(currentBoard);
        } else {
          nativeEvent.translationY < 0
            ? this.onSwipeUp(currentBoard)
            : this.onSwipeDown(currentBoard);
        }
        totalScore();
        this.refreshState();
        isGameOver();
      }
    } catch (exception) {
      console.log("error at swipe event handler");
      console.log(exception);
    }
  };

  refreshState = () => {
    this.setState({
      refresh: !this.state.refresh
    });
  };

  render() {
    return (
      <PanGestureHandler onHandlerStateChange={this._onHandlerStateChange}>
        <View style={styles.board}>
          <FlatList
            data={this.state.board}
            contentContainerStyle={{ flexGrow: 1 }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <FlatList
                  contentContainerStyle={{ flexGrow: 1 }}
                  data={item}
                  keyExtractor={(item, index) => index.toString()}
                  // style={styles.col}
                  horizontal={true}
                  renderItem={({ item }) => (
                    <View style={[styles.col, TileColors[item.toString()]]}>
                      <Text>{item}</Text>
                    </View>
                  )}
                ></FlatList>
              </View>
            )}
          ></FlatList>
        </View>
      </PanGestureHandler>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);

const TileColors = StyleSheet.create({
  2: {
    backgroundColor: "#ffb3ff",
    color: "black"
  },
  4: {
    backgroundColor: "#ff33ff",
    color: "black"
  },
  8: {
    backgroundColor: "#e600e6",
    color: "black"
  },
  16: {
    backgroundColor: "#bfff80",
    color: "black"
  },
  32: {
    backgroundColor: "#80ff00",
    color: "black"
  },
  64: {
    backgroundColor: "#59b300",
    color: "white"
  },
  128: {
    backgroundColor: "#4d94ff",
    color: "white"
  },
  256: {
    backgroundColor: "#0066ff",
    color: "white"
  },
  512: {
    backgroundColor: "#0047b3",
    color: "white"
  },
  1024: {
    backgroundColor: "#ff3300",
    color: "white"
  },
  2403: {
    backgroundColor: "#990000",
    color: "white"
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  board: {
    width: 327,
    height: 327,
    // top: -75,
    borderColor: "#ffcccc",
    borderWidth: 3
    // backgroundColor: "black"
  },
  row: {
    borderBottomWidth: 3,
    width: 350,
    height: 80.2,
    borderColor: "#ffcccc",
    flexDirection: "row"
  },
  col: {
    width: 80.2,
    // height: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#ffcccc",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  text: {
    color: "red"
  }
});

//functions
function change() {}
