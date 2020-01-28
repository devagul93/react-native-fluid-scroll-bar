import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Button
  //   Animated
} from "react-native";
import CharItem from "./CharItem";
import Animated, { Easing } from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
const {
  cond,
  lessThan,
  abs,
  sub,
  Value,
  add,
  event,
  multiply,
  debug,
  set
} = Animated;
const { width, height } = Dimensions;

export default class SmoothScrollComponent extends Component {
  _scrollX = new Value(0);
  // _xVal = new Value(0);

  constructor(props) {
    super(props);
    this.state = {
      scrollX: this._scrollX,
      currentIndex: 0
    };
  }

  onCharPress = (value, index) => {
    console.log("onpress");
    this.setState({ currentIndex: index });
    this._config = {
      duration: 250,
      toValue: 5,
      easing: Easing.inOut(Easing.ease)
    };
    // Animated.timing(this.state.scrollX, this._config).start();
  };

  onPressIn() {
    console.log("pressed in ");
    console.log(e);
  }

  _renderItem = (value, index) => {
    let d5 = this.state.scrollX;
    let absoluteDiff = abs(
      sub(new Value(this.state.currentIndex), new Value(index))
    );
    let shouldScroll = lessThan(absoluteDiff, new Value(4));
    let result = multiply(sub(new Value(4), absoluteDiff), d5);
    debug("shouldscroll", shouldScroll);
    debug("res", result);
    // d4 = Animated.sub(d5, new Animated.Value(10));
    // d3 = Animated.sub(d5, new Animated.Value(20));
    // d2 = Animated.sub(d5, new Animated.Value(30));
    // d6 = Animated.add(d5, new Animated.Value(10));
    // d7 = Animated.add(d5, new Animated.Value(20));
    // d8 = Animated.add(d5, new Animated.Value(30));

    return (
      <CharItem
        style={styles.charItemtext}
        animatedStyle={[
          {
            maxHeight: 20,
            maxWidth: 20
          },
          {
            transform: [
              {
                translateX: this.state.currentIndex === index ? result : 0
              }
            ]
          }
        ]}
        // onPressIn={() => {
        //   this.onPressIn();
        // }}
        onPress={() => this.onCharPress(value, index)}
        // containerStyle={styles.itemContainera}
        // packageName={item.packageName}
        // animatedStyle={{
        //   transform: [{ translateX: this.state.scrollX }]
        // }}
        text={value}
        key={value + ""}
        index={index}
      ></CharItem>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Animated.ScrollView
          contentContainerStyle={[
            styles.container,
            { flexDirection: "column" }
          ]}
          onScroll={this.onGestureEvent}
          style={
            [
              // {
              //   transform: [{ translateX: this.state.scrollX }]
              // }
            ]
          }
          //   onScroll={Animated.event(
          //     [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }],
          //     { useNativeDriver: true }
          //   )}
          //   scrollEventThrottle={16}
        >
          {charList.map((value, index) => {
            return this._renderItem(value, index);
          })}
        </Animated.ScrollView>
      </View>
    );
  }

  onGestureEvent = event([
    {
      nativeEvent: {
        translationX: x => set(add(this._xVal, new Value(50)), x)
      }
    }
  ]);

  getCharacters() {
    return (
      <View style={{ flex: 1 }}>
        {charList.map((value, index) => {
          return (
            <CharItem
              onPress={this.onCharPress}
              // containerStyle={styles.itemContainera}
              // packageName={item.packageName}
              style={styles.charItemtext}
              text={value}
              key={value + ""}
              // onLayout={event => {
              //   const { x, y, width, height } = event.nativeEvent.layout;
              // }}
              // index={index}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    flexDirection: "row",
    padding: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "white"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  charItemtext: {
    // fontFamily: "vincHand",
    fontSize: 12,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    // marginRight: 8,
    // marginLeft: 8,
    maxWidth: 20,
    maxHeight: 20,
    // paddingLeft: 8,
    // paddingRight: 8,
    color: "white"
  }
});

const charList = [
  "#",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];
