import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Welcome from "../components/Welcome";
import { auth } from "../configs/firebase";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";

export default function Index() {
  const [loading, setLoading] = useState(true); // State to manage loading
  const router = useRouter();

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Navigate to '/mytrip' if user is authenticated
        router.push("/mytrip");
      } else {
        // Set loading to false if no user
        setLoading(false);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    console.log("loading to check authentication");
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text className="text-slate-500 text-center font-outfitRegular">
          Loading auth status ....
        </Text>
        <LottieView
          source={require("../assets/animation/loading.json")}
          autoPlay
          loop
          style={{ width: 150, height: 150 }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Welcome />
    </View>
  );
}
