import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
// import SmoothScrollComponent from "./SmoothScrollComponent";
import ScrollPlayground from "./ScrollPlayground";
import PanResponderScrollRegister from "./PanResponderScrollRegister";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: PanResponderScrollRegister
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);
console.disableYellowBox = true;
export default class App extends Component {
  render() {
    return <AppContainer></AppContainer>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
