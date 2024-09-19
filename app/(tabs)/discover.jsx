import {
  Image,
  ScrollView,
  Text,
  View,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useContext } from "react";
import dayjs from "dayjs";
import { place1 } from "../../assets/images/index";
import { CreateTripContext } from "../../context/CreateTripContext";
import { router } from "expo-router";

const Discover = () => {
  const { userData } = useContext(CreateTripContext);
  const trips = userData?.trips;
  console.log("trips", trips);
  const trip = trips?.[0]?.travelPlan;

  if (!trip || !trips) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <StatusBar barStyle={"dark-content"} />
        <Text className="text-lg font-bold mb-4">No trips available</Text>
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-md"
          onPress={() => router.push("/mytrip")}
        >
          <Text className="text-white">Go to My Trip</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle={"dark-content"} />

      {/* Image Background */}
      <View className="relative h-[40vh] w-full">
        <Image source={place1} className="w-full h-full object-cover" />
      </View>

      {/* ScrollView with Content */}
      <ScrollView
        style={{
          marginTop: -40, // Adjust this based on your image height
          backgroundColor: "white",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="p-4 flex items-center space-y-5">
          {/* Trip Details */}
          <View className="mt-2 flex flex-row justify-between bg-gray-50 p-4 shadow-md rounded-md items-center space-x-5 w-full">
            <View className="flex-1">
              <Text className="font-outfitMedium text-lg">
                {trip?.trip_details?.destination}
              </Text>
              <Text className="text-sm text-gray-600">
                Start date:{" "}
                {dayjs(trip?.trip_details?.start_date).format("DD/MM/YYYY")}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm">{trip?.trip_details?.duration}</Text>
              <Text className="text-sm">{trip?.trip_details?.travelers}</Text>
              <Text className="text-sm">{trip?.trip_details?.budget}</Text>
            </View>
          </View>

          {/* Transportation Section */}
          <View className="bg-white p-4 mt-1 shadow-md rounded-md space-y-3 w-full">
            <Text className="font-outfitBold text-lg">Transportation</Text>
            {Object.keys(trip?.transportation).map((type) => (
              <View key={type} className="space-y-2">
                <Text className="font-outfitMedium capitalize">{type}</Text>
                {Object.values(trip?.transportation[type]).map(
                  (option, index) => (
                    <View
                      key={index}
                      className="bg-gray-100 p-3 rounded-md space-y-1"
                    >
                      <Text className="text-sm">
                        Airline/Company: {option.airline || option.bus_company}
                      </Text>
                      <Text className="text-sm">Route: {option.route}</Text>
                      <Text className="text-sm">Price: {option.price}</Text>
                      <TouchableOpacity
                        onPress={() => Linking.openURL(option.booking_link)}
                      >
                        <Text className="text-blue-500 underline">
                          Book Now
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
                )}
              </View>
            ))}
          </View>

          {/* Accommodation Section */}
          <View className="bg-white p-4 mt-3 shadow-md rounded-md space-y-3 w-full">
            <Text className="font-outfitBold text-lg">Accommodation</Text>
            {trip.accommodation.hotel_options.map((hotel, index) => (
              <View
                key={index}
                className="bg-gray-100 p-3 rounded-md space-y-1"
              >
                <Text className="font-outfitMedium">{hotel.name}</Text>
                <Text className="text-sm">Price: {hotel.price}</Text>
                <Text className="text-sm">Address: {hotel.address}</Text>
                <Text className="text-sm">Rating: {hotel.rating}</Text>
                <Text className="text-sm">Nearby: {hotel.nearby_places}</Text>
              </View>
            ))}
          </View>

          {/* Attractions Section */}
          <View className="bg-white p-4 mt-3 shadow-md rounded-md space-y-3 w-full">
            <Text className="font-outfitBold text-lg">Attractions</Text>
            {trip.attractions.map((attraction, index) => (
              <View
                key={index}
                className="bg-gray-100 p-3 rounded-md space-y-2"
              >
                <Text className="font-outfitMedium">{attraction.name}</Text>
                <Text className="text-sm">
                  Description: {attraction.description}
                </Text>
                <Text className="text-sm">
                  Ticket Price: {attraction.ticket_price}
                </Text>
                <Text className="text-sm">
                  Best Time to Visit: {attraction.best_time_to_visit}
                </Text>
                <Image
                  source={{ uri: attraction.image_url }}
                  className="w-full h-[200px] rounded-md mt-2"
                  resizeMode="cover"
                />
              </View>
            ))}
          </View>

          {/* Daily Schedule Section */}
          <View className="bg-white p-4 mt-3 shadow-md rounded-md space-y-3 w-full">
            <Text className="font-outfitBold text-lg">Daily Schedule</Text>
            {trip.daily_schedule.map((day, index) => (
              <View
                key={index}
                className="bg-gray-100 p-3 rounded-md space-y-2"
              >
                <Text className="font-outfitMedium">{day.day}</Text>
                {day.activities.map((activity, idx) => (
                  <View key={idx} className="bg-gray-200 p-2 rounded-md">
                    <Text className="text-sm">{activity.time}</Text>
                    <Text className="text-sm">{activity.activity}</Text>
                    <Text className="text-sm">
                      Estimated Travel Time: {activity.estimated_travel_time}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Discover;
