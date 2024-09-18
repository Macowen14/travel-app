import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import { ContextProvider } from "../context/CreateTripContext";
import LottieView from "lottie-react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    outfitBold: require("../assets/fonts/Outfit-Bold.ttf"),
    outfitLight: require("../assets/fonts/Outfit-Light.ttf"),
    outfitMedium: require("../assets/fonts/Outfit-Medium.ttf"),
    outfitRegular: require("../assets/fonts/Outfit-Regular.ttf"),
    outfitThin: require("../assets/fonts/Outfit-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <LottieView
          source={require("../assets/animation/loading.json")}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    );
  }

  return (
    <ContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 150,
    height: 150,
  },
});
