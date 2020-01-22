import React, { Component } from "react";
import { List } from "react-native-paper";
import { AsyncStorage, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

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
    this.setState({ mechanic: [...mechanic, JSON.parse(mechanic)] });
    console.log(mechanic);
  };

  getTheme = async () => {
    const theme = await AsyncStorage.getItem("Theme");
    this.setState({ theme: [...theme, JSON.parse(theme)] });
  };

  render() {
    return (
      <ScrollView>
        <List.Section>
          <List.Accordion
            title="MECHANICS"
            onPress={() => {
              this.getMechanic();
            }}
            left={props => <List.Icon {...props} icon="folder" />}
          >
            {this.state.mechanic.map(data => {
              console.log(data);
              return (
                <List.Item
                  style={{ borderColor: "black", borderWidth: 3 }}
                  title={data.toString()}
                />
              );
            })}
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
            {this.state.theme.map(data => {
              return <List.Item title={data} />;
            })}
          </List.Accordion>
        </List.Section>
      </ScrollView>
    );
  }
}

ListScreen.navigationOptions = {
  title: "List"
};
