import React from "react";
import { View, Text } from "react-native";
import { Tabs } from "expo-router";
import HomeScreen from "./HomeScreen/HomeScreen"; // Adjust the path based on your folder structure
// import AddBox from "./AddBox"; // Adjust the path based on your folder structure

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        width: "100%",
        backgroundColor: "#55555",
      }}
    >
      <Text>MyInventory</Text>
      <HomeScreen />
      {/* <SearchBar></SearchBar> */}
    </View>
  );
}
