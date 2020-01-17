import React, { useState, useEffect } from "react";
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

export default function InputScreen() {
  const [type, setType] = useState("");
  const [text, onChangeText] = useState("");

  useEffect(() => {
    initialize();
  }, []);

  initialize = async () => {
    let newActivity = [];
    await AsyncStorage.setItem("Mechanic", JSON.stringify(newActivity));
    await AsyncStorage.setItem("Theme", JSON.stringify(newActivity));
  };

  addNewItem = async () => {
    try {
      var activities = await AsyncStorage.getItem(type);
      let newActivity = text.toString();
      if (activities != null) {
        activities = JSON.parse(activities);
        console.log(activities);
        activities.push(newActivity);
        try {
          await AsyncStorage.setItem(type, JSON.stringify(activities));
        } catch {
          console.warn(error);
        }
      } else {
        try {
          console.log(newActivity);
          await AsyncStorage.setItem(type, JSON.stringify(newActivity));
        } catch (error) {
          console.warn(error);
        }
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

  function ClearStore() {
    AsyncStorage.clear();
  }

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
        onChangeText={text => onChangeText(text)}
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
          setType(itemValue);
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
          onPress={() => {
            addNewItem();
            displayItems();
          }}
        />
      </View>
    </ScrollView>
  );
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
