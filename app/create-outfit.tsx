import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { BrandColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { BackArrowIcon, HashtagIcon } from "@/components/icons";
import { FolderIcon } from "@/components/icons/TabIcons";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import { InputField } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SelectedPhoto {
  id: string;
  uri: string;
}

interface Collection {
  id: string;
  name: string;
}

const CollectionsContent = ({
  collections,
  selectedCollection,
  onSelectCollection,
}: {
  collections: Collection[];
  selectedCollection: Collection | null;
  onSelectCollection: (collection: Collection) => void;
}) => (
  <View style={styles.bottomSheetContent}>
    <Text style={styles.bottomSheetTitle}>Select Collection</Text>
    {collections.map((collection) => (
      <TouchableOpacity
        key={collection.id}
        style={[
          styles.collectionOption,
          selectedCollection?.id === collection.id &&
            styles.selectedCollectionOption,
        ]}
        onPress={() => onSelectCollection(collection)}
      >
        <FolderIcon
          color={
            selectedCollection?.id === collection.id
              ? BrandColors.white
              : "#050413"
          }
        />
        <Text
          style={[
            styles.collectionOptionText,
            selectedCollection?.id === collection.id &&
              styles.selectedCollectionOptionText,
          ]}
        >
          {collection.name}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const TagsContent = ({
  tags,
  onAddTag,
  onRemoveTag,
}: {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
}) => {
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim()) {
      onAddTag(newTag.trim());
      setNewTag("");
    }
  };

  return (
    <View style={styles.bottomSheetContent}>
      <Text style={styles.bottomSheetTitle}>Add Tags</Text>

      <View style={styles.tagInputContainer}>
        <InputField
          label="Tag"
          placeholder="Enter a tag..."
          value={newTag}
          onChangeText={setNewTag}
          onSubmitEditing={handleAddTag}
          returnKeyType="done"
          isBottomSheet={true}
          icon={<HashtagIcon width={20} height={20} fill="#A0AEC0" />}
        />
      </View>

      <View style={styles.tagButtonContainer}>
        <Button
          title="Add Tag"
          onPress={handleAddTag}
          variant="primary"
          disabled={!newTag.trim()}
          fullWidth
        />
      </View>

      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tagChip}
            onPress={() => onRemoveTag(index)}
          >
            <Text style={styles.tagChipText}>#{tag}</Text>
            <Text style={styles.tagRemoveText}>×</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default function CreateOutfitScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();

  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);
  const [note, setNote] = useState("");
  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  // Mock collections data
  const collections: Collection[] = [
    { id: "1", name: "Brunch" },
    { id: "2", name: "Work" },
    { id: "3", name: "Date Night" },
    { id: "4", name: "Casual" },
    { id: "5", name: "Formal" },
  ];

  React.useEffect(() => {
    if (params.selectedPhotos) {
      try {
        const photos = JSON.parse(params.selectedPhotos as string);
        setSelectedPhotos(photos);
      } catch (error) {
        console.error("Error parsing selected photos:", error);
      }
    }
  }, [params.selectedPhotos]);

  const handleBack = () => {
    router.back();
  };

  const handleSelectCollection = () => {
    openBottomSheet({
      title: "Collections",
      content: (
        <CollectionsContent
          collections={collections}
          selectedCollection={selectedCollection}
          onSelectCollection={(collection) => {
            setSelectedCollection(collection);
            closeBottomSheet();
          }}
        />
      ),
    });
  };

  const handleAddTags = () => {
    openBottomSheet({
      title: "Tags",
      content: (
        <TagsContent
          tags={tags}
          onAddTag={(tag) => setTags([...tags, tag])}
          onRemoveTag={(index) => setTags(tags.filter((_, i) => i !== index))}
        />
      ),
    });
  };

  const handleSaveOutfit = () => {
    if (selectedPhotos.length === 0) {
      Alert.alert("No Photos", "Please select at least one photo");
      return;
    }

    // Navigate to success screen with the outfit data
    router.replace({
      pathname: "/outfit-saved",
      params: {
        selectedPhotos: JSON.stringify(selectedPhotos),
        note: note,
        selectedCollection: selectedCollection?.name || "",
        tags: JSON.stringify(tags),
      },
    });
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <BackArrowIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New outfit</Text>
        <TouchableOpacity style={styles.fromGalleryButton}>
          <Text style={styles.fromGalleryText}>From Gallery</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Selected Photos */}
        {selectedPhotos.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.photosScrollView}
            contentContainerStyle={styles.photosContainer}
          >
            {selectedPhotos.map((photo, index) => (
              <Image
                key={photo.id}
                source={{ uri: photo.uri }}
                style={styles.selectedPhoto}
              />
            ))}
          </ScrollView>
        )}

        {/* Note Input */}
        <View style={styles.section}>
          <InputField
            label="Note"
            placeholder="Add a note about these outfits..."
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Add to Collection */}
        <TouchableOpacity
          style={styles.optionRow}
          onPress={handleSelectCollection}
        >
          <View style={styles.optionLeft}>
            <FolderIcon color="#050413" />
            <Text style={styles.optionText}>
              {selectedCollection
                ? selectedCollection.name
                : "Add to collection"}
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* Add Tags */}
        <TouchableOpacity style={styles.optionRow} onPress={handleAddTags}>
          <View style={styles.optionLeft}>
            <HashtagIcon width={24} height={24} />
            <Text style={styles.optionText}>
              {tags.length > 0 ? `${tags.length} tags added` : "Add tags"}
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* Tags Display */}
        {tags.length > 0 && (
          <View style={styles.tagsDisplayContainer}>
            {tags.slice(0, 3).map((tag, index) => (
              <View key={index} style={styles.tagDisplay}>
                <Text style={styles.tagDisplayText}>#{tag}</Text>
              </View>
            ))}
            {tags.length > 3 && (
              <Text style={styles.moreTagsText}>+{tags.length - 3} more</Text>
            )}
          </View>
        )}
      </ScrollView>

      {/* Save Button */}
      <View style={styles.bottomContainer}>
        <Button
          title="Save outfit"
          onPress={handleSaveOutfit}
          variant="primary"
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: Fonts.MonaSans.Bold,
    fontSize: 18,
    color: BrandColors.primaryBlack,
  },
  fromGalleryButton: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  fromGalleryText: {
    fontFamily: Fonts.MonaSans.SemiBold,
    fontSize: 12,
    color: BrandColors.primaryBlack,
  },
  content: {
    flex: 1,
  },
  photosScrollView: {
    paddingVertical: 16,
  },
  photosContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  selectedPhoto: {
    width: 200,
    height: 300,
    borderRadius: 12,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  noteInput: {
    borderWidth: 0,
    fontSize: 16,
    fontFamily: Fonts.MonaSans.Medium,
    color: BrandColors.primaryBlack,
    minHeight: 80,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionText: {
    fontFamily: Fonts.MonaSans.SemiBold,
    fontSize: 16,
    color: BrandColors.primaryBlack,
    marginLeft: 12,
  },
  chevron: {
    fontSize: 20,
    color: BrandColors.black3,
  },
  tagsDisplayContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  tagDisplay: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagDisplayText: {
    fontFamily: Fonts.MonaSans.Medium,
    fontSize: 14,
    color: BrandColors.primaryBlack,
  },
  moreTagsText: {
    fontFamily: Fonts.MonaSans.Medium,
    fontSize: 14,
    color: BrandColors.black3,
    alignSelf: "center",
  },
  bottomContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  saveButton: {
    backgroundColor: BrandColors.primaryBlack,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    fontFamily: Fonts.MonaSans.SemiBold,
    fontSize: 16,
    color: BrandColors.white,
  },
  bottomSheetContent: {
    padding: 16,
  },
  bottomSheetTitle: {
    fontFamily: Fonts.MonaSans.Bold,
    fontSize: 18,
    color: BrandColors.primaryBlack,
    marginBottom: 16,
  },
  collectionOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedCollectionOption: {
    backgroundColor: BrandColors.primaryBlack,
  },
  collectionOptionText: {
    fontFamily: Fonts.MonaSans.SemiBold,
    fontSize: 16,
    color: BrandColors.primaryBlack,
    marginLeft: 12,
  },
  selectedCollectionOptionText: {
    color: BrandColors.white,
  },
  tagInputContainer: {
    marginBottom: 16,
  },
  tagButtonContainer: {
    marginBottom: 16,
  },
  tagInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: Fonts.MonaSans.Medium,
    fontSize: 16,
  },
  addTagButton: {
    backgroundColor: BrandColors.primaryBlack,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addTagButtonText: {
    color: BrandColors.white,
    fontFamily: Fonts.MonaSans.SemiBold,
    fontSize: 14,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  tagChipText: {
    fontFamily: Fonts.MonaSans.Medium,
    fontSize: 14,
    color: BrandColors.primaryBlack,
  },
  tagRemoveText: {
    fontSize: 16,
    color: BrandColors.black3,
  },
});
