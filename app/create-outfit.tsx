import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import { useRouter, useLocalSearchParams } from "expo-router";
import { BrandColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { BackArrowIcon, GalleryIcon, HashtagIcon } from "@/components/icons";
import { FolderIcon } from "@/components/icons/TabIcons";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import { Button } from "@/components/common/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  CollectionsSelector,
  Collection,
} from "@/components/forms/CollectionsSelector";
import { TagsManager } from "@/components/forms/TagsManager";
import { SelectedPhoto, ContentSource } from "@/types/shared";
import {
  detectPlatformFromUrl,
  convertProcessedMediaToPhotos,
  extractNoteFromProcessedData,
} from "@/utils/contentUtils";

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
  const [source, setSource] = useState<ContentSource>("gallery");

  // Track if we've already processed the initial params to prevent infinite loops
  const hasProcessedInitialParams = React.useRef(false);

  // Mock collections data
  const collections: Collection[] = [
    { id: "1", name: "Brunch" },
    { id: "2", name: "Work" },
    { id: "3", name: "Date Night" },
    { id: "4", name: "Casual" },
    { id: "5", name: "Formal" },
  ];

  React.useEffect(() => {
    // Only process params once to prevent infinite loops
    if (hasProcessedInitialParams.current) {
      return;
    }

    console.log("Effect triggered with params:", params);

    // Handle processed data from processing screen
    if (params.processedData && typeof params.processedData === "string") {
      try {
        const processedData = JSON.parse(params.processedData);
        console.log("Processing processed data:", processedData);

        // Convert processed media to photos
        const photos = convertProcessedMediaToPhotos(processedData);
        if (photos.length > 0) {
          setSelectedPhotos(photos);
          console.log(
            "Set selected photos from processed data:",
            photos.length
          );
        }

        // Extract and set note
        const extractedNote = extractNoteFromProcessedData(processedData);
        if (extractedNote) {
          setNote(extractedNote);
        }

        // Set source based on platform
        if (processedData.platform) {
          setSource(processedData.platform);
        }

        hasProcessedInitialParams.current = true;
        return; // Don't process other params if we have processed data
      } catch (error) {
        console.error("Failed to parse processed data:", error);
      }
    }

    // Handle shared content from share intent
    if (params.sharedUrl && typeof params.sharedUrl === "string") {
      console.log("Processing shared URL:", params.sharedUrl);
      setNote(`Shared from: ${params.sharedUrl}`);
      setSource(detectPlatformFromUrl(params.sharedUrl));
      hasProcessedInitialParams.current = true;
    }

    // Handle shared media from share intent
    if (params.sharedMedia && typeof params.sharedMedia === "string") {
      try {
        const mediaFiles = JSON.parse(params.sharedMedia);
        console.log(
          "Processing shared media files:",
          mediaFiles.length,
          "files"
        );

        // Convert shared media files to the format expected by the component
        const photos = mediaFiles.map((file: string, index: number) => ({
          id: `shared-${index}`,
          uri: file,
        }));

        setSelectedPhotos(photos);
        setSource("share_intent"); // Media files from share intent
        hasProcessedInitialParams.current = true;
      } catch (error) {
        console.error("Error parsing shared media:", error);
      }
    }

    // Handle regular photo selection from gallery
    if (params.selectedPhotos && selectedPhotos.length === 0) {
      try {
        const photos = JSON.parse(params.selectedPhotos as string);
        console.log("Setting photos:", photos);
        setSelectedPhotos(photos);
        hasProcessedInitialParams.current = true;
      } catch (error) {
        console.error("Error parsing selected photos:", error);
      }
    }
  }, [params, selectedPhotos.length]);

  // Reset the processing flag when component unmounts
  React.useEffect(() => {
    return () => {
      hasProcessedInitialParams.current = false;
    };
  }, []);

  const handleBack = () => {
    hasProcessedInitialParams.current = false;
    router.back();
  };

  const handleSelectCollection = () => {
    openBottomSheet({
      title: "Select collection",
      content: (
        <CollectionsSelector
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
      title: "Select tags",
      content: (
        <TagsManager tags={tags} onTagsChange={(newTags) => setTags(newTags)} />
      ),
    });
  };

  const handleSaveOutfit = () => {
    if (selectedPhotos.length === 0) {
      Alert.alert("No Photos", "Please select at least one photo");
      return;
    }

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
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <BackArrowIcon fill="#050413" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>New outfit</Text>
        </View>

        {source === "gallery" && (
          <TouchableOpacity style={styles.fromGalleryButton}>
            <GalleryIcon height={20} width={20} />
            <Text style={styles.fromGalleryText}>From Gallery</Text>
          </TouchableOpacity>
        )}
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
            {selectedPhotos.map((photo, index) => {
              // Use the URI directly as provided by expo-image-picker
              const properUri = photo.uri;

              return (
                <View key={photo.id}>
                  <Image
                    source={{ uri: properUri }}
                    style={styles.selectedPhoto}
                    contentFit="cover"
                    transition={200}
                    onError={(error) => {
                      console.log(`Image load error for ${properUri}:`, error);
                    }}
                    onLoad={() => {
                      console.log(`Image loaded successfully: ${properUri}`);
                    }}
                  />
                </View>
              );
            })}
          </ScrollView>
        )}

        {/* Note Input */}
        <View style={styles.section}>
          <TextInput
            placeholder="Add a note about these outfits..."
            placeholderTextColor={BrandColors.black3}
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={3}
            style={styles.noteInput}
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
    fontSize: 16,
    color: BrandColors.primaryBlack,
  },
  fromGalleryButton: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
    // paddingTop: 16,
  },
  photosContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  selectedPhoto: {
    width: 280,
    height: 300,
    backgroundColor: "#f0f0f0", // Add background to see if image area is visible
    // marginRight: 4,
  },
  section: {
    // marginBottom: 24,
    // backgroundColor: "red",
  },
  noteInput: {
    borderWidth: 0,
    fontSize: 14,
    fontFamily: Fonts.MonaSans.Medium,
    color: BrandColors.primaryBlack,
    // minHeight: 80,
    textAlignVertical: "top",
    paddingTop: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingHorizontal: 16,
    lineHeight: 18,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    // backgroundColor: "red",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionText: {
    fontFamily: Fonts.MonaSans.SemiBold,
    fontSize: 14,
    color: BrandColors.primaryBlack,
    marginLeft: 12,
  },
  chevron: {
    fontSize: 24,
    color: BrandColors.black2,
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
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
