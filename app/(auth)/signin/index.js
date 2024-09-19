import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { signInWithEmail } from "../../../services/auth";
import { useGoogleAuth } from "../../../services/auth"; // Import the useGoogleAuth hook

const Signin = () => {
  const navigation = useNavigation();
  const route = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { promptAsync } = useGoogleAuth(); // Use the custom hook for Google Sign-In
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [validating, setValidating] = useState(false);

  // Function to handle sign-in with email and password
  const handleSignIn = async () => {
    if (!email || !password) {
      ToastAndroid.show("Please fill in all fields", ToastAndroid.TOP);
    } else {
      try {
        setValidating(true); // Set loading state to true
        const user = await signInWithEmail(email, password);
        console.log(user);
        route.navigate("/mytrip");
        setValidating(false); // Reset loading state
      } catch (error) {
        setValidating(false); // Reset loading state
        ToastAndroid.show(error.message, ToastAndroid.SHORT); // Show error message
        console.log(error.code, error.message);
      }
    }
  };

  // Hide the header when the screen is mounted
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            className={`mt-10 px-4 ${isKeyboardVisible ? "mb-6" : "mb-16"}`}
          >
            <Text
              className="font-bold text-center"
              style={{ fontFamily: "outfitBold", fontSize: 30 }}
            >
              Let's Sign You In
            </Text>
            <Text
              className="font-bold text-center text-slate-500 mt-4"
              style={{ fontFamily: "outfitMedium", fontSize: 20 }}
            >
              Welcome Back
            </Text>
            <Text
              className="font-bold text-center text-slate-500"
              style={{ fontFamily: "outfitRegular", fontSize: 20 }}
            >
              You've been missed
            </Text>
          </View>

          {validating && <ActivityIndicator size={"large"} />}

          <View className="space-y-6 px-4">
            <View>
              <Text
                className="font-bold mb-2"
                style={{ fontFamily: "outfitRegular", fontSize: 16 }}
              >
                Email
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3"
                placeholder="Enter your email"
                keyboardType="email-address"
                style={{ fontFamily: "outfitRegular" }}
                onChangeText={(text) => setEmail(text)}
                value={email}
                editable={!validating} // Disable input while validating
              />
            </View>

            <View>
              <Text
                className="font-bold mb-2"
                style={{ fontFamily: "outfitRegular", fontSize: 16 }}
              >
                Password
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3"
                placeholder="Enter your password"
                secureTextEntry
                style={{ fontFamily: "outfitRegular" }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                editable={!validating} // Disable input while validating
              />
            </View>

            {/* Sign-In Button */}
            <TouchableOpacity
              className={`bg-blue-600 rounded-lg py-4 mt-10 items-center ${
                validating ? "opacity-50" : ""
              }`}
              onPress={handleSignIn}
              disabled={validating} // Disable button while validating
            >
              {validating ? (
                <ActivityIndicator color="#ffffff" /> // Show loading spinner
              ) : (
                <Text
                  className="text-white font-bold"
                  style={{ fontFamily: "outfitBold", fontSize: 18 }}
                >
                  Sign In
                </Text>
              )}
            </TouchableOpacity>

            {/* Google Sign-In Button */}
            <TouchableOpacity
              className={`bg-red-600 rounded-lg py-4 mt-4 items-center ${
                validating ? "opacity-50" : ""
              }`}
              onPress={() => promptAsync()}
              disabled={validating} // Disable button while validating
            >
              <Text
                className="text-white font-bold"
                style={{ fontFamily: "outfitBold", fontSize: 18 }}
              >
                Sign in with Google
              </Text>
            </TouchableOpacity>

            {/* Forgot Password Link */}
            <TouchableOpacity
              className="items-center mt-4"
              onPress={() => {
                route.push("/(auth)/forgotPassword");
              }}
              disabled={validating} // Disable button while validating
            >
              <Text
                className="text-blue-600 font-bold"
                style={{ fontFamily: "outfitRegular", fontSize: 16 }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {!isKeyboardVisible && (
            <View className="w-full items-center mb-4 px-4">
              <View className="flex flex-row items-center">
                <Text
                  className="text-gray-500 font-bold"
                  style={{ fontFamily: "outfitRegular", fontSize: 16 }}
                >
                  Don't have an account?
                </Text>
                <TouchableOpacity
                  className="ml-2"
                  onPress={() => {
                    route.push("/(auth)/signup");
                  }}
                  disabled={validating} // Disable button while validating
                >
                  <Text
                    className="text-blue-600 font-bold"
                    style={{ fontFamily: "outfitBold", fontSize: 16 }}
                  >
                    Create Account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signin;
