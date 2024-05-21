import React from "react";
import { ImageBackground, View, Text, StyleSheet } from "react-native";
import Quiz from "./components/Quiz";

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#CDB4DB" }}>
      <ImageBackground
        source={require("../assets/images/worldcup.jpg")}
        style={{ flex: 1 }}
        imageStyle={{ opacity: 0.5 }}
      >
        <Text style={styles.heading}>World Cup 2022 Quiz App</Text>
        <Quiz />
      </ImageBackground>
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    marginVertical: "auto",
    marginHorizontal: "auto",
    marginTop: 20,
    fontWeight: "bold",
    color: "black",
  },
});
