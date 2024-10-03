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
import SelectRoomDropdown from "./SelectRoomDropdown";
import MasonryList from "@react-native-seoul/masonry-list";
import { AntDesign } from "@expo/vector-icons";

const AddBoxModal = ({ isVisible, handleCloseModal, handleSubmit }) => {
  const [results, setResults] = useState([]);

  const [boxName, setBoxName] = useState("");
  const [boxDescription, setBoxDescription] = useState("");
  const [boxContents, setBoxContents] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [roomName, setRoomName] = useState("");
  const [text, onChangeText] = useState(null);
  const [roomOptions, setRoomOptions] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (isVisible) {
      fetchRoomNames();
    }
  }, [isVisible]);

  const fetchRoomNames = async () => {
    setLoadingRooms(true); // Start loading
    setFetchError(null); // Clear any previous errors

    try {
      const response = await fetch("http://10.164.1.117:8080/inv/v1/rooms");
      const data = await response.json();

      console.log(data);

      // Map the data into picker-compatible format
      const formattedRooms = data.map((room) => ({
        label: room.roomName,
        value: room.roomName,
      }));

      // Add "Add new room..." as an option at the end
      formattedRooms.push({ label: "Add new room...", value: "add_new" });

      setRoomOptions(formattedRooms);
    } catch (error) {
      console.error("Error fetching room names:", error);
      setFetchError("Error fetching room names");
    } finally {
      setLoadingRooms(false); // Stop loading
    }
  };

  const handleClearModalData = () => {
    setBoxName("");
    setBoxDescription("");
    setRoomName("");
    setBoxContents([]);
  };

  const addItemToList = () => {
    if (newItem.trim()) {
      setBoxContents([...boxContents, newItem]);
      setNewItem("");
    }
  };

  // Handle form submission
  const handleFormSubmit = async () => {
    const newBox = {
      boxName,
      boxDescription,
      roomName,
      boxContents, // You can add an empty contents array or handle it as needed
    };
    console.log(newBox);
    try {
      const response = await fetch("http://10.164.1.117:8080/inv/v1/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBox),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}, ${response.body}`);
      }
      console.log("New box saved successfully");

      // Close the modal after successful submission
      handleSubmit(newBox);
      handleCloseModal();
      handleClearModalData();
    } catch (error) {
      console.error("Failed to save the box:", error);
    }

    setResults([...results, newBox]);
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
          {/* <TextInput
            style={styles.input}
            placeholder="Room Name"
            value={roomName}
            onChangeText={setRoomName}
          /> */}

          <SelectRoomDropdown
            name="dropdowntext"
            value={text}
            onChangeText={onChangeText}
            dropdownData={roomOptions}
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
