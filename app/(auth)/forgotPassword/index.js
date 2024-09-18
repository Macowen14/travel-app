import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordPage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      {/* Arrow Back Button */}
      <View className="absolute top-10 left-6 z-10">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-3xl font-extrabold text-gray-900 mb-6">
          Reset Your Password
        </Text>
        <View className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
          <TextInput
            className="border border-gray-300 rounded-lg p-4 mb-6 text-gray-800 bg-gray-50"
            placeholder="Enter your email"
            placeholderTextColor="#6B7280"
            keyboardType="email-address"
          />
          <TouchableOpacity className="bg-blue-600 py-4 rounded-lg shadow-md">
            <Text className="text-white text-center text-lg font-bold">
              Send Reset Link
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordPage;
