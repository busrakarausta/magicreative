import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import styles from "../Styles/RandomStyle";

export default class RandomCard extends Component {
  render() {
    const { data, title, onPress } = this.props;

    return (
      <View style={styles.randomContentContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.randomContainer}>
          {data ? (
            <Text style={styles.contentText}>{data}</Text>
          ) : (
            <Text style={styles.infoText}>
              The Mechanic you have called can not be reached at the moment
              please try again after enter one
            </Text>
          )}
        </View>
        <View style={styles.randomButtonContainer}>
          <Button
            raised
            theme={{ roundness: 3 }}
            mode="contained"
            style={styles.randomButton}
            color="purple"
            onPress={onPress}
          >
            Randomize Mechanic
          </Button>
        </View>
      </View>
    );
  }
}
