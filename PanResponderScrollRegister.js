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
  debug,
  abs,
  floor,
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

    this._listY = new Value(0);
    this._transX = new Value(0);
    this._transY = new Value(0);
    this._absoluteX = new Value(0);
    this._absoluteY = new Value(0);
    this._scrollX = new Value(0);
    this._offsetX = new Value(60);
    this._currentIndex = new Value(0);
    this._state = new Value(-1); // state undetermined
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

    this._onGestureEvent2 = event(
      [
        {
          nativeEvent: ({
            translationX,
            translationY,
            state,
            x,
            y,
            absoluteX,
            absoluteY
          }) =>
            block([
              set(
                this._currentIndex,
                floor(
                  sub(
                    divide(sub(absoluteY, this._listY), new Value(20)),
                    new Value(1)
                  )
                )
              ),
              set(this._state, state),
              set(this._transY, translationY),
              set(this._transX, translationX),
              set(this._absoluteY, absoluteY),
              set(this._absoluteX, absoluteX)
            ])
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

  render() {
    const listRef = React.createRef();
    return (
      // parent/root
      <View style={styles.container}>
        {/* leftView/scrollview/flatlist */}
        <View style={styles.left}></View>
        {/* Right/ panResponder/register/llistten for touches */}
        <PanGestureHandler
          onGestureEvent={this._onGestureEvent2}
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
    let x = new Value(0);
    let squared = sq(y);
    let dividedExp = sub(new Value(0), divide(squared, new Value(2)));
    return multiply(new Value(1.7), exp(dividedExp));
    // return x;
  };

  fractional = y => {
    let x = 0;
    let squared = y * y;
    let dividedExp = -(squared / 2);
    x = 1.7 * Math.exp(dividedExp);
    return x;
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

  _getGranslateXBasedOnIndex2 = index => {
    let absDiff = debug("absDiff", abs(sub(this._currentIndex, index)));

    // let fractionalY = absDiff / 28;
    let fractionalY = debug("fractionalY", divide(absDiff, new Value(5))); // giving more appropriate values
    let valX = debug("valX", this.animatedFractional(fractionalY));
    //this should returned in a block
    // let outputx = new Value(1);
    // this._transX;
    let outputx = debug(
      "outputx",
      sub(this._transX, multiply(valX, new Value(60)))
    ); // this is basically dynamic offsetX based on index.
    // let outputx = debug("outputx", multiply(valX, new Value(60))); // this is basically dynamic offsetX based on index.

    // return block([
    //   // set(absDiff, ),
    //   // set(fractionalY, ),
    //   // set(valX, ),
    //   // set(outputx, ),
    //   cond(
    //     eq(this._state, State.ACTIVE),
    //     [
    //       set(
    //         fractionalY,
    //         divide(
    //           abs(sub(this._currentIndex, new Value(index))),
    //           new Value(10)
    //         )
    //       ),
    //       set(
    //         valX,
    //         multiply(
    //           new Value(1.7),
    //           exp(
    //             sub(
    //               new Value(0),
    //               divide(multiply(fractionalY, fractionalY), new Value(2))
    //             )
    //           )
    //         )
    //       ),
    //       set(outputx, debug("outX: ", sub(multiply(valX, new Value(60))))),
    //       interpolate(this._transY, {
    //         inputRange: [-300, 0, 300],
    //         outputRange: [outputx, 0, outputx]
    //         // extrapolate: Extrapolate.CLAMP
    //       })
    //     ],
    //     this._transX
    //   ),
    //   this._transX
    // ]);

    // sub(this._transX, multiply(this.animatedFractional(divide(abs(sub(this._currentIndex, new Value(index))), new Value(6))), new Value(60)))
    if (eq(this._state, State.ACTIVE)) {
      return interpolate(this._transY, {
        inputRange: [-100, 0, 100],
        outputRange: [outputx, 0, outputx]
        // extrapolate: Extrapolate.CLAMP
      });
    } else {
      return -20;
    }
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
      return this._transX;
    }
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
                translateX: this._getGranslateXBasedOnIndex2(index)
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
