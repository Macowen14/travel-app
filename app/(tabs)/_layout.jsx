import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#ffffff", // Background color of the tab bar
          borderTopWidth: 0,
          elevation: 0, // Remove shadow on Android
        },
        tabBarLabelStyle: {
          fontSize: 12,
          color: "#687076",
          marginBottom: 5,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarActiveTintColor: "#007BFF", // Active tab icon and label color
        tabBarInactiveTintColor: "#687076", // Inactive tab icon and label color
      }}
    >
      <Tabs.Screen
        name="mytrip"
        options={{
          tabBarLabel: "My Trip",
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="map-pin"
              size={focused ? size * 1.2 : size}
              color={color}
              style={{ marginTop: 2 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name="globe"
              size={focused ? size * 1.2 : size}
              color={color}
              style={{ marginTop: 2 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="account"
              size={focused ? size * 1.2 : size}
              color={color}
              style={{ marginTop: 2 }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
