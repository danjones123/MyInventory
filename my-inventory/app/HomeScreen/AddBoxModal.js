import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";

import MasonryList from "@react-native-seoul/masonry-list";
import { AntDesign } from "@expo/vector-icons";

const AddBoxModal = ({ isVisible, handleCloseModal, handleSubmit }) => {
  const [results, setResults] = useState([]);

  const [boxName, setBoxName] = useState("");
  const [boxDescription, setBoxDescription] = useState("");
  const [boxContents, setBoxContents] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [roomName, setRoomName] = useState("");

  // const handleCloseModal = () => {
  //   setModalVisible(false);
  //   setBoxName("");
  //   setBoxDescription("");
  //   setRoomName("");
  // };

  const addItemToList = () => {
    if (newItem.trim()) {
      setBoxContents([...boxContents, newItem]);
      setNewItem("");
    }
  };

  // Handle form submission
  const handleFormSubmit = () => {
    const newBox = {
      boxName,
      boxDescription,
      roomName,
      boxContents, // You can add an empty contents array or handle it as needed
    };

    setResults([...results, newBox]);

    console.log(newBox);
    handleSubmit(newBox); // Close the modal after submission
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleCloseModal} // Close the modal when back button is pressed on Android
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add a New Box</Text>

          <TextInput
            style={styles.input}
            placeholder="Box Name"
            value={boxName}
            onChangeText={setBoxName}
          />
          <TextInput
            style={styles.input}
            placeholder="Box Description"
            value={boxDescription}
            onChangeText={setBoxDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Room Name"
            value={roomName}
            onChangeText={setRoomName}
          />

          <TextInput
            style={styles.input}
            placeholder="Add Box Item"
            value={newItem}
            onChangeText={setNewItem}
          />

          {/* Add Item Button */}
          <Pressable style={styles.addButton} onPress={addItemToList}>
            <Text style={styles.addButtonText}>Add Item</Text>
          </Pressable>

          {/* Display List of Items */}
          <FlatList
            data={boxContents}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text>{item}</Text>
              </View>
            )}
          />

          <Pressable style={styles.submitButton} onPress={handleFormSubmit}>
            <Text style={styles.submitButtonText}>Add Box</Text>
          </Pressable>

          <Pressable style={styles.cancelButton} onPress={handleCloseModal}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  listItem: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddBoxModal;
