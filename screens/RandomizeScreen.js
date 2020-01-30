import React, { useState } from "react";
import { ScrollView, View, AsyncStorage, Alert } from "react-native";
import { Button } from "react-native-paper";
import styles from "./Styles/RandomStyle";
import RandomCard from "./Component/RandomCard";
import FavouriteModal from "./Component/FavouriteModal";

export default function RandomizeScreen() {
  const [isRandomed, setRandom] = useState(false);
  const [mechanic, setMechanic] = useState("");
  const [theme, setTheme] = useState("");
  const [tag, setTag] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  clearStore = () => {
    AsyncStorage.removeItem("Favourite");
  };

  addNewFavourite = async () => {
    const newFavourite = { theme: theme, mechanic: mechanic, tag: tag };
    await AsyncStorage.getItem("Favourite").then(favourite => {
      const c = favourite ? JSON.parse(favourite) : [];
      c.push(newFavourite);
      AsyncStorage.setItem("Favourite", JSON.stringify(c)).then(() => {
        console.log(c);
        Alert.alert("This combination is added to your favourites");
        setModalVisible(false);
      });
    });
  };

  getData = async tag => {
    let data = await AsyncStorage.getItem(tag);
    data = JSON.parse(data);
    if (data != null) {
      var size = data.length;
      var count = Math.floor(Math.random() * size);
      if (tag == "Theme") {
        setTheme(data[count]);
      } else if (tag == "Mechanic") {
        setMechanic(data[count]);
      }
    } else {
      if (tag == "Theme") {
        setTheme("");
      } else if (tag == "Mechanic") {
        setMechanic("");
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {isRandomed ? (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View>
              <FavouriteModal
                tag={tag}
                isModalVisible={isModalVisible}
                onChangeText={text => setTag(text)}
                onPress={() => {
                  this.addNewFavourite();
                }}
              />
              <Button
                icon="heart"
                mode="contained"
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                Add Favourite
              </Button>
            </View>
            <RandomCard
              title="Mechanic"
              data={mechanic}
              onPress={() => {
                getData("Mechanic");
              }}
            />
            <RandomCard
              title="Theme"
              data={theme}
              onPress={() => {
                getData("Theme");
              }}
            />
          </View>
        ) : null}
        {!isRandomed ? (
          <View style={styles.rand}>
            <Button
              raised
              theme={{ roundness: 3 }}
              mode="contained"
              style={styles.randomButton}
              color="purple"
              onPress={() => {
                setRandom(true);
                getData("Mechanic");
                getData("Theme");
              }}
            >
              Randomize
            </Button>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

RandomizeScreen.navigationOptions = {
  title: "Random"
};
