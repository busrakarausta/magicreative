import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Picker,
  Button,
  Alert,
  View,
  AsyncStorage
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { render } from "react-dom";

export default class InputScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      text: ""
    };
  }

  async componentDidMount() {
    await this.initialize();
  }

  initialize = async () => {
    let newActivity = [];
    await AsyncStorage.setItem("Mechanic", JSON.stringify(newActivity));
    await AsyncStorage.setItem("Theme", JSON.stringify(newActivity));
  };

  addNewItem = async () => {
    try {
      const { type, text } = this.state;
      console.log("Type: ", type);
      let activities = [];
      activities = await AsyncStorage.getItem(type);
      activities = JSON.parse(activities);
      const newActivity = text.toString();
      if (activities.length > 0) {
        console.log("activities: ", activities);
        activities.push(newActivity);
        await AsyncStorage.setItem(type, JSON.stringify(activities));
      } else {
        console.log("newActivity: ", newActivity);
        console.log("type: ", type);
        activities.push(newActivity);
        await AsyncStorage.setItem(type, JSON.stringify(activities));
      }
    } catch (error) {
      console.warn(error);
    }
  };

  displayItems = async () => {
    try {
      let activities = await AsyncStorage.getItem(type);
      activities = JSON.parse(activities);
      Alert.alert(activities[0]);
    } catch {
      console.warn(JSON.parse(activities));
    }
  };

  clearStore = () => {
    AsyncStorage.clear();
  };

  render() {
    const { text, type } = this.state;
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start"
        }}
      >
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
          onChangeText={text => this.setState({ text: text })}
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
            console.log("onValueChange: ", itemValue);
            this.setState({ type: itemValue });
          }}
        >
          <Picker.Item label="Mechanic" value="Mechanic" />
          <Picker.Item label="Theme" value="Theme" />
        </Picker>
        <View style={{ padding: 20, alignItems: "flex-end" }}>
          <Button
            style={{ paddingLeft: 50, alignSelf: "stretch" }}
            color="purple"
            title="Enter"
            onPress={async () => {
              await this.addNewItem();
              // await this.displayItems();
            }}
          />
        </View>
      </ScrollView>
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
    backgroundColor: "#fff"
  }
});
