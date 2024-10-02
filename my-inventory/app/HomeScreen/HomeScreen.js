// screens/HomeScreen.js
import React, { useState } from "react";
import {
  View,
  Modal,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SearchBar from "./SearchBar";
import { AntDesign } from "@expo/vector-icons";
import ViewBoxes from "./ViewBoxes";
import AddBoxModal from "./AddBoxModal";

const HomeScreen = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [counter, setBoxCounter] = useState(0);

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleAddBox = (boxData) => {
    console.log("Box Added:", boxData);
    setBoxCounter((prevCounter) => prevCounter + 1);
    setIsModalVisible(false); // Close modal after submission
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar query={query} setQuery={setQuery} />
      </View>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <ViewBoxes counter={counter} />

      <TouchableOpacity style={styles.floatingButton} onPress={handleOpenModal}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>

      <AddBoxModal
        isVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleAddBox}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#fff",
  },
  searchBarContainer: {
    marginBottom: 10, // Space between the search bar and the FlatList
    height: 50,
  },

  floatingButton: {
    position: "absolute",
    bottom: 20, // Distance from the bottom of the screen
    right: 20, // Distance from the right side of the screen
    backgroundColor: "#FF5733", // Button color
    width: 60, // Button width
    height: 60, // Button height
    borderRadius: 30, // Circular shape
    justifyContent: "center", // Center the content
    alignItems: "center", // Center the content
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5, // Shadow for Android
  },
});

export default HomeScreen;
