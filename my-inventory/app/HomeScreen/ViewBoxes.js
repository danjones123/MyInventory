import React, { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import MasonryList from "@react-native-seoul/masonry-list";

const ViewBoxes = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  let itemCount = 0;

  // Function to fetch all data from the API
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://10.164.1.117:8080/inv/v1/");
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to call the /api/getall endpoint when the home screen mounts
  useEffect(() => {
    fetchAllData(); // Fetch all data when the component mounts
  }, []);

  const filteredResults = results.filter((item) => {
    const searchTerm = query.toLowerCase();
    return (
      item.boxName.toLowerCase().includes(searchTerm) ||
      item.boxDescription.toLowerCase().includes(searchTerm) ||
      item.boxContents.toLowerCase().includes(searchTerm)
    );
  });

  const renderItem = ({ item }) => {
    let bgColour = "#fff";
    if (itemCount % 3 == 0) {
      bgColour = "#FFCCF9";
    } else if (itemCount % 3 == 1) {
      bgColour = "#C4FAF8";
    } else {
      bgColour = "#DBFFD6";
    }

    itemCount++;

    return (
      <TouchableOpacity style={[styles.tile, { backgroundColor: bgColour }]}>
        <Text style={styles.tileTitle}>{item.boxName}</Text>
        <Text style={styles.tileDescription}>{item.boxDescription}</Text>
        <Text style={styles.tileSubtitle}>{item.roomName}</Text>

        {/* Nested FlatList for boxContents */}
        <MasonryList
          data={item.boxContents} // Provide data to the nested FlatList
          keyExtractor={(subItem) => subItem.toString()} // Unique key for each item in boxContents
          renderItem={({ item: subItem }) => (
            <View style={styles.subItemContainer}>
              <Text style={styles.subItemText}>{subItem}</Text>
            </View>
          )}
          numColumns={1}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.masonryContainer}>
      <MasonryList
        // style={{ width: "100%" }}
        data={filteredResults} // The array of items to render
        keyExtractor={(item) => item.boxName.toString()} // Unique key for each item
        renderItem={renderItem} // Function to render each item
        ListEmptyComponent={!loading && <Text>No results found</Text>} // Fallback if no data
        // Set numColumns to specify the number of columns in the grid
        numColumns={2} // Adjust the number of columns as needed
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  masonryContainer: {
    flex: 1, // This ensures the MasonryList takes up the remaining space
  },
  listContent: {
    padding: 10,
    paddingBottom: 20,
    alignItems: "stretch",
    flexGrow: 1, // Ensures FlatList can grow to fill available space
  },
  tile: {
    backgroundColor: "#f6f6f6",
    padding: 5,
    margin: 5,
    width: Dimensions.get("window").width / 2 - 15,
    borderRadius: 10, // Rounded corners
    borderWidth: 1, // Border thickness
    borderColor: "#ccc", // Border color (light gray)
    shadowColor: "#000", // Optional shadow for a nice effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  tileTitle: {
    fontSize: 18, // Slightly larger font for emphasis
    fontWeight: "bold", // Bold to stand out
    color: "#333333", // Dark color for good readability
    marginBottom: 4, // Space between title and other elements
  },

  tileDescription: {
    fontSize: 14, // Smaller font size for the description
    fontWeight: "normal", // Regular weight for readability
    color: "#777777", // Even lighter color for a subtle look
    lineHeight: 20, // Extra line height for readability
  },

  tileSubtitle: {
    fontSize: 16, // Slightly smaller than the title
    fontWeight: "600", // Semi-bold to differentiate from regular text
    color: "#555555", // Lighter color for subtler emphasis
    marginBottom: 4, // Some space below for separation
  },
});

export default ViewBoxes;
