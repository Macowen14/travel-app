import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";

const TravelPlanCard = ({ item, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={() => onPress(item)}
    >
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.desc}</Text>
        <Text style={styles.estimate}>
          Estimate ( <Text style={styles.people}>{item.people}</Text>) people
        </Text>
      </View>
      <Image source={item.image} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardSelected: {
    borderColor: "#009688",
    borderWidth: 2,
    backgroundColor: "#e0f2f1",
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontFamily: "outfitBold",
    fontSize: 16,
    color: "#333",
  },
  description: {
    fontFamily: "outfitRegular",
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  estimate: {
    fontFamily: "outfitRegular",
    fontSize: 14,
    color: "#333",
    marginTop: 8,
  },
  people: {
    fontWeight: "bold",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 12,
  },
});

export default TravelPlanCard;
