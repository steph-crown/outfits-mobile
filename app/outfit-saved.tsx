import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { useRouter, useLocalSearchParams } from "expo-router";
import { BrandColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { FolderIcon } from "@/components/icons/TabIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";

interface SelectedPhoto {
  id: string;
  uri: string;
}

export default function OutfitSavedScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();

  // Parse the received parameters
  const selectedPhotos: SelectedPhoto[] = params.selectedPhotos 
    ? JSON.parse(params.selectedPhotos as string) 
    : [];
  const note = params.note as string || '';
  const selectedCollection = params.selectedCollection as string || 'Brunch';
  const tags: string[] = params.tags 
    ? JSON.parse(params.tags as string) 
    : [];

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

        {/* Photos Display */}
        {selectedPhotos.length > 0 && (
          <View style={styles.photosContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.photosScrollContainer}
            >
              {selectedPhotos.map((photo, index) => (
                <View key={photo.id} style={styles.photoWrapper}>
                  <Image 
                    source={{ uri: photo.uri }} 
                    style={styles.photo}
                    contentFit="cover"
                    onError={(error) => {
                      console.log("Image load error in outfit-saved:", error);
                    }}
                    onLoad={() => {
                      console.log("Image loaded successfully in outfit-saved:", photo.uri);
                    }}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Collection Tag */}
        <View style={styles.collectionContainer}>
          <View style={styles.collectionTag}>
            <FolderIcon color="#FFFFFF" />
            <Text style={styles.collectionText}>{selectedCollection}</Text>
          </View>
        </View>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomContainer}>
        <Button
          title="🔥 Save another outfit"
          onPress={handleSaveAnother}
          variant="primary"
          fullWidth
        />

        <Button
          title="Close"
          onPress={handleClose}
          variant="ghost"
          fullWidth
        />
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
  photosContainer: {
    marginBottom: 24,
    width: '100%',
  },
  photosScrollContainer: {
    paddingHorizontal: 16,
  },
  photoWrapper: {
    marginRight: 12,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: BrandColors.black4,
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
});
