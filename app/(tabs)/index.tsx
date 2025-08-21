import { SearchIcon } from "@/components/icons/TabIcons";
import { OutfitCard } from "@/components/OutfitCard";
import { InputField } from "@/components/ui";
import { BrandColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { dummyCollections, dummyOutfits } from "@/types/outfit";
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

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filters = [
    { name: "All", count: dummyOutfits.length },
    {
      name: "Party",
      count: dummyCollections.find((c) => c.name === "Party")
        ? dummyOutfits.filter((o) =>
            o.collections?.some((c) => c.name === "Party")
          ).length
        : 21,
    },
    {
      name: "Work/Office",
      count: dummyCollections.find((c) => c.name === "Work/Office")
        ? dummyOutfits.filter((o) =>
            o.collections?.some((c) => c.name === "Work/Office")
          ).length
        : 14,
    },
  ];

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
    if (isOdd) return null; // Skip odd indices as they're handled by even indices

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

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>outfits</Text>
      </View>

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
      </ScrollView>

      {/* Outfits Grid */}
      <FlatList
        data={filteredOutfits}
        renderItem={renderOutfitPair}
        keyExtractor={(item, index) => `pair-${index}`}
        contentContainerStyle={[
          styles.outfitsContainer,
          { paddingBottom: insets.bottom + 20 },
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
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.Hellix.Bold,
    color: BrandColors.primary,
  },
  searchContainer: {
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Mona-Sans-Regular",
    color: BrandColors.primaryBlack,
  },
  filtersContainer: {
    paddingBottom: 16,
  },
  filtersContent: {
    paddingHorizontal: 12,
    gap: 12,
  },
  filterPill: {
    backgroundColor: BrandColors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: BrandColors.blackLighter,
  },
  activeFilterPill: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
  },
  filterText: {
    fontSize: 14,
    fontFamily: "Mona-Sans-Medium",
    color: BrandColors.black3,
  },
  activeFilterText: {
    color: BrandColors.white,
  },
  outfitsContainer: {
    paddingHorizontal: 12,
  },
  outfitRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  outfitColumn: {
    flex: 1,
  },
});
