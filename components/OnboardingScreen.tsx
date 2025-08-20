import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BrandColors } from "@/constants/Colors";
import { Fonts, FontStyles } from "@/constants/Fonts";
import { FireIcon, EyeIcon } from "@/components/icons";
import { Button } from "@/components/ui";

const { width, height } = Dimensions.get("window");

interface OnboardingScreenProps {
  onGetStarted: () => void;
  onSeeHowItWorks: () => void;
}

export function OnboardingScreen({
  onGetStarted,
  onSeeHowItWorks,
}: OnboardingScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View
        style={[styles.content, { paddingBottom: Math.max(insets.bottom, 24) }]}
      >
        {/* Header Text */}
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome to Outfits</Text>

          <Text style={styles.mainHeading}>
            Organize your{"\n"}outfit inspiration{"\n"}effortlessly
          </Text>
        </View>

        {/* Onboarding Image */}
        <Image
          source={require("@/assets/images/onboarding-image.png")}
          style={styles.onboardingImage}
          resizeMode="contain"
        />

        {/* Buttons Container */}
        <View style={styles.buttonsContainer}>
          {/* Get Started Button */}
          <Button
            title="Get started"
            onPress={onGetStarted}
            variant="primary"
            size="medium"
            fullWidth
            icon={
              <FireIcon
                width={20}
                height={19}
                fill={BrandColors.primaryWhite}
              />
            }
            iconPosition="left"
            style={styles.getStartedButton}
          />

          {/* See How It Works Button */}
          <Button
            title="See how it works"
            onPress={onSeeHowItWorks}
            variant="secondary"
            size="medium"
            fullWidth
            icon={
              <EyeIcon width={20} height={20} fill={BrandColors.primaryBlack} />
            }
            iconPosition="left"
            style={styles.seeHowItWorksButton}
          />

          {/* Already have an account? */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Text style={styles.loginLink}>Log in</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerContainer: {
    marginBottom: 24,
  },
  welcomeText: {
    ...FontStyles.bodyMedium,
    color: BrandColors.black3,
    marginBottom: 14,
    fontSize: 14,
  },
  mainHeading: {
    ...FontStyles.heading1,
    color: BrandColors.primaryBlack,
    lineHeight: 40,
    fontSize: 40,
  },
  onboardingImage: {
    width: width - 40, // Full width minus horizontal padding
    height: undefined, // Let height be determined by aspect ratio
    aspectRatio: 1, // Adjust this based on your actual image aspect ratio
    marginBottom: 40,
    alignSelf: "center",
  },
  buttonsContainer: {
    // paddingBottom removed since we're handling it in content
  },
  getStartedButton: {
    marginBottom: 16,
  },
  seeHowItWorksButton: {
    marginBottom: 24,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    ...FontStyles.bodyMedium,
    color: BrandColors.black3,
    fontSize: 14,
  },
  loginLink: {
    ...FontStyles.body,
    color: BrandColors.primary,
    fontWeight: "600",
    fontSize: 14,
    textDecorationLine: "underline",
    fontFamily: Fonts.MonaSans.Bold,
  },
});
