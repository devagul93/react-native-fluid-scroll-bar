import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList
} from "react-native";
import Animated, { Easing, Extrapolate } from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import CharItem from "./CharItem";
import data from "./data";
import AppItem from "./AppItem";
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
  clockRunning,
  greaterOrEq,
  lessOrEq,
  floor,
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

// export const CharButton = props => {
//   let charValue = "#";
//   const { style, value } = props;

//   return (
//     <Animated.View
//       style={[
//         {
//           width: 30,
//           height: 30,
//           borderRadius: 15,
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "brown"
//         },
//         style
//       ]}
//     >
//       <Animated.Text style={{ color: "white", fontWeight: "bold" }}>
//         {charList[value]}
//       </Animated.Text>
//     </Animated.View>
//   );
// };

export default class PanResponderScrollRegister extends Component {
  text = React.createRef();
  // flatListRef = React.createRef();
  constructor(props) {
    super(props);
    this._listY = new Value(0);
    this._transX = new Value(0);
    this._transY = new Value(0);
    this._X = new Value(0);
    this._Y = new Value(0);
    this._absoluteX = new Value(0);
    this._absoluteY = new Value(0);
    this._scrollX = new Value(0);
    this._offsetX = new Value(60);
    this._currentIndex = new Value(0);
    this._state = new Value(-1); // state undetermined
    const state = new Value(-1);
    // call([this._currentIndex], this._onAnimatedNodeUpdate);

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
                    new Value(2)
                  )
                )
              ),
              set(this._state, state),
              set(this._X, x),
              set(this._Y, y),
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

  _onAnimatedNodeUpdate = ([currentIndex]) => {
    let textVal = charList[currentIndex];
    const val = data.findIndex(item => {
      if (item) {
        const char = item.name[0];
        if (char) {
          return char.toUpperCase() === textVal;
        }
      }
    });
    if (val !== -1) {
      // console.log(val);
      this.flatListRef.scrollToIndex({ animated: true, index: val });
    } // console.log(currentIndex);
    return requestAnimationFrame(() => {
      // if (currentIndex !== this.state.currentIndex)
      // this.setState({ currentIndex });
      this.text.current.setNativeProps({ text: textVal });
    });
  };

  _onHandlerStateChange = ({ nativeEvent }) => {
    // console.log(nativeEvent);
    const { oldState, state, absoluteY, translationX, velocityX } = nativeEvent;
    if (state == (State.ACTIVE || State.BEGAN)) {
      let index = this.getIndex(absoluteY);
      this.setState({ currentIndex: index, state });
      set(this._transY, new Value(5));
    } else if (oldState === State.ACTIVE || state === State.END) {
      this.setState({ state });
      const config = {
        duration: 800,
        toValue: 0,
        easing: Easing.inOut(Easing.ease)
      };
      Animated.timing(this._transY, config).start();
    }
  };

  renderAppItem(item) {
    return (
      <AppItem
        onCheckChange={() => {}}
        shouldShowCheckBox={false}
        onLongPress={() => {
          // this.toggleModal(item);
        }}
        onPress={() => {
          // this.onAppPress(item);
        }}
        item={item}
        packageName={item.packageName}
        style={styles.taskItemtext}
        text={item.AppName}
        customName={item.userAppName ? item.userAppName : ""}
      />
    );
  }

  render() {
    const listRef = React.createRef();
    return (
      // parent/root
      <View style={styles.container}>
        {/* leftView/scrollview/flatlist */}
        <Animated.Code>
          {() => call([this._currentIndex], this._onAnimatedNodeUpdate)}
        </Animated.Code>
        <View style={styles.left}>
          <FlatList
            // inverted={this.state.searchMode}
            style={{}}
            ref={ref => {
              this.flatListRef = ref;
            }}
            useNativeDriver
            keyboardShouldPersistTaps="handled"
            data={data}
            // initialNumToRender={this.stater.renderList.length}
            keyExtractor={(item, index) => index + "" + item.packageName}
            onScrollToIndexFailed={() => {}}
            renderItem={({ item, index }) => {
              if (item) {
                return this.renderAppItem(item);
              }
            }}
          />
        </View>
        {/* Right/ panResponder/register/llistten for touches */}
        <PanGestureHandler
          onGestureEvent={this._onGestureEvent2}
          onHandlerStateChange={this._onHandlerStateChange}
        >
          <Animated.View ref={listRef} style={styles.right}>
            <Animated.View
              style={[
                styles.charButtonStyle,
                {
                  transform: [
                    {
                      translateX: this._getGranslateXBasedOnIndex3(
                        this._currentIndex
                      )
                    },
                    { translateY: this._Y }
                  ]
                }
              ]}
            >
              <TextInput
                value="#"
                editable={false}
                ref={this.text}
                style={{
                  // margin: 2,
                  marginLeft: 5,
                  padding: 5,
                  color: "white",
                  fontWeight: "bold"
                }}
              ></TextInput>
            </Animated.View>
            <Animated.View
              onLayout={({ nativeEvent }) => {
                console.log(nativeEvent);
                set(this._listY, new Value(nativeEvent.layout.y));
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
      duration: 650,
      toValue: toValue,
      easing: Easing.inOut(Easing.ease)
    };
    // Animated.timing(this._scrollX, config).start();
  };

  _getGranslateXBasedOnIndex3 = index => {
    let absDiff = abs(sub(this._currentIndex, index));

    // let fractionalY = absDiff / 28;
    let fractionalY = divide(absDiff, new Value(5)); // giving more appropriate values

    let valX = this.animatedFractional(fractionalY);

    //this should returned in a block
    // let outputx = new Value(1);
    let outputx = sub(this._transX, multiply(valX, new Value(60))); // this is basically dynamic offsetX based on index.
    // let outputx = debug("outputx", multiply(valX, new Value(60))); // this is basically dynamic offsetX based on index.

    if (eq(this._state, State.ACTIVE)) {
      return interpolate(this._transY, {
        inputRange: [-5, 0, 5],
        outputRange: [outputx, 0, outputx],
        extrapolate: Extrapolate.CLAMP
      });
    } else {
      return 0;
    }
  };

  _getGranslateXBasedOnIndex4 = index => {
    // let absDiff = abs(sub(this._currentIndex, index));
    // let fractionalY = absDiff / 28;
    // let fractionalY = divide(absDiff, new Value(5)); // giving more appropriate values
    let fractionalY = divide(
      abs(multiply(this._transY, new Value(7))),
      new Value(540)
    ); // 6 is the catalyst in y direction, 540 is the total length fof the charlist
    let valX = this.animatedFractional(fractionalY);

    //this should returned in a block
    // let outputx = new Value(1);
    let outputx = sub(this._transX, multiply(valX, new Value(60))); // this is basically dynamic offsetX based on index.
    // let outputx = debug("outputx", multiply(valX, new Value(60))); // this is basically dynamic offsetX based on index.

    if (eq(this._state, State.ACTIVE)) {
      return interpolate(this._transY, {
        inputRange: [-50, 0, 50],
        outputRange: [outputx, 0, outputx],
        extrapolate: Extrapolate.CLAMP
      });
    } else {
      return 0;
    }
  };

  _getGranslateXBasedOnIndex2 = index => {
    let absDiff = abs(sub(this._currentIndex, index));

    // let fractionalY = absDiff / 28;
    let fractionalY = divide(absDiff, new Value(5)); // giving more appropriate values
    let valX = this.animatedFractional(fractionalY);
    //this should returned in a block
    // let outputx = new Value(1);
    // this._transX;
    let outputx = sub(this._transX, multiply(valX, new Value(60))); // this is basically dynamic offsetX based on index.
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
        inputRange: [-5, 0, 5],
        outputRange: [outputx, 0, outputx],
        extrapolate: Extrapolate.CLAMP
      });
    } else {
      return 0;
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
      // return 0;
    }
  };

  _renderItem = (value, index) => {
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
                translateX: this._getGranslateXBasedOnIndex3(index)
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

  //  <CharButton
  //                 value={this.state.currentIndex}
  //                 style={{
  //                   alignSelf: "flex-start",
  //                   transform: [
  //                     {
  //                       translateX: this._getGranslateXBasedOnIndex3(
  //                         this._currentIndex
  //                       )
  //                     },
  //                     { translateY: this._Y }
  //                   ]
  //                 }}
  //               ></CharButton>
  // CharButton = props => {
  //   let charValue = "#";
  //   const { style, value } = props;

  //   return (
  //     <Animated.View
  //       style={[
  //         {
  //           width: 30,
  //           height: 30,
  //           borderRadius: 15,
  //           justifyContent: "center",
  //           alignItems: "center",
  //           backgroundColor: "brown"
  //         },
  //         style
  //       ]}
  //     >
  //       <Animated.Text
  //         ref={this.text}
  //         style={{ color: "white", fontWeight: "bold" }}
  //       >
  //         {charList[value]}
  //       </Animated.Text>
  //     </Animated.View>
  //   );
  // };

  // monitor translationy and see how x changes of that initial position.
  _logger2 = ({ nativeEvent }) => {
    const {
      x,
      y,
      translationX,
      translationY,
      absoluteX,
      absoluteY
    } = nativeEvent;
    console.log(
      "************************new movement, translationY updatd **************************"
    );
    // console.log(`nativeEvent: ${nativeEvent}`);
    // console.log(nativeEvent);
    let currentIndexValue = this.getIndex(absoluteY);
    let absoluteDiff = Math.abs(this.state.currentIndex - currentIndexValue);
    console.log("abs diff: ");
    console.log(absoluteDiff);
    let fractionalY = absoluteDiff / 5; // giving more appropriate values
    let fractionalY2 = (Math.abs(translationY) * 6) / 540;
    console.log("fractionalY, fractionalY2");
    console.log(fractionalY);
    console.log(fractionalY2); //540 is the height
    let valX1 = this.fractional(fractionalY);
    let valX2 = this.fractional(fractionalY2);

    console.log("valX1", "valX2");
    console.log(valX1);
    console.log(valX2);
    let outputx1 = translationX - valX1 * 60; // this is basically dynamic offsetX based on index.
    let outputx2 = translationX - valX2 * 60; // this is basically dynamic offsetX based on index.

    console.log("outputX1, outputX2");
    console.log(outputx1);
    console.log(outputx2);
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
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
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
    backgroundColor: "black"
  },
  right: {
    flex: 1,
    // padding: 50,
    height: "100%",
    flexDirection: "row",
    // padding: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  charButtonStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "brown"
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
