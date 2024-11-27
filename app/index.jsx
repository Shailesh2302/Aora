import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Link } from "expo-router";
import "../global.css";
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-red-600">
      <Text classNrame="text-3xl">Aora!</Text>
      <StatusBar style="auto" />
      <Link href="/profile">Go to Profile</Link>
    </View>
  );
}
