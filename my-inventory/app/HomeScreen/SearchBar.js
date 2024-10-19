import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Importing the filter icon from vector icons

export default function SearchBarWithFilter({
  searchQuery,
  setSearchQuery,
  filterRoom,
  setFilterRoom,
}) {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [rooms, setRooms] = useState(null);

  // Open filter modal
  const handleFilterIconPress = () => {
    setFilterModalVisible(true);
  };

  // Select a room for filtering
  const handleRoomSelect = (room) => {
    console.log(room);
    setFilterRoom(room.label);
    setFilterModalVisible(false);
  };

  const handleClearFilter = () => {
    setFilterRoom("");
    setFilterModalVisible(false);
  };

  useEffect(() => {
    console.log("filterModalVisible?:", isFilterModalVisible);
    if (isFilterModalVisible) {
      fetchRoomNames();
    }
  }, [isFilterModalVisible]);

  const fetchRoomNames = async () => {
    console.log("in fetch");
    // setLoadingRooms(true); // Start loading
    // setFetchError(null); // Clear any previous errors

    try {
      const response = await fetch("http://192.168.1.106:8080/inv/v1/rooms");
      const data = await response.json();

      const formatRooms = data.map((room) => ({
        label: room.roomName,
        value: room.roomName,
      }));
      setRooms(formatRooms);
      console.log(formatRooms);
    } catch (error) {
      console.error("Error fetching room names:", error);
      //   setFetchError("Error fetching room names");
      // } finally {
      // setLoadingRooms(false); // Stop loading
    }
  };

  return (
    <View style={styles.searchContainer}>
      {/* SearchBar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Filter Icon */}
      <TouchableOpacity
        onPress={handleFilterIconPress}
        style={styles.filterIcon}
      >
        <Icon name="filter-list" size={24} color="black" />
      </TouchableOpacity>

      {/* Filter Modal */}
      <Modal
        visible={isFilterModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter by Room</Text>
            <View style={styles.flatListContainer}>
              <FlatList
                data={rooms}
                keyExtractor={(item) => item.value} // Assuming each room has an id
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleRoomSelect(item)}>
                    <Text style={styles.roomItem}>{item.value}</Text>
                  </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={true}
              />
            </View>

            <View>
              <TouchableOpacity onPress={handleClearFilter}>
                <Text style={styles.clearButton}>Clear</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row", // Align search bar and icon in a row
    alignItems: "center",
    margin: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  filterIcon: {
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  flatListContainer: {
    maxHeight: "85%",
    flexGrow: 0,
  },
  roomItem: {
    fontSize: 16,
    paddingVertical: 10,
  },
  clearButton: {
    textAlign: "center",
    paddingVertical: 3,
    color: "red", // You can change this to suit your theme
    marginTop: 3,
  },

  closeButton: {
    textAlign: "center",
    paddingVertical: 3,
    color: "blue",
    marginTop: 3,
  },
});

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   TextInput,
//   FlatList,
//   Text,
//   ActivityIndicator,
//   StyleSheet,
// } from "react-native";

// const SearchBar = ({ searchQuery, setSearchQuery }) => {
//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchBar}
//         placeholder="Search..."
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   searchBar: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
// });

// export default SearchBar;
