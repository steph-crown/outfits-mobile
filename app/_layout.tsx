import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-reanimated";
import { Toaster } from "sonner-native";
import { LogBox } from "react-native";

import { SplashScreen } from "@/components/SplashScreen";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { BrandColors } from "@/constants/Colors";
import { BottomSheetProvider } from "@/contexts/BottomSheetContext";

// Disable LogBox warnings and error overlays
LogBox.ignoreAllLogs();

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Mona-Sans-Regular": require("../assets/fonts/Mona-Sans-Regular.ttf"),
    "Mona-Sans-Medium": require("../assets/fonts/Mona-Sans-Medium.ttf"),
    "Mona-Sans-SemiBold": require("../assets/fonts/Mona-Sans-SemiBold.ttf"),
    "Mona-Sans-Bold": require("../assets/fonts/Mona-Sans-Bold.ttf"),
    "Hellix-Bold": require("../assets/fonts/Hellix-Bold.ttf"),
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <SafeAreaProvider>
          <BottomSheetProvider>
            <ThemeProvider value={DefaultTheme}>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                  name="onboarding"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="signup" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="outfit-detail"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="gallery-picker"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="create-outfit"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="outfit-saved"
                  options={{ headerShown: false }}
                />

                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="dark" />
              <Toaster
                position="top-center"
                theme="light"
                richColors
                closeButton
                style={{
                  backgroundColor: BrandColors.white,
                }}
              />
            </ThemeProvider>
          </BottomSheetProvider>
        </SafeAreaProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}
