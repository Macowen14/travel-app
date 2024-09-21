import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import dayjs from "dayjs";
import { router } from "expo-router";
import { place1 } from "../assets/images";
import { CreateTripContext } from "../context/CreateTripContext";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../configs/firebase";

const UserTripList = () => {
  const { tripData, setTripData } = useContext(CreateTripContext);

  // Function to delete a trip
  const deleteTrip = async (index) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      // Remove the trip from the local state
      const updatedTrips = tripData.filter((_, i) => i !== index);
      setTripData(updatedTrips);

      // Update Firestore with the new trip list
      const userRef = doc(db, "UsersTrips", userId);
      await updateDoc(userRef, { trips: updatedTrips });

      console.log("Trip successfully deleted");
    } catch (err) {
      console.error("Error deleting trip:", err);
      Alert.alert("Error deleting trip", err.message);
    }
  };

  // Function to show a confirmation alert before deleting a trip
  const confirmDelete = (index) => {
    Alert.alert(
      "Delete Trip",
      "Are you sure you want to delete this trip? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => deleteTrip(index),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

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

        {tripData?.map((trip, index) => (
          <>
            <View
              key={index}
              className="mt-2 flex justify-between flex-row bg-gray-50 shadow-md rounded-md space-x-1 py-3 p-1"
            >
              <View className="space-y-2 mr-2">
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
                  Duration: {trip?.travelPlan?.trip_details?.duration || "N/A"}
                </Text>
                <Text className="text-sm">
                  Travelers:{" "}
                  {trip?.travelPlan?.trip_details?.travelers || "N/A"}
                </Text>
                <Text className="text-sm">
                  Budget: {trip?.travelPlan?.trip_details?.budget || "N/A"}
                </Text>
              </View>

              {/* Delete Button */}
            </View>
            <View className="flex space-x-3 items-center mt-1 flex-row w-full">
              <TouchableOpacity
                className="bg-red-500 px-3 py-3 rounded-md min-w-24  items-center flex justify-center flex-1"
                onPress={() => confirmDelete(index)}
              >
                <Text className="text-white font-outfitBold text-sm">
                  Delete
                </Text>
              </TouchableOpacity>

              {/* Button to view more details */}
              <TouchableOpacity
                className="items-center bg-background max-w-[70%] py-3 rounded-xl flex-1"
                onPress={() =>
                  router.push({
                    pathname: "/discover",
                    params: { index: index },
                  })
                }
              >
                <Text className="text-white font-outfitBold text-sm">
                  View Trip
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ))}
      </View>
    </ScrollView>
  );
};

export default UserTripList;

const styles = StyleSheet.create({});
