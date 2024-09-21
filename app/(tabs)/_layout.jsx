import { View, Text, Appearance } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const _layout = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  const isDarkMode = theme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#333" : "#fff", // Dynamic background
          borderTopWidth: 0,
          elevation: 0, // Remove shadow on Android
          height: 60, // Increase height for better spacing
        },
        tabBarLabelStyle: {
          fontSize: 12,
          color: isDarkMode ? "#fff" : "#687076", // Dynamic label color
          marginBottom: 5,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarActiveTintColor: isDarkMode ? "#1E90FF" : "#007BFF", // Active color based on theme
        tabBarInactiveTintColor: isDarkMode ? "#b0b0b0" : "#687076", // Inactive color based on theme
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
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="settings"
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
