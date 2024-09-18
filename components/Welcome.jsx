import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const travelImg = require("../assets/images/travel.jpg");

const Welcome = () => {
  const route = useRouter();
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={travelImg}
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        <View className="bg-white h-[40vh] rounded-t-3xl w-full pt-5 items-center flex flex-col justify-evenly">
          <Text
            className="text-3xl font-extrabold text-center"
            style={{ fontFamily: "outfitBold" }}
          >
            AI Travel Planner
          </Text>
          <Text
            className="text-slate-700 text-center text-medium"
            style={{ fontFamily: "outfitRegular" }}
          >
            Discover your next adventure with our intelligent travel planner.
            Whether you're dreaming of a tranquil beach getaway, a bustling city
            escape, or a thrilling outdoor expedition, our AI tailors every
            detail to your preferences.
          </Text>
          <TouchableOpacity
            className="bg-background rounded-3xl min-w-[300px] py-3 items-center"
            onPress={() => route.push("/(auth)/signin")}
          >
            <Text className="text-white font-bold text-lg">Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Welcome;
