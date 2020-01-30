import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: 30
  },
  randomButton: { padding: 2 },
  randomButtonContainer: {
    alignSelf: "center",
    margin: 20,
    alignItems: "center"
  },
  infoText: { margin: 25, color: "green" },
  contentText: { margin: 15 },
  randomContainer: {
    borderWidth: 2,
    borderColor: "purple",
    alignSelf: "stretch",
    alignItems: "center"
  },
  title: { margin: 25 },
  randomContentContainer: {
    margin: 2,
    alignItems: "center",
    alignSelf: "stretch"
  },
  modal: {
    justifyContent: "center",
    marginTop: 100,
    backgroundColor: "white",
    flex: 0.4,
    borderRadius: 15
  },
  textInput: {
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
  },
  addFavButton: {
    backgroundColor: "purple",
    marginLeft: 75,
    marginRight: 75
  }
});

export default styles;
