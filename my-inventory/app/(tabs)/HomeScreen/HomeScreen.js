// screens/HomeScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SearchBar from "../../../components/SearchBar"; // Reusable SearchBar component

const HomeScreen = () => {
  const [query, setQuery] = useState(""); // State for the search input
  const [results, setResults] = useState([]); // State for API results
  const [loading, setLoading] = useState(false); // State for the loading spinner

  // Function to fetch all data from the API
  const fetchAllData = async () => {
    setLoading(true); // Show the loading spinner
    try {
      const response = await fetch("http://10.164.1.117:8080/inv/v1/"); // Call the /api/getall endpoint
      const data = await response.json();
      setResults(data); // Assuming the API returns a 'results' array
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Hide the loading spinner
    }
  };

  // useEffect to call the /api/getall endpoint when the home screen mounts
  useEffect(() => {
    fetchAllData(); // Fetch all data when the component mounts
  }, []); // Empty dependency array ensures this only runs once when the component is mounted

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.tile}>
      <Text style={styles.tileTitle}>{item.boxName}</Text>
      <Text style={styles.tileDescription}>{item.boxDescription}</Text>
      <Text style={styles.tileSubtitle}>{item.roomName}</Text>

      {/* Nested FlatList for boxContents */}
      <FlatList
        data={item.boxContents} // Provide data to the nested FlatList
        // keyExtractor={(subItem) => subItem.id.toString()} // Unique key for each item in boxContents
        renderItem={({ item: subItem }) => (
          <View style={styles.subItemContainer}>
            <Text style={styles.subItemText}>{subItem.itemName}</Text>
            {/* Display the name from boxContents */}
          </View>
        )}
        // Set numColumns to 1 to display as a single column within the tile
        numColumns={1}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBar query={query} setQuery={setQuery} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <FlatList
        data={results} // The array of items to render
        // keyExtractor={(item) => item.id.toString()} // Unique key for each item
        renderItem={renderItem} // Function to render each item
        ListEmptyComponent={!loading && <Text>No results found</Text>} // Fallback if no data
        // Set numColumns to specify the number of columns in the grid
        numColumns={2} // Adjust the number of columns as needed
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  resultText: {
    fontSize: 18,
  },
});

export default HomeScreen;
