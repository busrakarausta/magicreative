import React, { Component } from "react";
import { List } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { description, onPress, key, title } = this.props;

    return (
      <List.Item
        key={key}
        style={{
          margin: 2,
          color: "white"
        }}
        description={description}
        borderless={true}
        rippleColor="orange"
        underlayColor="orange"
        title={title}
        right={props => (
          <TouchableOpacity onPress={() => onPress()}>
            <List.Icon {...props} icon="delete" />
          </TouchableOpacity>
        )}
      />
    );
  }
}
