import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { BrandColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { CloseIcon, ChevronDownIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: screenWidth } = Dimensions.get("window");
const imageSize = (screenWidth - 48) / 3; // 3 columns with padding

interface MediaAsset {
  id: string;
  uri: string;
  width: number;
  height: number;
  creationTime: number;
  selected?: boolean;
}

export default function GalleryPicker() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  
  const [photos, setPhotos] = useState<MediaAsset[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [mediaCategory, setMediaCategory] = useState("Recent");

  const loadPhotos = useCallback(async () => {
    try {
      setLoading(true);
      console.log("Starting to load photos...");
      console.log("Permission status:", permissionResponse?.status);

      if (permissionResponse?.status !== 'granted') {
        console.log("Permission not granted, requesting...");
        const newPermission = await requestPermission();
        if (newPermission.status !== 'granted') {
          console.log("Permission denied");
          Alert.alert("Permission Required", "Please grant permission to access your photo library.");
          return;
        }
      }

      console.log("Getting assets...");
      const result = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.photo,
        first: 100,
        sortBy: [MediaLibrary.SortBy.creationTime],
      });

      console.log("Assets result:", { 
        totalCount: result.totalCount, 
        assets: result.assets.length,
        hasNextPage: result.hasNextPage 
      });

      if (result.assets.length === 0) {
        console.log("No assets found, trying to get all albums...");
        
        // Try getting from all albums
        const albums = await MediaLibrary.getAlbumsAsync({
          includeSmartAlbums: true,
        });
        
        console.log("Found albums:", albums.length);
        
        if (albums.length > 0) {
          // Try getting assets from the first album (usually Camera Roll)
          const albumAssets = await MediaLibrary.getAssetsAsync({
            album: albums[0],
            mediaType: MediaLibrary.MediaType.photo,
            first: 100,
          });
          
          console.log("Album assets:", albumAssets.totalCount);
          
          if (albumAssets.assets.length > 0) {
            const photosWithSelection = albumAssets.assets.map((asset) => ({
              id: asset.id,
              uri: asset.uri,
              width: asset.width,
              height: asset.height,
              creationTime: asset.creationTime,
              selected: false,
            }));

            setPhotos(photosWithSelection);
            setLoading(false);
            return;
          }
        }
      }

      const photosWithSelection = result.assets.map((asset) => ({
        id: asset.id,
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        creationTime: asset.creationTime,
        selected: false,
      }));

      console.log("Final photos count:", photosWithSelection.length);
      setPhotos(photosWithSelection);
      
    } catch (error) {
      console.error("Error loading photos:", error);
      Alert.alert("Error", `Failed to load photos: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }, [permissionResponse, requestPermission]);

  useEffect(() => {
    if (permissionResponse?.status === 'granted') {
      loadPhotos();
    }
  }, [permissionResponse, loadPhotos]);  const pickImagesWithImagePicker = useCallback(async () => {
    try {
      // Request permission for image picker
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'We need camera roll permissions to select photos.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Launch image picker with multiple selection
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        quality: 0.8,
        aspect: [1, 1],
      });

      if (!result.canceled && result.assets) {
        const selectedAssets = result.assets.map((asset, index) => ({
          id: `picker_${index}`,
          uri: asset.uri,
          width: asset.width || 0,
          height: asset.height || 0,
          creationTime: Date.now(),
          selected: true,
        }));

        console.log("Selected photos from picker:", selectedAssets.length);
        
        // Navigate to create outfit with selected photos
        router.push({
          pathname: '/create-outfit',
          params: {
            selectedPhotos: JSON.stringify(selectedAssets),
          },
        });
      }
    } catch (error) {
      console.error("Error with image picker:", error);
      Alert.alert("Error", "Failed to open image picker");
    }
  }, [router]);

  useEffect(() => {
    console.log("Permission effect, status:", permissionResponse?.status);
    if (permissionResponse?.status === 'granted') {
      // Try to load photos, but expect it might fail in Expo Go
      loadPhotos();
    } else if (permissionResponse?.status === 'denied') {
      console.log("Permission denied");
    }
  }, [permissionResponse, loadPhotos]);

  // Check if we're in Expo Go environment
  const isExpoGo = __DEV__ && !process.env.EXPO_PUBLIC_USE_DEV_BUILD;

  const togglePhotoSelection = (photo: MediaAsset) => {
    const isSelected = selectedPhotos.find((p) => p.id === photo.id);

    if (isSelected) {
      // Remove from selection
      setSelectedPhotos(selectedPhotos.filter((p) => p.id !== photo.id));
    } else {
      // Add to selection
      setSelectedPhotos([...selectedPhotos, photo]);
    }
  };

  const handleNext = () => {
    if (selectedPhotos.length === 0) {
      Alert.alert("No Selection", "Please select at least one photo");
      return;
    }

    // Navigate to the outfit creation screen with selected photos
    router.replace({
      pathname: "/create-outfit",
      params: {
        selectedPhotos: JSON.stringify(
          selectedPhotos.map((p) => ({ id: p.id, uri: p.uri }))
        ),
      },
    });
  };

  const handleClose = () => {
    router.back();
  };

  const renderPhoto = ({ item }: { item: MediaAsset }) => {
    const isSelected = selectedPhotos.find((p) => p.id === item.id);

    return (
      <TouchableOpacity
        style={[
          styles.photoContainer,
          isSelected && styles.selectedPhotoContainer,
        ]}
        onPress={() => togglePhotoSelection(item)}
      >
        <Image source={{ uri: item.uri }} style={styles.photo} />
        {isSelected && (
          <View style={styles.selectionOverlay}>
            <View style={styles.selectionIndicator}>
              <Text style={styles.selectionNumber}>
                {selectedPhotos.findIndex((p) => p.id === item.id) + 1}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  if (!permissionResponse) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            Loading permissions...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (permissionResponse.status !== 'granted') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            Permission required to access your photo library
          </Text>
          <Button
            title="Grant Permission"
            onPress={requestPermission}
            variant="outline"
            fullWidth
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <CloseIcon width={24} height={24} fill="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.categorySelector}>
          <Text style={styles.categoryText}>{mediaCategory}</Text>
          <ChevronDownIcon width={20} height={20} fill="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.nextButton,
            selectedPhotos.length === 0 && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
        >
          <Text
            style={[
              styles.nextButtonText,
              selectedPhotos.length === 0 && styles.nextButtonTextDisabled,
            ]}
          >
            Next{selectedPhotos.length > 0 && ` (${selectedPhotos.length})`}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Photo Grid */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading photos...</Text>
        </View>
      ) : photos.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>📱 Expo Go Limitation</Text>
          <Text style={styles.debugText}>
            Expo Go can&apos;t access your full photo library due to Android permission changes.
          </Text>
          <Text style={styles.debugText}>
            Use the photo picker below to select photos instead:
          </Text>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 20, justifyContent: 'center' }}>
            <Button
              title="📸 Pick Photos"
              onPress={pickImagesWithImagePicker}
              variant="primary"
              fullWidth={false}
            />
          </View>
          <Text style={[styles.debugText, { marginTop: 20, fontSize: 12, opacity: 0.6 }]}>
            For full gallery access, create a development build: docs.expo.dev/develop/development-builds/
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.debugContainer}>
            <Text style={styles.debugText}>Found {photos.length} photos</Text>
          </View>
          <FlatList
            data={photos}
            renderItem={renderPhoto}
            numColumns={3}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.photoGrid}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
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
  closeButton: {
    padding: 8,
  },
  categorySelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  categoryText: {
    fontFamily: Fonts.MonaSans.SemiBold,
    fontSize: 14,
    color: BrandColors.primaryBlack,
  },
  nextButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    fontFamily: Fonts.MonaSans.SemiBold,
    fontSize: 16,
    color: "#FF6B9D",
  },
  nextButtonTextDisabled: {
    color: BrandColors.black3,
  },
  photoGrid: {
    padding: 16,
  },
  photoContainer: {
    marginBottom: 4,
    marginRight: 4,
    position: "relative",
  },
  selectedPhotoContainer: {
    opacity: 0.8,
  },
  photo: {
    width: imageSize,
    height: imageSize,
    borderRadius: 8,
  },
  selectionOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 107, 157, 0.3)",
    borderRadius: 8,
    alignItems: "flex-end",
    padding: 8,
  },
  selectionIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FF6B9D",
    alignItems: "center",
    justifyContent: "center",
  },
  selectionNumber: {
    color: BrandColors.white,
    fontFamily: Fonts.MonaSans.Bold,
    fontSize: 12,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    fontFamily: Fonts.MonaSans.Medium,
    fontSize: 16,
    color: BrandColors.primaryBlack,
    textAlign: "center",
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: "#FF6B9D",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: BrandColors.white,
    fontFamily: Fonts.MonaSans.SemiBold,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontFamily: Fonts.MonaSans.Medium,
    fontSize: 16,
    color: BrandColors.black3,
  },
  debugContainer: {
    padding: 16,
    alignItems: "center",
  },
  debugText: {
    fontFamily: Fonts.MonaSans.Medium,
    fontSize: 14,
    color: BrandColors.black2,
    textAlign: "center",
    marginBottom: 8,
  },
});
