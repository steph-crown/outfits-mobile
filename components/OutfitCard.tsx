import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import { Outfit } from "@/types/outfit";
import { FolderIcon } from "@/components/icons/TabIcons";
import { BrandColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";

interface OutfitCardProps {
  outfit: Outfit;
  onPress?: () => void;
}

export const OutfitCard: React.FC<OutfitCardProps> = ({ outfit, onPress }) => {
  const primaryMedia =
    outfit.outfit_media.find((media) => media.is_primary) ||
    outfit.outfit_media[0];
  const hasCollections = outfit.collections && outfit.collections.length > 0;

  const getSourceLabel = (sourceType: string) => {
    switch (sourceType) {
      case "tiktok":
        return "Tiktok";
      case "instagram":
        return "Instagram";
      case "pinterest":
        return "Pinterest";
      case "screenshot":
        return "Camera";
      case "photo":
        return "Camera";
      default:
        return sourceType;
    }
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={primaryMedia.media_url as ImageSourcePropType}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Dark overlay */}
        <View style={styles.overlay} />

        {/* Source label */}
        <View style={styles.sourceLabel}>
          <Text style={styles.sourceLabelText}>
            {getSourceLabel(outfit.source_type)}
          </Text>
        </View>

        {/* Collection indicator */}
        {hasCollections && (
          <View style={styles.collectionIndicator}>
            <FolderIcon size={20} />

            <Text style={styles.collectionIndicatorText}>
              {outfit.collections?.[0]?.name}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginBottom: 10,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    // aspectRatio: 3 / 4, // 3:4 aspect ratio for outfit images
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: BrandColors.blackLighter,
    height: 280,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  sourceLabel: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  sourceLabelText: {
    color: BrandColors.white,
    fontSize: 10,
    fontFamily: Fonts.MonaSans.SemiBold,
  },
  collectionIndicator: {
    position: "absolute",
    bottom: 8,
    left: 8,
    // backgroundColor: "rgba(0, 0, 0, 0.7)",
    // padding: 6,
    // borderRadius: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tagsContainer: {
    marginTop: 8,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    backgroundColor: BrandColors.blackLighter,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 12,
    color: BrandColors.black3,
    fontFamily: "Mona-Sans-Regular",
    textTransform: "capitalize",
  },
  collectionIndicatorText: {
    color: BrandColors.white,
    fontSize: 12,
    fontFamily: Fonts.MonaSans.SemiBold,
  },
});
