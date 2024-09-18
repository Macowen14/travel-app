import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useNavigation } from "expo-router";
import { budget } from "../../constants/Options";
import BudgetCard from "../../components/BudgetCard";
import { CreateTripContext } from "../../context/CreateTripContext";

const Budget = () => {
  const [selectedBudget, setSelectedBudget] = useState(null); // State to track the selected budget
  const navigation = useNavigation();
  const { updateTripData } = useContext(CreateTripContext); // Get the updateTripData function from context

  const handleContinue = () => {
    if (selectedBudget !== null) {
      // Use the selectedBudget index to fetch the correct item from the budget array
      const selectedOption = budget[selectedBudget];

      updateTripData({
        budget: { desc: selectedOption.desc, amount: selectedOption.title },
      }); // Update the trip data with the selected budget

      // Navigate to the next step of the trip setup
      router.push("/create-trip/review-trip");
    } else {
      alert("Please select a budget to continue.");
    }
  };

  return (
    <SafeAreaView className="flex-1 pt-10 bg-white">
      {/* Back Button */}
      <TouchableOpacity
        className="p-2 rounded-full absolute top-8 left-5 bg-[#00CCBB]"
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>

      {/* Header */}
      <Text className="font-outfitBold text-4xl text-center text-[#1e3a5f] mt-20">
        Budget Plan
      </Text>
      <Text className="text-gray-500 text-center mt-2 mx-8 text-base">
        Select the budget that suits your travel style. Whether you prefer
        luxury or a budget-friendly trip, you can change this anytime.
      </Text>

      {/* Budget Options*/}
      <ScrollView
        className="flex-1 mt-10"
        contentContainerStyle={{ alignItems: "center" }}
      >
        {budget.map((item, index) => (
          <BudgetCard
            key={index}
            item={item}
            isSelected={selectedBudget === index}
            onPress={() => setSelectedBudget(index)} // Update only selectedBudget
          />
        ))}
      </ScrollView>

      {/* Continue Button */}
      <View className="bg-amber-100 w-full h-28 rounded-t-3xl items-center justify-center ">
        <Text className="text-gray-700 text-base">Have a budget in mind?</Text>
        <TouchableOpacity
          className="bg-tintLight py-3 px-6 w-[60%] rounded-lg shadow-md"
          onPress={handleContinue}
        >
          <Text className="text-white font-outfitBold text-lg text-center">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Budget;
