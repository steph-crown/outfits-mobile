import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Outfit } from '@/types/outfit';
import { FolderIcon } from '@/components/icons/TabIcons';
import { BrandColors } from '@/constants/Colors';

interface OutfitCardProps {
  outfit: Outfit;
  onPress?: () => void;
}

export const OutfitCard: React.FC<OutfitCardProps> = ({ outfit, onPress }) => {
  const primaryMedia = outfit.outfit_media.find(media => media.is_primary) || outfit.outfit_media[0];
  const hasCollections = outfit.collections && outfit.collections.length > 0;

  const getSourceLabel = (sourceType: string) => {
    switch (sourceType) {
      case 'tiktok':
        return 'Tiktok';
      case 'instagram':
        return 'Instagram';
      case 'pinterest':
        return 'Pinterest';
      case 'screenshot':
        return 'Camera';
      case 'photo':
        return 'Camera';
      default:
        return sourceType;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image source={primaryMedia.media_url as ImageSourcePropType} style={styles.image} resizeMode="cover" />
        
        {/* Source label */}
        <View style={styles.sourceLabel}>
          <Text style={styles.sourceLabelText}>{getSourceLabel(outfit.source_type)}</Text>
        </View>

        {/* Collection indicator */}
        {hasCollections && (
          <View style={styles.collectionIndicator}>
            <FolderIcon size={20} />
          </View>
        )}
      </View>

      {/* Tags section */}
      <View style={styles.tagsContainer}>
        <View style={styles.tagRow}>
          {outfit.ai_tags.slice(0, 2).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
          {outfit.ai_tags.length > 2 && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>+{outfit.ai_tags.length - 2}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 3 / 4, // 3:4 aspect ratio for outfit images
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: BrandColors.blackLighter,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  sourceLabel: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  sourceLabelText: {
    color: BrandColors.white,
    fontSize: 12,
    fontFamily: 'Mona-Sans-Medium',
  },
  collectionIndicator: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 6,
    borderRadius: 6,
  },
  tagsContainer: {
    marginTop: 8,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    fontFamily: 'Mona-Sans-Regular',
    textTransform: 'capitalize',
  },
});
