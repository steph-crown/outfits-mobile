import { SearchIcon } from "@/components/icons/TabIcons";
import { OutfitCard } from "@/components/OutfitCard";
import { InputField } from "@/components/ui";
import { BrandColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { dummyCollections, dummyOutfits } from "@/types/outfit";
import { useLocalSearchParams, router } from "expo-router";
import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

export default function CollectionFilterScreen() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const collectionName = params.collection as string;
  const [searchQuery, setSearchQuery] = React.useState("");
  const flatListRef = React.useRef<FlatList>(null);

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  // Create filters with the selected collection first
  const filters = [
    {
      name: collectionName,
      count: dummyOutfits.filter((o) =>
        o.collections?.some((c) => c.name === collectionName)
      ).length,
    },
    { name: "All", count: dummyOutfits.length },
    ...dummyCollections
      .filter((c) => c.name !== collectionName)
      .map((c) => ({
        name: c.name,
        count: dummyOutfits.filter((o) =>
          o.collections?.some((col) => col.name === c.name)
        ).length,
      })),
  ];

  const [selectedFilter, setSelectedFilter] = React.useState(collectionName);

  const filteredOutfits =
    selectedFilter === "All"
      ? dummyOutfits
      : dummyOutfits.filter((outfit) =>
          outfit.collections?.some(
            (collection) => collection.name === selectedFilter
          )
        );

  const renderOutfitPair = ({ item, index }: { item: any; index: number }) => {
    const isOdd = index % 2 === 1;
    if (isOdd) return null;

    const leftOutfit = filteredOutfits[index];
    const rightOutfit = filteredOutfits[index + 1];

    return (
      <View style={styles.outfitRow}>
        <View style={styles.outfitColumn}>
          <OutfitCard
            outfit={leftOutfit}
            onPress={() => console.log("Outfit pressed:", leftOutfit.id)}
          />
        </View>
        {rightOutfit && (
          <View style={styles.outfitColumn}>
            <OutfitCard
              outfit={rightOutfit}
              onPress={() => console.log("Outfit pressed:", rightOutfit.id)}
            />
          </View>
        )}
      </View>
    );
  };

  const renderHeader = () => (
    <>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <InputField
          label="Search outfits"
          value={searchQuery}
          onChangeText={(value) => setSearchQuery(value)}
          icon={<SearchIcon />}
          keyboardType="web-search"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Filter Pills */}
      <ScrollView
        horizontal
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
        showsHorizontalScrollIndicator={false}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.name}
            style={[
              styles.filterPill,
              selectedFilter === filter.name && styles.activeFilterPill,
            ]}
            onPress={() => setSelectedFilter(filter.name)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.name && styles.activeFilterText,
              ]}
            >
              {filter.name} {filter.count}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.filterPill]}
          onPress={() => {
            return;
          }}
        >
          <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <Path
              d="M12 8.66671H8.66668V12C8.66668 12.3667 8.36668 12.6667 8.00001 12.6667C7.63334 12.6667 7.33334 12.3667 7.33334 12V8.66671H4.00001C3.63334 8.66671 3.33334 8.36671 3.33334 8.00004C3.33334 7.63337 3.63334 7.33337 4.00001 7.33337H7.33334V4.00004C7.33334 3.63337 7.63334 3.33337 8.00001 3.33337C8.36668 3.33337 8.66668 3.63337 8.66668 4.00004V7.33337H12C12.3667 7.33337 12.6667 7.63337 12.6667 8.00004C12.6667 8.36671 12.3667 8.66671 12 8.66671Z"
              fill="#828282"
            />
          </Svg>
        </TouchableOpacity>
      </ScrollView>
    </>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M15 18L9 12L15 6"
              stroke={BrandColors.primaryBlack}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity onPress={scrollToTop} style={styles.titleContainer}>
          <Text style={styles.title}>outfits</Text>
        </TouchableOpacity>
        <View style={styles.placeholder} />
      </View>

      {/* Outfits Grid with Header */}
      <FlatList
        ref={flatListRef}
        data={filteredOutfits}
        renderItem={renderOutfitPair}
        keyExtractor={(item, index) => `pair-${index}`}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={[
          styles.outfitsContainer,
          { paddingBottom: insets.bottom + 10 },
        ]}
        showsVerticalScrollIndicator={false}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.Hellix.Bold,
    color: BrandColors.primary,
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  filtersContainer: {
    marginBottom: 4,
  },
  filtersContent: {
    paddingHorizontal: 12,
    gap: 12,
    height: 58,
  },
  filterPill: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: BrandColors.black4,
    height: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  activeFilterPill: {
    backgroundColor: BrandColors.primaryLighter,
    borderColor: "#E8E0E2",
  },
  filterText: {
    fontSize: 12,
    fontFamily: Fonts.MonaSans.SemiBold,
    color: BrandColors.black2,
    lineHeight: 14,
  },
  activeFilterText: {
    color: BrandColors.primary,
  },
  outfitsContainer: {
    paddingHorizontal: 12,
  },
  outfitRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 0,
  },
  outfitColumn: {
    flex: 1,
  },
});
