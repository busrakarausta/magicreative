import React, { Component } from "react";
import { List } from "react-native-paper";
import { AsyncStorage, View, Button, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ListItem from "../components/ListComponents/ListItem";

export default class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      mechanic: [],
      theme: [],
      favourite: []
    };
  }

  getData = async tag => {
    const data = await AsyncStorage.getItem(tag);
    if (tag == "Mechanic") {
      this.setState({ mechanic: JSON.parse(data) });
    } else if (tag == "Theme") {
      this.setState({ theme: JSON.parse(data) });
    } else if (tag == "Favourite") {
      this.setState({ favourite: JSON.parse(data) });
    }
  };

  clearStore = type => {
    AsyncStorage.removeItem(type);
  };

  removeItem = async (i, tag) => {
    const { mechanic, theme, favourite } = this.state;
    if (tag == "Mechanic") {
      this.setItem(mechanic, tag, i);
    } else if (tag == "Theme") {
      this.setItem(theme, tag, i);
    } else if (tag == "Favourite") {
      this.setItem(favourite, tag, i);
    }
  };

  setItem = async (data, tag, i) => {
    let newData = [...data];
    newData.splice(i, 1);
    newData = newData ? newData : [];
    await AsyncStorage.setItem(tag, JSON.stringify(newData)).then(
      Alert.alert("item removed")
    );
  };

  render() {
    return (
      <ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Button
            onPress={() => this.clearStore("Mechanic")}
            title="Clear All Mechanics"
          ></Button>
          <Button
            onPress={() => this.clearStore("Theme")}
            title="Clear All Themes"
          ></Button>
        </View>

        <List.Section>
          <List.Accordion
            title="MECHANICS"
            onPress={() => {
              this.getData("Mechanic");
            }}
            left={props => <List.Icon {...props} icon="folder" />}
          >
            {this.state.mechanic
              ? this.state.mechanic.map((data, i) => {
                  return (
                    <ListItem
                      key={i}
                      title={data}
                      onPress={() => {
                        this.removeItem(i, "Mechanic");
                      }}
                    />
                  );
                })
              : null}
          </List.Accordion>

          <List.Accordion
            title="THEMES"
            left={props => <List.Icon {...props} icon="folder" />}
            expanded={this.state.expanded}
            onPress={() => {
              this.setState({ expanded: !this.state.expanded });
              this.getData("Theme");
            }}
          >
            {this.state.theme
              ? this.state.theme.map((data, i) => {
                  return (
                    <ListItem
                      key={i}
                      title={data}
                      onPress={() => {
                        this.removeItem(i, "Theme");
                      }}
                    />
                  );
                })
              : null}
          </List.Accordion>

          <List.Accordion
            title="Favourites"
            left={props => <List.Icon {...props} icon="folder" />}
            onPress={() => {
              this.getData("Favourite");
            }}
          >
            {this.state.favourite
              ? this.state.favourite.map((data, i) => {
                  return (
                    <ListItem
                      key={i}
                      title={data.tag}
                      description={
                        "Mechanic : " +
                        data.mechanic +
                        "\n" +
                        "Theme : " +
                        data.theme
                      }
                      onPress={() => {
                        this.removeItem(i, "Favourite");
                      }}
                    />
                  );
                })
              : null}
          </List.Accordion>
        </List.Section>
      </ScrollView>
    );
  }
}

ListScreen.navigationOptions = {
  title: "List"
};
