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
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#55555",
        }}
      >
        <Text
          style={{
            alignItems: "center",
            fontSize: 24,
            fontWeight: "bold",
            color: "#333",
            letterSpacing: 1, // Add a bit of letter spacing for a sleek look
          }}
        >
          MyInventory
        </Text>
      </View>
      <HomeScreen />
      {/* <SearchBar></SearchBar> */}
    </View>
  );
}
