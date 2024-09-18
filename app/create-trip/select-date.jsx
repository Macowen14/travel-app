import React, { useState, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  TextInput,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useNavigation } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { CreateTripContext } from "../../context/CreateTripContext";

const SelectDate = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation();
  const { tripData, updateTripData } = useContext(CreateTripContext);

  const [days, setDays] = useState(1);
  const [nights, setNights] = useState(1);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios"); // Keep the picker open on iOS, close on Android
    setDate(currentDate);
  };

  const handleSetDate = () => {
    updateTripData({
      date: dayjs(date).format("YYYY-MM-DD"),
      days: parseInt(days, 10),
      nights: parseInt(nights, 10),
    });
    setTimeout(() => {
      console.log("Updated Trip Data:", tripData);
    }, 0);

    router.push("/create-trip/select-budget");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.headerText}>Select the Start Travel Date</Text>
      </View>

      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.dateText}>
          {dayjs(date).format("dddd, MMMM D, YYYY")}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <View style={styles.inputGroup} clasName="gap-5">
        <View clasName="flex-col items-center">
          <Text style={styles.label}>Days</Text>
          <TextInput
            placeholder="Enter days"
            keyboardType="numeric"
            placeholderTextColor={"gray"}
            style={styles.input}
            onChangeText={(text) => setDays(text)}
            value={days.toString()}
          />
        </View>
        <View clasName="flex-col">
          <Text style={styles.label}>Nights</Text>
          <TextInput
            placeholder="Enter nights"
            keyboardType="numeric"
            placeholderTextColor={"gray"}
            style={styles.input}
            onChangeText={(text) => setNights(text)}
            value={nights.toString()}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.setDateButton} onPress={handleSetDate}>
        <Text style={styles.setDateButtonText}>
          Set Start Date, Days, and Nights
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1e3a5f",
    paddingTop: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 8,
    backgroundColor: "#009688",
    borderRadius: 50,
  },
  header: {
    marginTop: 80,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "outfitBold",
    textAlign: "center",
    textAlign: "center",
  },
  datePickerButton: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginVertical: 20,
  },
  dateText: {
    color: "#1e3a5f",
    fontSize: 18,
    fontFamily: "outfitBold",
  },
  inputGroup: {
    width: "80%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "outfitMedium",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    fontSize: 16,
    width: "70%",
    textAlign: "center",
    fontFamily: "outfitMedium",
    color: "#1e3a5f",
  },
  setDateButton: {
    backgroundColor: "#009688",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
  },
  setDateButtonText: {
    color: "#fff",
    fontFamily: "outfitBold",
    fontSize: 18,
  },
});

export default SelectDate;
