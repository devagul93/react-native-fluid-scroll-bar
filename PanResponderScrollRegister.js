import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Animated, { Easing, Extrapolate } from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import CharItem from "./CharItem";

const {
  add,
  cond,
  diff,
  divide,
  eq,
  event,
  exp,
  lessThan,
  and,
  call,
  block,
  multiply,
  pow,
  set,
  abs,
  clockRunning,
  greaterOrEq,
  lessOrEq,
  sqrt,
  startClock,
  stopClock,
  sub,
  Clock,
  Value,
  onChange,
  interpolate
} = Animated;

function sq(x) {
  return multiply(x, x);
}

export default class PanResponderScrollRegister extends Component {
  constructor(props) {
    super(props);
    this.listY = 0;
    this._scrollX = new Value(0);
    this._transX = new Value(0);
    this._offsetX = new Value(60);
    // const gesture = { x: new Value(0), y: new Value(0) };
    const state = new Value(-1);
    // const listRef = undefined;

    this._onGestureEvent = event(
      [
        {
          nativeEvent: {
            translationX: this._transX,
            // translationX: x => set(this._scrollX, sub(x, this._offsetX)),
            // translationY: gesture.y,
            state: state
          }
        }
      ],
      { useNativeDriver: true }
    );

    this.state = {
      // scrollX: this._scrollX,
      currentIndex: 0,
      state: new Value(-1)
    };
  }

  getIndex = input => {
    const val1 = input - this.listY;
    const index = val1 / 20;
    return Math.floor(index - 1);
  };

  _measureRef = ref => {
    ref.Component.measure((width, height, px, py, fx, fy) => {
      const location = {
        fx: fx,
        fy: fy,
        px: px,
        py: py,
        width: width,
        height: height
      };
      console.log(location);
    });
  };

  _onHandlerStateChange = ({ nativeEvent }) => {
    console.log(nativeEvent);
    const { oldState, state, absoluteY, translationX, velocityX } = nativeEvent;
    if (state == (State.ACTIVE || State.BEGAN)) {
      let index = this.getIndex(absoluteY);
      this.setState({ currentIndex: index, state });
    } else if (state == State.END && oldState === State.ACTIVE) {
      const config = {
        duration: 150,
        toValue: 0,
        easing: Easing.inOut(Easing.ease)
      };
      Animated.timing(this._transX, config).start();
    }
  };

  fractional = y => {
    let x = 0;
    let squared = y * y;
    let dividedExp = -(squared / 2);
    x = 1.7 * Math.exp(dividedExp);
    return x;
  };

  render() {
    const listRef = React.createRef();
    return (
      // parent/root
      <View style={styles.container}>
        {/* leftView/scrollview/flatlist */}
        <View style={styles.left}></View>
        {/* Right/ panResponder/register/llistten for touches */}
        <PanGestureHandler
          onGestureEvent={this._onGestureEvent}
          onHandlerStateChange={this._onHandlerStateChange}
        >
          <Animated.View ref={listRef} style={styles.right}>
            <Animated.View
              onLayout={({ nativeEvent }) => {
                console.log(nativeEvent);
                this.listY = nativeEvent.layout.y;
              }}
              collapsable={false}
              style={{ padding: 0 }}
            >
              {charList.map((value, index) => {
                return this._renderItem(value, index);
              })}
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  }

  _onLayout = nativeEvent => {
    console.log(`nativeEvent: ${nativeEvent}`);
    // console.log(`value ${value}`);
    // console.log(`index${index}`);
  };

  _logger = ({ nativeEvent }) => {
    const { translationX } = nativeEvent;
    // console.log(nativeEvent);
    // console.log(`nativeEvent: ${nativeEvent}`);
    console.log(
      "************************new movement, translationX updatd **************************"
    );
    console.log(`translateX: ${translationX}`);
    let scrollx = translationX - 60; // translated value at x0
    // calculate x for modx =1,2,3,4,5
    let fractionalY = 1 / 7;
    let valX = this.fractional(fractionalY);
    let outputx = translationX - valX * 60;
    console.log(`scrollX: ${scrollx}`);
    // console.log(`fractionalY1: ${fractionalY}`);
    // console.log(`valX1: ${valX}`);
    console.log(`outputx1: ${outputx}`);

    //2
    fractionalY = 2 / 7; // making the y factor more spread out for the proper effect to take place
    valX = this.fractional(fractionalY);
    outputx = translationX - valX * 60;
    // console.log(`fractionalY2: ${fractionalY}`);
    // console.log(`valX2: ${valX}`);
    console.log(`outputx2: ${outputx}`);

    //3
    fractionalY = 3 / 7;
    valX = this.fractional(fractionalY);
    outputx = translationX - valX * 60;
    // console.log(`fractionalY3: ${fractionalY}`);
    // console.log(`valX3: ${valX}`);
    console.log(`outputx3: ${outputx}`);

    //4
    fractionalY = 4 / 7;
    valX = this.fractional(fractionalY);
    outputx = translationX - valX * 60;
    //  console.log(`fractionalY3: ${fractionalY}`);
    //  console.log(`valX3: ${valX}`);
    console.log(`outputx4: ${outputx}`);

    //5
    fractionalY = 5 / 7;
    valX = this.fractional(fractionalY);
    outputx = translationX - valX * 60;
    //  console.log(`fractionalY3: ${fractionalY}`);
    //  console.log(`valX3: ${valX}`);
    console.log(`outputx4: ${outputx}`);
  };

  // assume y to be animated value
  animatedFractional = y => {
    let x = 0;
    let squared = sq(y);
    let dividedExp = -divide(squared, new Value(2));
    return multiply(new Value(2.5), exp(dividedExp));
  };

  _getGranslateXBasedOnIndex = index => {
    let absDiff = Math.abs(this.state.currentIndex - index);
    let fractionalY = absDiff / 28;
    let animatedFractionalY = new Value(fractionalY);
    let valX = this.animatedFractional(animatedFractionalY);
    let toValue = -multiply(valX, new Value(20));
    const config = {
      duration: 150,
      toValue: toValue,
      easing: Easing.inOut(Easing.ease)
    };
    // Animated.timing(this._scrollX, config).start();
  };
  _getGranslateXBasedOnIndex1 = index => {
    let absDiff = Math.abs(this.state.currentIndex - index);
    // let fractionalY = absDiff / 28;
    let fractionalY = absDiff / 6; // giving more appropriate values
    let valX = this.fractional(fractionalY);
    //this should returned in a block
    let outputx = sub(this._transX, multiply(valX, 60)); // this is basically dynamic offsetX based on index.
    if (this.state.state === State.ACTIVE) {
      return interpolate(this._transX, {
        inputRange: [-15, 0],
        outputRange: [outputx, 0],
        extrapolate: Extrapolate.CLAMP
      });
    } else {
      return undefined;
    }

    //experimented results
    //3
    // fractionalY = 3 / 7;
    // valX = this.fractional(fractionalY);
    // outputx = this._scrollX - valX * 60;
    // console.log(`fractionalY3: ${fractionalY}`);
    // console.log(`valX3: ${valX}`);
    // console.log(`outputx3: ${outputx}`);

    // return interpolate(this._scrollX, {
    //   inputRange: [-120, 0],
    //   outputRange: [outputx, 0]
    // });

    // this below ssection is working as of now.

    // this._transXA = interpolate(this._scrollX, {
    //   inputRange: [-120, 120],
    //   outputRange: [-100, 100]
    // });
    // this._transXB = interpolate(this._scrollX, {
    //   inputRange: [-120, -60, 60, 120],
    //   outputRange: [-60, -10, 10, 60]
    // });
    // this._transXC = interpolate(this._scrollX, {
    //   inputRange: [-120, -60, 60, 120],
    //   outputRange: [-30, -5, 5, 30]
    // });
    // if (absDiff == 0) {
    //   return this._scrollX;
    // } else if (absDiff == 1) {
    //   return this._transXA;
    // } else if (absDiff == 2) {
    //   return this._transXB;
    // } else if (absDiff == 3) {
    //   return this._transXC;
    // }
  };
  _shouldCharacterAnimate = index => {
    // return this.state.state === State.ACTIVE;
    let absDiff = Math.abs(this.state.currentIndex - index);
    if (absDiff < 4) {
      // should pan/animate
      return true;
    } else {
      return false;
    }
  };

  _renderItem = (value, index) => {
    // this._shouldCharacterAnimate
    //   ? this._getGranslateXBasedOnIndex(index)
    //   : null;
    return (
      <CharItem
        style={styles.charItemtext}
        animatedStyle={[
          {
            height: 20,
            maxWidth: 20
          },
          {
            transform: [
              {
                // first thing should return truthful for the values to be animated, second shuld be animated exact values for that index.
                translateX: this._getGranslateXBasedOnIndex1(index)
                  ? this._getGranslateXBasedOnIndex1(index)
                  : this._transX
              }
            ]
          }
        ]}
        onPress={() => {}}
        // containerStyle={styles.itemContainera}
        text={value}
        key={value + ""}
        index={index}
      ></CharItem>
    );
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  left: {
    flex: 6,
    height: "100%",
    // padding: 20,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "grey"
  },
  right: {
    flex: 1,
    // padding: 50,
    height: "100%",
    // padding: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
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
    height: 20,
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
