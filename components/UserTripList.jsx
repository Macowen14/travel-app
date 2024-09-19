import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import dayjs from "dayjs";
import { router } from "expo-router";
import { place1 } from "../assets/images";
import { useContext } from "react";
import { CreateTripContext } from "../context/CreateTripContext";

const UserTripList = () => {
  const { tripData, userData } = useContext(CreateTripContext);

  // Debugging: Console log the entire trip details to inspect the structure
  console.log("Full trip details:", tripData);

  return (
    <ScrollView horizontal={false} scrollEnabled={true} className="space-y-2">
      <View className="p-2 flex items-center space-y-5 rounded-xl shadow">
        <Text className="text-sm font-outfitMedium text-slate-500">
          Your trip details and options are generated below
        </Text>

        <Image
          source={place1}
          className="w-full object-contain rounded-md h-[31vh]"
        />

        {userData?.trips?.map((trip, index) => (
          <View
            key={index}
            className="mt-2 flex justify-between flex-row bg-gray-50 shadow-md rounded-md space-x-10 py-3 p-1"
          >
            <View className="space-y-2">
              <Text className="font-outfitMedium text-lg">
                {trip?.travelPlan?.trip_details?.destination ||
                  "Unknown Destination"}
              </Text>
              <Text>
                Start date:{" "}
                {dayjs(trip?.travelPlan?.trip_details?.start_date).format(
                  "DD/MM/YYYY"
                )}
              </Text>
            </View>
            <View className="space-y-1">
              <Text className="text-sm">
                {trip?.travelPlan?.trip_details?.duration || "N/A"}
              </Text>
              <Text className="text-sm">
                {trip?.travelPlan?.trip_details?.travelers || "N/A"}
              </Text>
              <Text className="text-sm">
                {trip?.travelPlan?.trip_details?.budget || "N/A"}
              </Text>
            </View>
          </View>
        ))}

        {/* Button to view more details */}
        <TouchableOpacity
          className="items-center bg-background w-[70%] py-3 rounded-xl"
          onPress={() => router.push("/discover")}
        >
          <Text className="text-white font-outfitBold text-lg">View Trip</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserTripList;

const styles = StyleSheet.create({});
