import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { BrandColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { BackArrowIcon } from "@/components/icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUrlProcessor } from "@/hooks/useUrlProcessor";

export default function ProcessingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { processUrl, isProcessing, result, error } = useUrlProcessor();

  const [processingStep, setProcessingStep] = useState("Analyzing content...");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Animation values
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const rotateAnim = new Animated.Value(0);

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous rotation animation
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );
    rotateAnimation.start();

    // Process the URL if provided
    const startProcessing = async () => {
      console.log("🚀 Processing screen - startProcessing called");
      console.log("📋 Processing params:", params);

      if (params.sharedUrl && typeof params.sharedUrl === "string") {
        console.log("🌐 Processing URL:", params.sharedUrl);
        setProcessingStep("Analyzing URL...");

        try {
          console.log("⚡ Starting URL processing...");
          const processingResult = await processUrl(params.sharedUrl, {
            includeThumbnails: true,
            maxQuality: "high",
            extractMetadata: true,
            aiAnalysis: true,
          });

          console.log("📊 Processing result:", processingResult);

          if (processingResult.success && processingResult.data) {
            console.log(
              "✅ Processing successful, navigating to create-outfit"
            );
            setProcessingStep("Processing complete!");
            setProgress(100);

            // Navigate to create-outfit with processed data
            setTimeout(() => {
              console.log("🧭 Navigating to create-outfit with processed data");
              router.replace({
                pathname: "/create-outfit",
                params: {
                  sharedUrl: params.sharedUrl,
                  processedData: JSON.stringify(processingResult.data),
                  source: "processing_complete",
                },
              });
            }, 1000);
          } else {
            console.log("❌ Processing failed:", processingResult.error);
            setProcessingStep("Processing failed");
            setErrorMessage(
              processingResult.error ||
                "Something went wrong. Please try again."
            );
            // Navigate back after showing error
            setTimeout(() => {
              console.log("🔙 Navigating back due to processing failure");
              router.back();
            }, 3000);
          }
        } catch (err) {
          console.error("💥 Processing error:", err);
          setProcessingStep("Processing failed");
          setErrorMessage(
            err instanceof Error
              ? err.message
              : "Something went wrong. Please try again."
          );
          setTimeout(() => {
            console.log("🔙 Navigating back due to processing error");
            router.back();
          }, 3000);
        }
      } else if (params.sharedMedia) {
        console.log("📸 Processing direct media:", params.sharedMedia);
        // Handle direct media (no processing needed)
        setProcessingStep("Processing complete!");
        setProgress(100);

        setTimeout(() => {
          console.log("🧭 Navigating to create-outfit with direct media");
          router.replace({
            pathname: "/create-outfit",
            params: {
              sharedMedia: params.sharedMedia,
              source: "processing_complete",
            },
          });
        }, 1000);
      } else {
        console.log("⚠️ No sharedUrl or sharedMedia found in params");
        setProcessingStep("No content to process");
        setTimeout(() => {
          console.log("🔙 Navigating back - no content");
          router.back();
        }, 2000);
      }
    };

    // Start processing after animations
    setTimeout(startProcessing, 1000);

    return () => {
      rotateAnimation.stop();
    };
  }, [params.sharedUrl, params.sharedMedia]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleBack}>
            <BackArrowIcon fill="#050413" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Processing</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.iconContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.rotatingIcon,
              {
                transform: [{ rotate: rotation }],
              },
            ]}
          >
            <ActivityIndicator size="large" color={BrandColors.primaryBlack} />
          </Animated.View>
        </Animated.View>

        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.processingText}>{processingStep}</Text>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : (
            <Text style={styles.subText}>This may take a few moments...</Text>
          )}
        </Animated.View>

        <Animated.View
          style={[
            styles.progressContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progress}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>{Math.round(progress)}%</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: Fonts.MonaSans.Bold,
    fontSize: 16,
    color: BrandColors.primaryBlack,
    marginLeft: 12,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 48,
  },
  rotatingIcon: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  processingText: {
    fontFamily: Fonts.MonaSans.SemiBold,
    fontSize: 18,
    color: BrandColors.primaryBlack,
    textAlign: "center",
    marginBottom: 8,
  },
  subText: {
    fontFamily: Fonts.MonaSans.Medium,
    fontSize: 14,
    color: BrandColors.black3,
    textAlign: "center",
  },
  errorText: {
    fontFamily: Fonts.MonaSans.Medium,
    fontSize: 14,
    color: "#DC2626", // Red color for errors
    textAlign: "center",
    marginTop: 8,
  },
  progressContainer: {
    width: "100%",
    alignItems: "center",
  },
  progressBar: {
    width: "100%",
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: BrandColors.primaryBlack,
    borderRadius: 2,
  },
  progressText: {
    fontFamily: Fonts.MonaSans.Medium,
    fontSize: 12,
    color: BrandColors.black3,
  },
});
