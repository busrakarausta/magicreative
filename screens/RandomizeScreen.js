import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Button } from "react-native-paper";

export default function RandomizeScreen() {
  const [isRandomed, setRandom] = useState(false);
  const [mechanic, setMechanic] = useState("");
  const [theme, setTheme] = useState("");

  getMechanic = async () => {
    let mechanic = await AsyncStorage.getItem("Mechanic");
    mechanic = JSON.parse(mechanic);
    if (mechanic != null) {
      var size = mechanic.length;
      var count = Math.floor(Math.random() * size);
      setMechanic(mechanic[count]);
    } else setMechanic("");
  };

  getTheme = async () => {
    let theme = await AsyncStorage.getItem("Theme");
    theme = JSON.parse(theme);
    if (theme != null) {
      var size = theme.length;
      var count = Math.floor(Math.random() * size);
      setTheme(theme[count]);
    } else setTheme("");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {isRandomed ? (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View
              style={{
                margin: 2,
                marginBottom: 30,
                alignItems: "center",
                alignSelf: "stretch"
              }}
            >
              <Text style={{ margin: 25 }}>MECHANIC</Text>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: "purple",
                  alignSelf: "stretch",
                  alignItems: "center"
                }}
              >
                {mechanic ? (
                  <Text style={{ margin: 15 }}>{mechanic}</Text>
                ) : (
                  <Text style={{ margin: 25, color: "green" }}>
                    The Mechanic you have called can not be reached at the
                    moment please try again after enter one
                  </Text>
                )}
              </View>
            </View>

            <View
              style={{
                margin: 2,
                alignItems: "center",
                alignSelf: "stretch"
              }}
            >
              <Text style={{ margin: 25 }}>THEME</Text>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: "purple",
                  alignSelf: "stretch",
                  alignItems: "center"
                }}
              >
                {theme ? (
                  <Text style={{ margin: 15 }}>{theme}</Text>
                ) : (
                  <Text style={{ margin: 25, color: "green" }}>
                    The Theme you have called can not be reached at the moment
                    please try again after enter one
                  </Text>
                )}
              </View>
            </View>
          </View>
        ) : null}
        <View style={{ alignSelf: "center", margin: 20, alignItems: "center" }}>
          <Button
            raised
            theme={{ roundness: 3 }}
            mode="contained"
            style={{ padding: 2 }}
            color="purple"
            onPress={() => {
              setRandom(true);
              getMechanic();
              getTheme();
            }}
          >
            Randomize
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

RandomizeScreen.navigationOptions = {
  title: "Random"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: 30
  }
});
