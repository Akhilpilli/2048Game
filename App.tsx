import "react-native-gesture-handler";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Game from "./views/home";
import ScoreAndAction from "./views/socreAndActions";
import { Provider } from "react-redux";
import { store } from "./redux/app-redux";

export default class LotsOfGreetings extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <ScoreAndAction />
          <Game />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccffcc",
    alignItems: "center",
    justifyContent: "center"
  }
});
