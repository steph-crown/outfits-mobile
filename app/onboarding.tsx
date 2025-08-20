import React from "react";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { router } from "expo-router";

export default function OnboardingPage() {
  const handleGetStarted = () => {
    // Navigate to the main app (tabs)
    router.replace("/(tabs)");
  };

  const handleSeeHowItWorks = () => {
    // Navigate to how it works screen or show tutorial
    console.log("See how it works pressed");
    // For now, just navigate to main app
    router.replace("/(tabs)");
  };

  return (
    <OnboardingScreen
      onGetStarted={handleGetStarted}
      onSeeHowItWorks={handleSeeHowItWorks}
    />
  );
}
