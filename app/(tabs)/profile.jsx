import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { CreateTripContext } from "../../context/CreateTripContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../../configs/firebase";

const Profile = () => {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState(
    userData?.avatar || null
  );
  const { userData, updateUserDetails, setUserData, setTripData } =
    useContext(CreateTripContext);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 9000); // 5 minutes

    if (userData) {
      setEmail(userData.email || "");
      setFullName(userData.fullName || "");
      setUsername(userData.displayName || "");
      if (userData.avatar) {
        setSelectedAvatar(userData.avatar);
      }
      clearTimeout(timer); // Clear timeout if userData is available
      setLoading(false);
    }

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [userData]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedAvatar(result.uri);
    }
  };

  const setAvatar = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const saveProfile = async () => {
    try {
      setUpdating(true);
      await updateUserDetails({
        username,
        avatar: selectedAvatar,
        fullName,
        email,
      });
      Alert.alert(
        "Profile Saved",
        "Your profile has been updated successfully."
      );
    } catch (err) {
      Alert.alert("Error: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    console.log("sign out function");

    console.log("going to sign out");
    // Sign out the user
    await signOut(auth);
    console.log("User signed out successfully");

    // Clear the context after sign out
    setUserData(""); // Clear user data
    setTripData([]); // Clear trip data

    // Redirect to the sign-in page
    router.push("/(auth)/signin");

    console.error("Error signing out:", error);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-4 text-lg">Loading profile...</Text>
      </SafeAreaView>
    );
  }

  if (!userData) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-lg">
          No user data found. Please try again later.
        </Text>
        <TouchableOpacity
          className="mt-6 bg-red-600 py-2 px-4 rounded-lg flex-row items-center"
          onPress={async () => {
            try {
              await handleSignOut(); // Await the sign-out function to handle promises
            } catch (error) {
              console.error("Error during sign-out:", error);
            }
          }}
        >
          <MaterialIcons name="delete-forever" size={24} color="white" />
          <Text className="text-white font-bold ml-1">Signout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 pt-10 items-center">
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ width: "100%" }}
      >
        <Text className="font-outfitBold text-xl text-center mb-4">
          Hello {username || "user"}, welcome to your profile
        </Text>

        <View className="items-center mt-4">
          <Image
            source={require("../../assets/images/man.png")}
            style={{ height: 190, width: 190, borderRadius: 96 }}
          />

          <View className="mt-4 space-y-4">
            <TextInput
              placeholder="Enter your username"
              value={username}
              className="border border-gray-300 rounded-lg px-4 py-2 w-72"
              onChangeText={setUsername}
            />
            <TextInput
              placeholder="Enter your email"
              value={email}
              className="border border-gray-300 rounded-lg px-4 py-2 w-72"
              onChangeText={setEmail}
            />
            <Text className="text-slate-500 text-xs mt-4">
              Full name is read-only
            </Text>
            <TextInput
              placeholder="Enter your full name"
              value={fullName}
              editable={false}
              className="border border-gray-300 rounded-lg px-4 py-2 w-72 mt-0"
            />
          </View>

          <TouchableOpacity
            className="mt-6 bg-blue-600 py-2 px-4 rounded-lg"
            onPress={pickImage}
          >
            <Text className="text-white font-bold">Upload New Image</Text>
          </TouchableOpacity>

          <View className="flex-row mt-6 space-x-4">
            <TouchableOpacity
              onPress={() =>
                setAvatar(require("../../assets/images/woman.png"))
              }
            >
              <Image
                source={require("../../assets/images/woman.png")}
                style={{ height: 80, width: 80, borderRadius: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAvatar(require("../../assets/images/boy.png"))}
            >
              <Image
                source={require("../../assets/images/boy.png")}
                style={{ height: 80, width: 80, borderRadius: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAvatar(require("../../assets/images/girl.png"))}
            >
              <Image
                source={require("../../assets/images/girl.png")}
                style={{ height: 80, width: 80, borderRadius: 40 }}
              />
            </TouchableOpacity>
          </View>
          <View className="flex justify-between flex-row space-x-2">
            <TouchableOpacity
              className="mt-6 bg-green-600 py-2 px-4 rounded-lg flex-row items-center"
              onPress={saveProfile}
              disabled={updating}
            >
              <MaterialIcons name="save" size={24} color="white" />
              <Text className="text-white font-bold ml-1">Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-6 bg-red-600 py-2 px-4 rounded-lg flex-row items-center"
              onPress={async () => {
                try {
                  await handleSignOut(); // Await the sign-out function to handle promises
                } catch (error) {
                  console.error("Error during sign-out:", error);
                }
              }}
              disabled={updating}
            >
              <MaterialIcons name="delete-forever" size={24} color="white" />
              <Text className="text-white font-bold ml-1">Signout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
