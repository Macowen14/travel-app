// Travelers.js
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Alert,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { SelectTravelersList } from "../../constants/Options";
import TravelPlanCard from "../../components/TravelPlanCard";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CreateTripContext } from "../../context/CreateTripContext";

const Travelers = () => {
  // Get navigation object from react-navigation
  const navigation = useNavigation();
  const router = useRouter();

  const { tripData, updateTripData } = useContext(CreateTripContext);
  const [selectedId, setSelectedId] = useState(null);
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    // Hide header for this screen
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Handle when a travel plan card is pressed
  const handleCardPress = (item) => {
    setSelectedId(item.id); // Set the selected traveler's ID
    setPlan({
      title: item.title,
      estimate: item.people,
    }); // Update the plan with the selected traveler's information'
  };

  // Handle continue button press
  const handleContinuePress = () => {
    if (selectedId === null) {
      Alert.alert("Please select at least one traveler plan");
    } else {
      console.log("Updating trip data with:", plan); // Log the plan being updated
      updateTripData({
        travelPlan: { estimate: plan.estimate, title: plan.title },
      });

      // Log the updated tripData after context update
      setTimeout(() => {
        console.log("Updated tripData in travelers:", tripData);
      }, 100);

      // Navigate to the next screen
      router.push("/create-trip/select-date");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Go back to the previous screen
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Who&#39;s traveling?</Text>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Choose Your Travelers</Text>
      </View>

      <FlatList
        data={SelectTravelersList} // Data for FlatList
        renderItem={({ item }) => (
          <TravelPlanCard
            item={item}
            isSelected={item.id === selectedId}
            onPress={handleCardPress}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinuePress} // Handle continue button press
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 29,
    backgroundColor: "#f8f9fa",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 10,
    zIndex: 10,
    padding: 8,
    backgroundColor: "#009688",
    borderRadius: 50,
  },
  title: {
    fontFamily: "outfitBold",
    fontSize: 24,
    color: "#333",
    textAlign: "center",
  },
  subtitleContainer: {
    marginTop: 8,
  },
  subtitle: {
    fontFamily: "outfitRegular",
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  footer: {
    backgroundColor: "#f8f9fa",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    alignItems: "center",
  },
  continueButton: {
    backgroundColor: "#009688",
    borderRadius: 24,
    minWidth: 300,
    paddingVertical: 12,
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontFamily: "outfitMedium",
    fontSize: 16,
  },
});

export default Travelers;
