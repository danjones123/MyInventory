// import React, { useState, useEffect } from "react";
// import {
//   View,
//   TextInput,
//   FlatList,
//   Text,
//   ActivityIndicator,
//   StyleSheet,
// } from "react-native";

// const SearchScreen = () => {
//   const [query, setQuery] = useState(""); // State for search input
//   const [results, setResults] = useState([]); // State for API results
//   const [loading, setLoading] = useState(false); // State for loading indicator

//   // // Function to fetch data from API
//   // const fetchSearchResults = async (searchQuery) => {
//   //   setLoading(true);
//   //   try {
//   //     const response = await fetch(
//   //       `http://10.164.1.117:8080/inv/v1/globalSearch?searchItem=${searchQuery}`
//   //     );
//   //     const data = await response.json();
//   //     setResults(data.results);
//   //   } catch (error) {
//   //     console.error("Error fetching search results:", error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // // useEffect to trigger search when query changes
//   // useEffect(() => {
//   //   if (query.length > 2) {
//   //     // Only search when query is longer than 2 characters
//   //     fetchSearchResults(query);
//   //   }
//   // }, [query]);

//   return (
//     <View style={styles.container}>
//       {/* Search bar */}
//       <TextInput
//         style={styles.searchBar}
//         placeholder="Search..."
//         value={query}
//         onChangeText={setQuery} // Update query on text input
//       />

//       {/* Loading spinner */}
//       {loading && <ActivityIndicator size="large" color="#0000ff" />}

//       {/* Displaying search results */}
//       <FlatList
//         data={results}
//         keyExtractor={(item) => item.id.toString()} // Assuming each item has a unique "id"
//         renderItem={({ item }) => (
//           <View style={styles.resultItem}>
//             <Text style={styles.resultText}>{item.name}</Text>{" "}
//             {/* Assuming item has a "name" */}
//           </View>
//         )}
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
//   resultItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   resultText: {
//     fontSize: 18,
//   },
// });

// export default SearchScreen;
