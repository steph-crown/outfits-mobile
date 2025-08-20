import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { BrandColors } from "@/constants/Colors";
import { OutFitsLogo } from "./OutFitsLogo";
import { ThemedText } from "./ThemedText";

interface SplashScreenProps {
  onFinish?: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Start entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <OutFitsLogo
            size={160}
            textColor={BrandColors.primaryWhite}
            shirtColor={BrandColors.primary}
            backgroundColor={BrandColors.primaryWhite}
          />
        </Animated.View>

        <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
          <ThemedText type="body" style={styles.taglineText}>
            Outfits is your personal outfit inspiration library -{"\n"}
            save looks from TikTok, Instagram, and your camera{"\n"}
            roll all in one place.
          </ThemedText>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textContainer: {
    position: "absolute",
    bottom: 64,
    flex: 1,
    width: "100%",
  },
  taglineText: {
    color: BrandColors.primaryWhite,
    textAlign: "center",
    lineHeight: 16,
    fontSize: 12,
  },
});
