import React, { Component } from "react";
import { List } from "react-native-paper";
import { AsyncStorage, View, Button } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      mechanic: [],
      theme: []
    };
  }

  getMechanic = async () => {
    const mechanic = await AsyncStorage.getItem("Mechanic");
    this.setState({ mechanic: JSON.parse(mechanic) });
    console.log(mechanic);
  };

  getTheme = async () => {
    const theme = await AsyncStorage.getItem("Theme");
    this.setState({ theme: JSON.parse(theme) });
  };

  clearStore = type => {
    AsyncStorage.removeItem(type);
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
              this.getMechanic();
            }}
            left={props => <List.Icon {...props} icon="folder" />}
          >
            {this.state.mechanic
              ? this.state.mechanic.map((data, i) => {
                  return (
                    <List.Item
                      key={i}
                      style={{
                        margin: 2,
                        color: "white"
                      }}
                      borderless={true}
                      rippleColor="orange"
                      underlayColor="orange"
                      title={data}
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
              this.getTheme();
            }}
          >
            {this.state.theme
              ? this.state.theme.map((data, i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      style={{
                        paddingLeft: 0
                      }}
                      underlayColor={"orange"}
                    >
                      <List.Item key={i} title={data} />
                    </TouchableOpacity>
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
