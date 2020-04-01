import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  reset,
  undo,
  resetAfterGameOver,
  onCLickNoToggleGameOver
} from "../utils/commonFunctions";
import { store } from "../redux/app-redux";
import { RouteProps } from "react-router";
import { connect } from "react-redux";

const GameIcon = require("./../assets/2048GameIconjpg.jpg");
const resetIcon = require("./../assets/reset.png");
const undoIcon = require("./../assets/undo.png");

const mapStateToProps = state => {
  return {
    totalScore: state.totalScore,
    isGameOver: state.isGameOver
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
class ScoreAndAction extends Component<RouteProps> {
  constructor(props) {
    super(props);
    this.state = {
      TotalScore: this.props.totalScore,
      isGameOver: this.props.isGameOver
    };
  }
  render() {
    return (
      <View>
        <View>
          {this.props.isGameOver && (
            <View style={styles.gameOverContainor}>
              <Text style={styles.gameOverHeading}>Gave Over</Text>
              <View style={styles.confirmationsRow}>
                <Text
                  style={styles.yes}
                  onPress={() => {
                    resetAfterGameOver();
                  }}
                >
                  yes
                </Text>
                <Text
                  style={styles.no}
                  onPress={() => {
                    onCLickNoToggleGameOver();
                  }}
                >
                  No
                </Text>
              </View>
            </View>
          )}
        </View>
        <View>
          <Image source={GameIcon} style={styles.gameIcon}></Image>
        </View>
        <View style={styles.scoreCardContainor}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreHeading}>SCORE</Text>
            <Text style={styles.scoreText}>{store.getState().totalScore}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.5} onPress={() => reset()}>
            <Image source={resetIcon} style={styles.resetIcon}></Image>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => undo()}>
            <Image source={undoIcon} style={styles.resetIcon}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreAndAction);

const styles = StyleSheet.create({
  gameIcon: {
    width: 310,
    height: 150,
    top: -50
  },
  scoreCardContainor: {
    flex: 0,
    flexDirection: "row",
    flexBasis: 100,
    alignItems: "center"
  },
  scoreCard: {
    height: 75,
    marginRight: 42,
    width: 125,
    flex: 0,
    backgroundColor: "black"
  },
  scoreHeading: {
    color: "yellow",
    fontSize: 25,
    paddingLeft: 20
  },
  scoreText: {
    color: "white",
    backgroundColor: "red",
    fontSize: 25,
    height: 40,
    paddingTop: 5,
    paddingLeft: 40
  },
  resetIcon: {
    height: 75,
    width: 75
  },
  gameOverContainor: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    position: "absolute",
    top: -250,
    width: 1000,
    height: 1000,
    bottom: -500,
    left: -50,
    backgroundColor: "rgba(0,0,0,0.2)",
    zIndex: 10
  },
  gameOverHeading: {
    marginLeft: 130,
    top: 36,
    fontSize: 34,
    textShadowColor: "red",
    textShadowRadius: 1
  },
  confirmationsRow: {
    flex: 0,
    flexDirection: "row",
    marginLeft: 120,
    top: 150
  },
  yes: {
    fontSize: 20,
    padding: 10,
    textShadowColor: "red",
    textShadowRadius: 1
  },
  no: {
    fontSize: 20,
    marginLeft: 82,
    padding: 10,
    textShadowColor: "red",
    textShadowRadius: 1
  }
});
