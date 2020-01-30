import React, { Component } from "react";
import { List } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class ClearButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onPress, title } = this.props;

    return (
      <Button
        onPress={() => this.clearStore("Mechanic")}
        title="Clear All Mechanics"
      ></Button>
    );
  }
}
