import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerBlurEffect: "regular",
          headerTransparent: true,
        }}
      />
    </Stack>
  );
};

export default RootLayout;
