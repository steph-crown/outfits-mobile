import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-reanimated";

import { SplashScreen } from "@/components/SplashScreen";

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Mona-Sans-Regular": require("../assets/fonts/Mona-Sans-Regular.ttf"),
    "Mona-Sans-Medium": require("../assets/fonts/Mona-Sans-Medium.ttf"),
    "Mona-Sans-SemiBold": require("../assets/fonts/Mona-Sans-SemiBold.ttf"),
    "Mona-Sans-Bold": require("../assets/fonts/Mona-Sans-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      // Auto hide splash after fonts are loaded and a short delay
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [loaded]);

  // Show splash screen while fonts are loading or during splash duration
  if (!loaded || showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="dark" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
