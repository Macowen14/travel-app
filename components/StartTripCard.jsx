import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";

const StartTripCard = () => {
  const router = useRouter();
  return (
    <View className="p-6 flex items-center bg-gray-100 rounded-lg shadow-md space-y-5">
      <Entypo name="location-pin" size={40} color="gray" className="mb-4" />
      <Text className="font-outfitMedium text-2xl text-gray-800 mb-2">
        No trips planned yet
      </Text>
      <Text className="font-outfitRegular text-gray-500 text-center mb-4">
        Embark on your next adventure with personalized AI-powered planning!
      </Text>
      <TouchableOpacity
        className="bg-blue-600 py-3 px-6 rounded-lg shadow-md"
        onPress={() => router.push("/create-trip/search-place")}
      >
        <Text className="font-outfitBold text-xl text-white">
          Create a trip now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartTripCard;
