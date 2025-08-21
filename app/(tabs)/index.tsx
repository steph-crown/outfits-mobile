import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchIcon } from '@/components/icons/TabIcons';
import { BrandColors } from '@/constants/Colors';
import { OutfitCard } from '@/components/OutfitCard';
import { dummyOutfits, dummyCollections } from '@/types/outfit';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = React.useState('All');

  const filters = [
    { name: 'All', count: dummyOutfits.length },
    { name: 'Party', count: dummyCollections.find(c => c.name === 'Party') ? dummyOutfits.filter(o => o.collections?.some(c => c.name === 'Party')).length : 21 },
    { name: 'Work/Office', count: dummyCollections.find(c => c.name === 'Work/Office') ? dummyOutfits.filter(o => o.collections?.some(c => c.name === 'Work/Office')).length : 14 },
  ];

  const filteredOutfits = selectedFilter === 'All' 
    ? dummyOutfits 
    : dummyOutfits.filter(outfit => 
        outfit.collections?.some(collection => collection.name === selectedFilter)
      );

  const renderOutfitPair = ({ item, index }: { item: any, index: number }) => {
    const isOdd = index % 2 === 1;
    if (isOdd) return null; // Skip odd indices as they're handled by even indices

    const leftOutfit = filteredOutfits[index];
    const rightOutfit = filteredOutfits[index + 1];

    return (
      <View style={styles.outfitRow}>
        <View style={styles.outfitColumn}>
          <OutfitCard outfit={leftOutfit} onPress={() => console.log('Outfit pressed:', leftOutfit.id)} />
        </View>
        {rightOutfit && (
          <View style={styles.outfitColumn}>
            <OutfitCard outfit={rightOutfit} onPress={() => console.log('Outfit pressed:', rightOutfit.id)} />
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
        <View style={styles.searchBar}>
          <SearchIcon size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search outfits"
            placeholderTextColor={BrandColors.black3}
          />
        </View>
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
          { paddingBottom: insets.bottom + 20 }
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Mona-Sans-Bold',
    color: BrandColors.primary,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.primaryWhite,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: BrandColors.blackLighter,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Mona-Sans-Regular',
    color: BrandColors.primaryBlack,
  },
  filtersContainer: {
    paddingBottom: 16,
  },
  filtersContent: {
    paddingHorizontal: 20,
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
    fontFamily: 'Mona-Sans-Medium',
    color: BrandColors.black3,
  },
  activeFilterText: {
    color: BrandColors.white,
  },
  outfitsContainer: {
    paddingHorizontal: 20,
  },
  outfitRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  outfitColumn: {
    flex: 1,
  },
});
