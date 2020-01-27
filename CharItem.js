import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

export default class CharItem extends Component {
  render() {
    return (
      <Animated.View style={this.props.animatedStyle}>
        <TouchableOpacity
          onPress={() => {
            this.props.onPress(this.props.text);
          }}
        >
          <Text style={[this.props.style]}>{this.props.text}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
