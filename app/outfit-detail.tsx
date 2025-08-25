import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Modal,
  Share,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { BrandColors } from "@/constants/Colors";
import { Fonts, FontStyles } from "@/constants/Fonts";
import { BackArrowIcon } from "@/components/icons/BackArrowIcon";
import { EllipsisIcon } from "@/components/icons/EllipsisIcon";
import { ShareIcon } from "@/components/icons/ShareIcon";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { GalleryIcon } from "@/components/icons/GalleryIcon";
import { CameraIcon } from "@/components/icons/CameraIcon";
import { PinterestIcon } from "@/components/icons/PinterestIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { dummyOutfits, Outfit } from "@/types/outfit";

const { width: screenWidth } = Dimensions.get("window");

export default function OutfitDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [showShareModal, setShowShareModal] = useState(false);
  const [outfit, setOutfit] = useState<Outfit | null>(null);

  // Fetch outfit data based on ID from params
  useEffect(() => {
    const outfitId = params.id as string;
    if (outfitId) {
      const foundOutfit = dummyOutfits.find((o) => o.id === outfitId);
      setOutfit(foundOutfit || null);
    }
  }, [params.id]);

  // Show loading state if outfit is not found yet
  if (!outfit) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading outfit...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Get primary media or first available
  const primaryMedia =
    outfit.outfit_media.find((media) => media.is_primary) ||
    outfit.outfit_media[0];

  // Handle both require() (local) and URL (remote) images
  const imageSource =
    typeof primaryMedia.media_url === "string"
      ? { uri: primaryMedia.media_url }
      : primaryMedia.media_url;

  // Create description from AI tags and user tags
  const allTags = [...outfit.ai_tags, ...outfit.user_tags];
  const description =
    outfit.original_text || `Featuring ${allTags.slice(0, 3).join(", ")} style`;

  const handleBack = () => {
    router.back();
  };

  const handleShare = async () => {
    try {
      const shareUrl =
        typeof primaryMedia.media_url === "string"
          ? primaryMedia.media_url
          : ""; // Can't share local images via URL

      await Share.share({
        message: `Check out this outfit: ${description}`,
        url: shareUrl,
      });
    } catch {
      Alert.alert("Error", "Could not share outfit");
    }
  };

  const handleViewOnPlatform = (platform: string) => {
    // Handle opening the outfit on the specific platform
    Alert.alert("View on Platform", `Opening on ${platform}`);
    setShowShareModal(false);
  };

  const handleSaveToGallery = () => {
    Alert.alert("Save to Gallery", "Saving outfit to gallery...");
    setShowShareModal(false);
  };

  const handleTakePhoto = () => {
    Alert.alert("Take Photo", "Opening camera...");
    setShowShareModal(false);
  };

  const renderShareModal = () => (
    <Modal
      visible={showShareModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowShareModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Share Outfit</Text>
            <TouchableOpacity
              onPress={() => setShowShareModal(false)}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.shareOptions}>
            <TouchableOpacity
              style={styles.shareOption}
              onPress={() => handleViewOnPlatform("TikTok")}
            >
              <View style={styles.shareIconContainer}>
                <TikTokIcon width={24} height={24} />
              </View>
              <Text style={styles.shareOptionText}>View on TikTok</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareOption}
              onPress={() => handleViewOnPlatform("Pinterest")}
            >
              <View style={styles.shareIconContainer}>
                <PinterestIcon width={24} height={24} />
              </View>
              <Text style={styles.shareOptionText}>View on Pinterest</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareOption}
              onPress={() => handleViewOnPlatform("Instagram")}
            >
              <View style={styles.shareIconContainer}>
                <InstagramIcon width={24} height={24} />
              </View>
              <Text style={styles.shareOptionText}>View on Instagram</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareOption}
              onPress={() => handleViewOnPlatform("Facebook")}
            >
              <View style={styles.shareIconContainer}>
                <FacebookIcon width={24} height={24} />
              </View>
              <Text style={styles.shareOptionText}>View on Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareOption}
              onPress={handleSaveToGallery}
            >
              <View style={styles.shareIconContainer}>
                <GalleryIcon width={24} height={24} />
              </View>
              <Text style={styles.shareOptionText}>Save to Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareOption}
              onPress={handleTakePhoto}
            >
              <View style={styles.shareIconContainer}>
                <CameraIcon width={24} height={24} />
              </View>
              <Text style={styles.shareOptionText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <BackArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
          <EllipsisIcon />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Image */}
        <View style={styles.imageContainer}>
          {/* Main Outfit Image */}
          <Image
            source={imageSource}
            style={styles.outfitImage}
            resizeMode="cover"
          />

          {/* Share Button Overlay */}
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => setShowShareModal(true)}
          >
            <ShareIcon />
          </TouchableOpacity>

          {/* View on Platform Button */}
          <TouchableOpacity
            style={styles.viewOnPlatformButton}
            onPress={() => handleViewOnPlatform("TikTok")}
          >
            <TikTokIcon width={17} height={20} fill="#FFFFFF" />
            <Text style={styles.viewOnPlatformText}>View on TikTok</Text>
          </TouchableOpacity>
        </View>

        {/* Outfit Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.outfitTitle}>{description}</Text>

          <View style={styles.tagsContainer}>
            {allTags.slice(0, 5).map((tag, index) => (
              <View key={index} style={styles.tagContainer}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {renderShareModal()}
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    width: screenWidth,
    height: screenWidth * 1.5, // Aspect ratio similar to the image
  },
  outfitImage: {
    width: "100%",
    height: "100%",
    backgroundColor: BrandColors.black4, // Placeholder while loading
  },
  shareButton: {
    position: "absolute",
    top: 20,
    right: 80, // Positioned between the image and the ellipsis button
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  viewOnPlatformButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF0050", // TikTok brand color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  viewOnPlatformText: {
    color: BrandColors.white,
    fontFamily: Fonts.MonaSans.SemiBold,
    fontSize: 16,
    marginLeft: 8,
  },
  detailsContainer: {
    padding: 20,
  },
  outfitTitle: {
    ...FontStyles.heading3,
    fontFamily: Fonts.MonaSans.Bold,
    color: BrandColors.primaryBlack,
    marginBottom: 16,
    lineHeight: 28,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagContainer: {
    backgroundColor: BrandColors.black4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    ...FontStyles.bodySmall,
    fontFamily: Fonts.MonaSans.Medium,
    color: BrandColors.black2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: BrandColors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    ...FontStyles.heading3,
    fontFamily: Fonts.MonaSans.Bold,
    color: BrandColors.primaryBlack,
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  modalCloseText: {
    fontSize: 20,
    color: BrandColors.black2,
  },
  shareOptions: {
    gap: 16,
  },
  shareOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  shareIconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  shareOptionText: {
    ...FontStyles.body,
    fontFamily: Fonts.MonaSans.Medium,
    color: BrandColors.primaryBlack,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    ...FontStyles.body,
    fontFamily: Fonts.MonaSans.Medium,
    color: BrandColors.primaryBlack,
  },
});
