import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { BrandColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { SearchIcon } from "@/components/icons/TabIcons";
import { InputField } from "@/components/ui";
import { OutfitCard } from "@/components/OutfitCard";
import {
  dummyCollections,
  dummyOutfits,
  Collection,
  Outfit,
} from "@/types/outfit";
import { useFilterStore } from "@/store/filterStore";
import { useCollections } from "@/contexts/CollectionsContext";
import Svg, { Path } from "react-native-svg";

const { width: screenWidth } = Dimensions.get("window");
const OUTFIT_CARD_WIDTH = (screenWidth - 48) / 2.3; // Show about 2.3 cards

export const collectionsScrollRef = React.createRef<FlatList>();

export const scrollCollectionsToTop = () => {
  collectionsScrollRef.current?.scrollToOffset({ offset: 0, animated: true });
};

export default function CollectionsScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const { setSelectedFilter } = useFilterStore();
  const { openCreateCollection } = useCollections();
  const flatListRef = useRef<FlatList>(null);

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    collectionsScrollRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  React.useEffect(() => {
    (collectionsScrollRef as any).current = flatListRef.current;
  }, []);

  const filteredCollections = dummyCollections.filter((collection) =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getOutfitsForCollection = (collectionId: string): Outfit[] => {
    return dummyOutfits.filter((outfit) =>
      outfit.collections?.some((col) => col.id === collectionId)
    );
  };

  const navigateToCollection = (collectionName: string) => {
    setSelectedFilter(collectionName);
    router.push("/(tabs)");
  };

  const renderOutfitItem = ({ item }: { item: Outfit }) => (
    <View style={styles.outfitCardWrapper}>
      <OutfitCard
        outfit={item}
        onPress={() => router.push(`/outfit-detail?id=${item.id}`)}
      />
    </View>
  );

  const renderCollectionSection = ({
    item: collection,
  }: {
    item: Collection;
  }) => {
    const outfits = getOutfitsForCollection(collection.id);

    if (outfits.length === 0) return null;

    return (
      <View style={styles.collectionSection}>
        {/* Collection Header */}
        <TouchableOpacity
          style={styles.collectionHeader}
          onPress={() => navigateToCollection(collection.name)}
        >
          <Text style={styles.collectionName}>{collection.name}</Text>

          <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <Path
              d="M7.5 15L12.5 10L7.5 5"
              stroke={BrandColors.black2}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        <FlatList
          data={outfits}
          renderItem={renderOutfitItem}
          keyExtractor={(outfit) => `${collection.id}-${outfit.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.outfitsList}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        />
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <InputField
          label="Search collections"
          value={searchQuery}
          onChangeText={(value) => setSearchQuery(value)}
          icon={<SearchIcon />}
          keyboardType="web-search"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Add Collection Button */}
      <TouchableOpacity style={styles.addButton} onPress={openCreateCollection}>
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <Path
            d="M10 4.16669V15.8334M4.16666 10H15.8333"
            stroke={BrandColors.white}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <TouchableOpacity style={styles.header} onPress={scrollToTop}>
        <Text style={styles.title}>collections</Text>
      </TouchableOpacity>

      {/* Collections List */}
      <FlatList
        ref={flatListRef}
        data={filteredCollections}
        renderItem={renderCollectionSection}
        keyExtractor={(collection) => collection.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 10 },
        ]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.white,
  },
  header: {
    paddingHorizontal: 12,
    paddingBottom: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.Hellix.Bold,
    color: BrandColors.primary,
  },
  content: {
    paddingHorizontal: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: BrandColors.primaryBlack,
    justifyContent: "center",
    alignItems: "center",
  },
  collectionSection: {
    marginBottom: 8,
    // backgroundColor: "red",
  },
  collectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 0,
  },
  collectionName: {
    fontSize: 18,
    fontFamily: Fonts.MonaSans.Bold,
    color: BrandColors.primaryBlack,
  },
  outfitsList: {
    paddingLeft: 0,
  },
  outfitCardWrapper: {
    width: OUTFIT_CARD_WIDTH,
  },
});
