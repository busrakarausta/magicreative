import React, { Component } from "react";
import {
  StyleSheet,
  Picker,
  Button,
  Alert,
  View,
  AsyncStorage
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default class InputScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Mechanic",
      text: "",
      activities: []
    };
  }

  addNewItem = async () => {
    try {
      const { type, text } = this.state;
      const newActivity = text.toString();
      await AsyncStorage.getItem(type).then(activities => {
        const c = activities ? JSON.parse(activities) : [];
        c.push(newActivity);
        AsyncStorage.setItem(type, JSON.stringify(c)).then(this.displayItems());
      });
    } catch (error) {
      console.warn(error);
    }
  };

  displayItems = () => {
    try {
      const newActivity = this.state.text.toString();
      Alert.alert(newActivity + " added!!");
    } catch {
      console.warn(JSON.parse(activities));
    }
  };

  render() {
    const { text, type } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={{
            height: 40,
            width: 250,
            borderColor: "gray",
            borderWidth: 1,
            margin: 35,
            paddingLeft: 10,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "purple",
            alignSelf: "center"
          }}
          onChangeText={text => this.setState({ text })}
          value={text}
        />
        <Picker
          selectedValue={type}
          style={{
            height: 50,
            width: 200,
            margin: 15,
            borderRadius: 50,
            borderWidth: 15,
            borderColor: "purple",
            alignSelf: "center"
          }}
          onValueChange={itemValue => {
            this.setState({ type: itemValue });
          }}
        >
          <Picker.Item label="Mechanic" value="Mechanic" />
          <Picker.Item label="Theme" value="Theme" />
        </Picker>
        <View style={{ padding: 20, alignItems: "flex-end" }}>
          <Button
            style={{ width: 100 }}
            color="purple"
            title="Enter"
            onPress={this.addNewItem}
          />
        </View>
      </View>
    );
  }
}

InputScreen.navigationOptions = {
  title: "Input New One"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center"
  }
});
