import HomeScreen from "@/app/(tabs)/HomeScreen/HomeScreen";
import { Text, View } from "react-native";
import { SearchBar } from "react-native-screens";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Skibidi Toilet</Text>
      <HomeScreen />
      {/* <SearchBar></SearchBar> */}
    </View>
  );
}
