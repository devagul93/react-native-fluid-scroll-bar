import React, { Component } from "react";
import {
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  CheckBox
} from "react-native";
// import FastImage from "react-native-fast-image";
const initialState = {
  checked: false
};

class AppItem extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  render() {
    const { appImageBase64 } = this.props;
    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={this.props.onPress}
        onLongPress={this.props.onLongPress}
      >
        <View style={{ flex: 1 }}>
          {/* <View style={[this.props.containerStyle, { flex: 1 }]}> */}
          <View style={{ flexDirection: "row", flex: 1, marginLeft: 10 }}>
            <Text
              style={[
                {
                  fontSize: 25,
                  textAlign: "left",
                  marginLeft: 10,
                  paddingLeft: 8,
                  margin: 10,
                  padding: 5,
                  color: "white"
                },
                { flex: 1 }
              ]}
            >
              {this.props.customName.length > 0
                ? this.props.customName
                : this.props.text}
            </Text>
          </View>
          {/* </View> */}
        </View>
      </TouchableOpacity>
    );
  }
}

export default AppItem;
