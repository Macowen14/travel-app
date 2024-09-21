import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, useRouter } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import { CreateTripContext } from "../../context/CreateTripContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const ReviewTrip = () => {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();
  console.log(tripData);

  const handleReturnHome = () => {
    console.log("home button clicked");
    Alert.alert(
      "Return Home",
      "Are you sure you want to return home?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            router.push("/(tabs)/mytrip");
            console.log("returned to home");
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (!tripData || tripData.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 pt-4">
        <TouchableOpacity
          className="p-3 rounded-full absolute top-8 left-5 bg-teal-500"
          onPress={() => navigation.goBack()}
        >
          <Entypo name="home" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-3 rounded-full absolute top-8 right-4 bg-teal-500"
          onPress={handleReturnHome}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text className="mt-10 font-bold text-center text-3xl text-teal-600">
          Review Your Trip
        </Text>
        <Text className="text-gray-600 text-center mt-2 mx-8 font-medium">
          No trip data available.
        </Text>
      </SafeAreaView>
    );
  }

  const location = tripData[0];
  const travelPlan = tripData[1]?.travelPlan;
  const dateData = tripData[2];
  const budget = tripData[3]?.budget;

  return (
    <SafeAreaView className="flex-1 bg-gray-100 pt-4">
      <TouchableOpacity
        className="p-2 rounded-full absolute top-8 left-5 bg-teal-500"
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        className="p-3 rounded-full absolute top-8 right-4 bg-teal-500"
        onPress={handleReturnHome}
      >
        <Entypo name="home" size={24} color="white" />
      </TouchableOpacity>
      <Text className="mt-10 font-bold text-center text-3xl text-teal-600">
        Review Your Trip
      </Text>
      <Text className="text-gray-600 text-center mt-2 mx-8 font-medium">
        Ensure the trip data is correct so that it can be saved and we can plan
        your trip.
      </Text>

      <ScrollView className="mt-8 px-4" showsVerticalScrollIndicator={true}>
        <View className="flex flex-row items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-lg">
          <Entypo name="location-pin" size={36} color="teal" />
          <View className="flex-1 ml-4">
            <Text className="font-semibold text-xl text-teal-600">
              Travel Location
            </Text>
            <Text className="text-gray-700 font-medium text-lg">
              {location?.name || "No location data"}
            </Text>
          </View>
        </View>

        <View className="mb-6 bg-white p-4 rounded-lg shadow-lg flex flex-row">
          <View className="flex flex-row items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-lg">
            <FontAwesome5 name="money-check-alt" size={24} color="teal" />
          </View>
          <View className="flex-col ml-2">
            <Text className="font-semibold text-xl text-teal-600">Budget</Text>
            <Text className="text-gray-700 font-medium text-lg">
              {budget?.amount || "No budget data"}
            </Text>
            <Text className="text-gray-600 font-medium">
              {budget?.desc || "No budget description"}
            </Text>
          </View>
        </View>

        <View className="mb-6 bg-white p-4 rounded-lg shadow-lg flex flex-row">
          <View className="flex flex-row items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-lg">
            <FontAwesome name="calendar" size={24} color="teal" />
          </View>
          <View className="flex-col ml-3">
            <Text className="font-semibold text-xl text-teal-600">
              Start date
            </Text>
            <Text className="text-gray-700 font-medium text-lg">
              {dateData?.date || "No date data"}
            </Text>
          </View>
        </View>

        <View className="mb-6 bg-white p-4 rounded-lg shadow-lg flex-row">
          <View className="flex flex-row items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-lg">
            <FontAwesome6 name="users" size={24} color="teal" />
          </View>
          <View className="flex-col ml-3">
            <Text className="font-semibold text-xl text-teal-600">
              Travel Plan
            </Text>
            <Text className="text-gray-700 font-medium text-lg">
              {travelPlan?.title || "No travel plan title"}
            </Text>
          </View>
        </View>

        <Text className="text-gray-600 font-medium">
          Estimated Duration: {travelPlan?.estimate || "No estimate"} days and{" "}
          {dateData?.days || "No days"} days, {dateData?.nights || "No nights"}{" "}
          nights
        </Text>
      </ScrollView>

      <View className="items-center py-3 rounded-t-3xl">
        <TouchableOpacity
          className="bg-teal-500 py-4 shadow-md text-white text-center font-bold w-[70vw] rounded-xl items-center"
          onPress={() => router.push("/create-trip/generateTrip")}
        >
          <Text className="text-white text-center text-lg font-bold">
            Generate Trip
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReviewTrip;
