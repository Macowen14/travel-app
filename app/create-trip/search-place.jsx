import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
} from "react-native";
import { CreateTripContext } from "../../context/CreateTripContext";
import { useNavigation, useRouter } from "expo-router";

// Mapbox API key
const MAP_API_KEY = process.env.EXPO_PUBLIC_MAPBOX_API_KEY;

const SearchPlace = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Search Place",
      headerTransparent: false,
      headerStyle: {
        backgroundColor: "transparent",
        height: 70,
        borderBottomWidth: 0,
      },
      headerTitleAlign: "center",
    });
  }, [navigation]);

  const fetchAutocompleteSuggestions = async (query) => {
    if (!query) return;

    console.log("Fetching suggestions for:", query);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query
    )}.json`;
    const params = {
      access_token: MAP_API_KEY,
      autocomplete: "true",
      types: "place,postcode,address",
      limit: "5",
    };

    try {
      const response = await fetch(`${url}?${new URLSearchParams(params)}`);

      if (!response.ok) {
        console.log(`Error: ${response.status} ${response.statusText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      // Ensure we get an array or default to an empty array
      const places =
        data.features?.map((feature) => ({
          id: feature.id,
          name: feature.place_name,
          geometry: feature.geometry,
        })) || [];

      setSuggestions(places);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      Alert.alert(
        "Error",
        "Failed to fetch suggestions. Please check your network connection."
      );
      setSuggestions([]);
    }
  };

  const handleSelectPlace = (place) => {
    console.log("Selected place:", place);

    // Check if place and its properties are defined
    if (
      !place ||
      !place.id ||
      !place.name ||
      !place.geometry ||
      !place.geometry.coordinates
    ) {
      console.error("Invalid place data:", place);
      return;
    }

    // Add the selected place to the trips array, ensuring tripData is an array
    setTripData((prevData) => [
      ...(Array.isArray(prevData) ? prevData : []),
      {
        id: place.id,
        name: place.name,
        coordinates: place.geometry.coordinates,
      },
    ]);

    // Navigate to the next screen
    router.push("/create-trip/select-travelers");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            fetchAutocompleteSuggestions(text);
          }}
          style={styles.textInput}
        />

        {query.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectPlace(item)}>
                <View style={styles.suggestionItem}>
                  <Text style={styles.suggestionText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            style={styles.suggestionsList}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  searchContainer: {
    flex: 1,
    marginTop: 20,
    position: "relative",
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
    fontSize: 16,
    width: "100%",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  suggestionsList: {
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    maxHeight: 250,
    marginBottom: 20,
  },
  suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  suggestionText: {
    fontSize: 16,
  },
});

export default SearchPlace;
