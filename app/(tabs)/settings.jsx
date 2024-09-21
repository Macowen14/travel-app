import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Pressable,
  StatusBar,
} from "react-native";
import { useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { CreateTripContext } from "../../context/CreateTripContext";
import { signOut } from "firebase/auth";
import { auth } from "../../configs/firebase";

const SettingsPage = () => {
  const [isThemeDark, setIsThemeDark] = useState(true);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const deviceTheme = useColorScheme();
  const router = useRouter();
  const { setUserData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    setIsThemeDark(deviceTheme === "dark" || isThemeDark); // Default to dark theme
  }, [deviceTheme]);

  const toggleTheme = () => {
    setIsThemeDark((prevTheme) => !prevTheme);
  };

  const OnSignOut = async () => {
    try {
      console.log("Going to sign out...");

      // Sign out the user
      await signOut(auth);
      console.log("User signed out successfully");

      // Clear the context after sign out
      setUserData(""); // Clear user data
      setTripData([]); // Clear trip data

      // Redirect to the sign-in page
      router.replace("/(auth)/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isThemeDark ? "#1a1a1a" : "#fff",
        paddingTop: 30,
      }}
    >
      <StatusBar barStyle={isThemeDark ? "light-content" : "dark-content"} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 24,
            color: isThemeDark ? "#fff" : "#000",
          }}
        >
          Settings
        </Text>

        {/* Profile Section */}
        <TouchableOpacity
          onPress={() => router.push("/profile")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Ionicons
            name="person-circle"
            size={28}
            color={isThemeDark ? "#fff" : "#000"}
          />
          <Text
            style={{
              marginLeft: 16,
              fontSize: 18,
              color: isThemeDark ? "#fff" : "#000",
            }}
          >
            Profile
          </Text>
        </TouchableOpacity>

        {/* Theme Switch */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Text style={{ fontSize: 18, color: isThemeDark ? "#fff" : "#000" }}>
            Dark Mode
          </Text>
          <Switch
            value={isThemeDark}
            onValueChange={toggleTheme}
            thumbColor={isThemeDark ? "#f4f3f4" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>

        {/* Notifications */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 24,
          }}
          onPress={() => setShowNotificationsModal(true)}
        >
          <MaterialIcons
            name="notifications"
            size={28}
            color={isThemeDark ? "#fff" : "#000"}
          />
          <Text
            style={{
              marginLeft: 16,
              fontSize: 18,
              color: isThemeDark ? "#fff" : "#000",
            }}
          >
            Notifications
          </Text>
        </TouchableOpacity>

        {/* Contact Support */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 24,
          }}
          onPress={() => setShowSupportModal(true)}
        >
          <FontAwesome
            name="envelope"
            size={28}
            color={isThemeDark ? "#fff" : "#000"}
          />
          <Text
            style={{
              marginLeft: 16,
              fontSize: 18,
              color: isThemeDark ? "#fff" : "#000",
            }}
          >
            Contact Support
          </Text>
        </TouchableOpacity>

        {/* Terms & Conditions */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 24,
          }}
          onPress={() => setShowTermsModal(true)}
        >
          <MaterialIcons
            name="description"
            size={28}
            color={isThemeDark ? "#fff" : "#000"}
          />
          <Text
            style={{
              marginLeft: 16,
              fontSize: 18,
              color: isThemeDark ? "#fff" : "#000",
            }}
          >
            Terms & Conditions
          </Text>
        </TouchableOpacity>

        {/* Sign Out */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 24,
          }}
          onPress={OnSignOut}
        >
          <Ionicons
            name="log-out"
            size={28}
            color={isThemeDark ? "#fff" : "#000"}
          />
          <Text
            style={{
              marginLeft: 16,
              fontSize: 18,
              color: isThemeDark ? "#fff" : "#000",
            }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Notifications Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showNotificationsModal}
        onRequestClose={() => setShowNotificationsModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: "75%",
              padding: 24,
              borderRadius: 8,
              backgroundColor: isThemeDark ? "#333" : "#fff",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: isThemeDark ? "#fff" : "#000",
              }}
            >
              Notifications
            </Text>
            <Text
              style={{
                marginTop: 16,
                color: isThemeDark ? "#fff" : "#666",
              }}
            >
              You have no new notifications.
            </Text>
            <Pressable
              onPress={() => setShowNotificationsModal(false)}
              style={{
                marginTop: 16,
                backgroundColor: "#007bff",
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Contact Support Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSupportModal}
        onRequestClose={() => setShowSupportModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: "75%",
              padding: 24,
              borderRadius: 8,
              backgroundColor: isThemeDark ? "#333" : "#fff",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: isThemeDark ? "#fff" : "#000",
              }}
            >
              Contact Support
            </Text>
            <Text
              style={{
                marginTop: 16,
                color: isThemeDark ? "#fff" : "#666",
              }}
            >
              Email: support@travelapp.com
            </Text>
            <Text
              style={{
                marginTop: 8,
                color: isThemeDark ? "#fff" : "#666",
              }}
            >
              Phone: +123 456 7890
            </Text>
            <Pressable
              onPress={() => setShowSupportModal(false)}
              style={{
                marginTop: 16,
                backgroundColor: "#007bff",
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Terms & Conditions Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showTermsModal}
        onRequestClose={() => setShowTermsModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: "75%",
              padding: 24,
              borderRadius: 8,
              backgroundColor: isThemeDark ? "#333" : "#fff",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: isThemeDark ? "#fff" : "#000",
              }}
            >
              Terms & Conditions
            </Text>
            <Text
              style={{
                marginTop: 16,
                color: isThemeDark ? "#fff" : "#666",
              }}
            >
              1. Use the app responsibly.
            </Text>
            <Text
              style={{
                marginTop: 8,
                color: isThemeDark ? "#fff" : "#666",
              }}
            >
              2. Your data will be handled securely.
            </Text>
            <Text
              style={{
                marginTop: 8,
                color: isThemeDark ? "#fff" : "#666",
              }}
            >
              3. All rights reserved © TravelApp 2024.
            </Text>
            <Pressable
              onPress={() => setShowTermsModal(false)}
              style={{
                marginTop: 16,
                backgroundColor: "#007bff",
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SettingsPage;
