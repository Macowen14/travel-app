import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

const BudgetCard = ({ item, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      className={`w-11/12 mb-5 p-5 flex-row items-center rounded-lg shadow-md ${
        isSelected ? "bg-[#00796B]" : "bg-slate-600"
      }`}
      onPress={onPress}
    >
      {/* Image Section */}
      <Image
        source={item.image}
        className="w-10 h-10 rounded-full mr-4"
        resizeMode="cover"
      />

      <View>
        <Text className="text-white font-outfitBold text-xl mb-1">
          {item.title}
        </Text>
        <Text className="text-white font-outfitRegular text-base">
          {item.desc}
        </Text>
      </View>

      {isSelected && (
        <AntDesign
          name="checkcircle"
          size={24}
          color="white"
          className="ml-auto"
        />
      )}
    </TouchableOpacity>
  );
};

export default BudgetCard;
