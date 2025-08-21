import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BrandColors } from '@/constants/Colors';
import { FontStyles } from '@/constants/Fonts';
import { Button } from '@/components/ui';
import { useAuthGuard } from '@/hooks/useAuth';

// Mock data for inspiration collections
const mockCollections = [
  {
    id: '1',
    title: 'Summer Vibes',
    count: 24,
    color: '#3B82F6', // Blue
  },
  {
    id: '2',
    title: 'Work Attire',
    count: 18,
    color: '#10B981', // Green
  },
  {
    id: '3',
    title: 'Casual Friday',
    count: 12,
    color: '#F59E0B', // Orange
  },
  {
    id: '4',
    title: 'Date Night',
    count: 8,
    color: BrandColors.primary,
  },
];

const mockTrends = [
  'Oversized Blazers',
  'Vintage Denim',
  'Minimalist Jewelry',
  'Earth Tones',
  'Sustainable Fashion',
];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const { isAuthenticated, isLoading } = useAuthGuard();

  if (isLoading || !isAuthenticated) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const renderCollectionItem = ({ item }: { item: typeof mockCollections[0] }) => (
    <TouchableOpacity style={styles.collectionCard}>
      <View style={[styles.collectionIcon, { backgroundColor: item.color }]} />
      <View style={styles.collectionInfo}>
        <Text style={styles.collectionTitle}>{item.title}</Text>
        <Text style={styles.collectionCount}>{item.count} outfits</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <Text style={styles.headerSubtitle}>
          Discover outfit inspiration and trends
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: Math.max(insets.bottom, 24) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Search and Filter */}
        <View style={styles.searchSection}>
          <TouchableOpacity style={styles.searchBar}>
            <Text style={styles.searchPlaceholder}>
              Search for outfits, styles, or trends...
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Trending */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendsContainer}
          >
            {mockTrends.map((trend, index) => (
              <TouchableOpacity key={index} style={styles.trendTag}>
                <Text style={styles.trendText}>{trend}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Collections */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Collections</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={mockCollections}
            renderItem={renderCollectionItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>

        {/* Action Section */}
        <View style={styles.actionSection}>
          <Text style={styles.sectionTitle}>Get Started</Text>
          <Button
            title="Create Your First Collection"
            onPress={() => {
              console.log('Create collection');
            }}
            variant="primary"
            fullWidth
            style={styles.actionButton}
          />
          <Button
            title="Browse All Outfits"
            onPress={() => {
              console.log('Browse outfits');
            }}
            variant="outline"
            fullWidth
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BrandColors.white,
  },
  loadingText: {
    ...FontStyles.body,
    color: BrandColors.black3,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.black4,
  },
  headerTitle: {
    ...FontStyles.heading2,
    color: BrandColors.primaryBlack,
    marginBottom: 4,
  },
  headerSubtitle: {
    ...FontStyles.body,
    color: BrandColors.black3,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  searchSection: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    backgroundColor: BrandColors.primaryWhite,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: BrandColors.black4,
  },
  searchPlaceholder: {
    ...FontStyles.body,
    color: BrandColors.black3,
  },
  filterButton: {
    backgroundColor: BrandColors.primary,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    justifyContent: 'center',
  },
  filterText: {
    ...FontStyles.bodyMedium,
    color: BrandColors.white,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    ...FontStyles.heading3,
    color: BrandColors.primaryBlack,
  },
  seeAllText: {
    ...FontStyles.bodyMedium,
    color: BrandColors.primary,
    textDecorationLine: 'underline',
  },
  trendsContainer: {
    paddingVertical: 8,
    gap: 12,
  },
  trendTag: {
    backgroundColor: BrandColors.primaryLighter,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  trendText: {
    ...FontStyles.bodyMedium,
    color: BrandColors.primary,
  },
  collectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.primaryWhite,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: BrandColors.black4,
  },
  collectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  collectionInfo: {
    flex: 1,
  },
  collectionTitle: {
    ...FontStyles.bodyMedium,
    color: BrandColors.primaryBlack,
    marginBottom: 4,
  },
  collectionCount: {
    ...FontStyles.caption,
    color: BrandColors.black3,
  },
  separator: {
    height: 12,
  },
  actionSection: {
    marginTop: 20,
  },
  actionButton: {
    marginBottom: 12,
  },
});


