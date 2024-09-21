import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Modal,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { CreateTripContext } from "../../context/CreateTripContext";
import UserTripList from "../../components/UserTripList";
import StartTripCard from "../../components/StartTripCard";
import * as Location from "expo-location";

const MyTrip = () => {
  const { userData, setTripData } = useContext(CreateTripContext);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          // Permission denied, ask the user to provide permission for better experience
          setLocationModalVisible(true);
          return;
        }

        // Permission granted, fetching the location
        let location = await Location.getCurrentPositionAsync({});
        setTripData((prevData) => ({
          ...prevData,
          location: {
            name: "User's Location", // You can further enhance this to get actual location details
            coords: location.coords,
          },
        }));
        setErrorMsg(null); // Reset error message if location fetched successfully
      } catch (error) {
        setErrorMsg("Failed to fetch location. Please try again.");
        Alert.alert(
          "Location Error",
          "There was an issue fetching your location. Please try again later."
        );
      }
    };

    fetchUserLocation();
  }, []);

  const handlePermissionRetry = async () => {
    setLocationModalVisible(false);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({});
      setTripData((prevData) => ({
        ...prevData,
        location: {
          name: "User's Location",
          coords: location.coords,
        },
      }));
      setErrorMsg(null);
    } else {
      setErrorMsg("Permission still denied. Location services will not work.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.headerContainer}>
        <Text style={styles.title}>My Trips</Text>
        <TouchableOpacity
          onPress={() => router.push("/create-trip/search-place")}
        >
          <AntDesign name="pluscircle" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {!userData ||
      !Array.isArray(userData.trips) ||
      userData.trips.length === 0 ? (
        <StartTripCard />
      ) : (
        <UserTripList />
      )}

      {/* Error message display */}
      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

      {/* Modal to prompt the user for location permission */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={locationModalVisible}
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Enable Location Services</Text>
          <Text style={styles.modalMessage}>
            We recommend enabling location services for a better experience.
            Would you like to enable it?
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setLocationModalVisible(false)}
            >
              <Text style={styles.buttonText}>No, thanks</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handlePermissionRetry}
            >
              <Text style={styles.buttonText}>Enable</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#fff",
    paddingHorizontal: 8,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingBottom: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#fff",
  },
  modalMessage: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  button: {
    backgroundColor: "teal",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default MyTrip;
