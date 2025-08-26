import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { BrandColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { FolderIcon } from "@/components/icons/TabIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OutfitSavedScreen() {
  const insets = useSafeAreaInsets();

  const router = useRouter();

  const handleSaveAnother = () => {
    // Navigate back to gallery picker
    router.push("/gallery-picker");
  };

  const handleClose = () => {
    // Navigate to home screen
    router.replace("/");
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        {/* Success Icon/Animation */}
        <View style={styles.iconContainer}>
          <Text style={styles.celebrationIcon}>🎉</Text>
        </View>

        <Text style={styles.title}>Outfits Saved!</Text>
        <Text style={styles.description}>
          Outfits added to your style collection. This outfit screams main
          character energy 💅
        </Text>

        {/* Collection Tag */}
        <View style={styles.collectionContainer}>
          <View style={styles.collectionTag}>
            <FolderIcon color="#FFFFFF" />
            <Text style={styles.collectionText}>Brunch</Text>
          </View>
        </View>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.saveAnotherButton}
          onPress={handleSaveAnother}
        >
          <Text style={styles.saveAnotherButtonText}>
            🔥 Save another outfit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.white,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 32,
  },
  celebrationIcon: {
    fontSize: 80,
  },
  title: {
    fontFamily: Fonts.MonaSans.Bold,
    fontSize: 28,
    color: BrandColors.primaryBlack,
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontFamily: Fonts.MonaSans.Medium,
    fontSize: 16,
    color: BrandColors.black2,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  collectionContainer: {
    alignItems: "center",
  },
  collectionTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BrandColors.primaryBlack,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  collectionText: {
    fontFamily: Fonts.MonaSans.SemiBold,
    fontSize: 14,
    color: BrandColors.white,
  },
  bottomContainer: {
    padding: 24,
    gap: 16,
  },
  saveAnotherButton: {
    backgroundColor: BrandColors.primaryBlack,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  saveAnotherButtonText: {
    fontFamily: Fonts.MonaSans.SemiBold,
    fontSize: 16,
    color: BrandColors.white,
  },
  closeButton: {
    alignItems: "center",
    paddingVertical: 8,
  },
  closeButtonText: {
    fontFamily: Fonts.MonaSans.SemiBold,
    fontSize: 16,
    color: BrandColors.primaryBlack,
  },
});
