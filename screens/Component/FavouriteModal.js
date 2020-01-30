import React, { Component } from "react";
import { View, TextInput } from "react-native";
import { Button } from "react-native-paper";
import styles from "../Styles/RandomStyle";
import Modal from "react-native-modal";

export default class FavouriteModal extends Component {
  render() {
    const { isModalVisible, onChangeText, onPress, tag } = this.props;

    return (
      <View>
        <Modal
          isVisible={isModalVisible}
          style={styles.modal}
          backdropOpacity={0.25}
          hasBackdrop={true}
          backdropColor="purple"
          swipeDirection="up"
        >
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => onChangeText(text)}
              value={tag}
            />
            <Button style={styles.addFavButton} onPress={() => onPress()}>
              Enter Tag
            </Button>
          </View>
        </Modal>
      </View>
    );
  }
}
