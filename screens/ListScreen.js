import React, { useState, useEffect } from "react";
import { List } from "react-native-paper";
import { AsyncStorage } from "react-native";

export default function ListScreen() {
  const [expanded, setExpanded] = useState(false);
  const [mechanic, setMechanic] = useState("");
  const [theme, setTheme] = useState("");

  useEffect(async () => {
    await getMechanic();
    await getTheme();
  }, []);

  getMechanic = async () => {
    const mechanic = await AsyncStorage.getItem("Mechanic");
    setMechanic(JSON.parse(mechanic));
    console.warn(JSON.parse(mechanic));
  };

  getTheme = async () => {
    const theme = await AsyncStorage.getItem("Theme");
    console.log("Theme: ", theme);
    setTheme(JSON.parse(theme));
    console.warn(JSON.parse(theme));
  };

  function itemList(items = []) {
    items.map(data => {
      return (
        <View>
          <List.Item title={data} />
        </View>
      );
    });
  }
  return (
    <List.Section>
      <List.Accordion
        title="MECHANICS"
        left={props => <List.Icon {...props} icon="folder" />}
      >
        {/* {itemList(mechanic)} */}
      </List.Accordion>

      <List.Accordion
        title="THEMES"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        {/* {itemList(theme)} */}
      </List.Accordion>
    </List.Section>
  );
}

ListScreen.navigationOptions = {
  title: "List"
};
