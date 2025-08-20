import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BrandColors } from '@/constants/Colors';

export default function ExampleScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Brand Colors Demo */}
        <View style={styles.section}>
          <ThemedText type="heading1" style={styles.sectionTitle}>
            Brand Colors
          </ThemedText>
          
          <View style={styles.colorRow}>
            <View style={[styles.colorBox, { backgroundColor: BrandColors.primary }]} />
            <ThemedText type="body">Primary (#DB0F4B)</ThemedText>
          </View>
          
          <View style={styles.colorRow}>
            <View style={[styles.colorBox, { backgroundColor: BrandColors.primaryBlack }]} />
            <ThemedText type="body">Primary Black (#050413)</ThemedText>
          </View>
          
          <View style={styles.colorRow}>
            <View style={[styles.colorBox, { backgroundColor: BrandColors.primaryLighter }]} />
            <ThemedText type="body">Primary Lighter (#FDE2EA)</ThemedText>
          </View>
        </View>

        {/* Typography Demo */}
        <View style={styles.section}>
          <ThemedText type="heading1" style={styles.sectionTitle}>
            Typography System
          </ThemedText>
          
          <ThemedText type="heading1">Heading 1 - Mona Sans Bold</ThemedText>
          <ThemedText type="heading2">Heading 2 - Mona Sans SemiBold</ThemedText>
          <ThemedText type="heading3">Heading 3 - Mona Sans SemiBold</ThemedText>
          <ThemedText type="title">Title - Mona Sans Medium</ThemedText>
          <ThemedText type="subtitle">Subtitle - Mona Sans Medium</ThemedText>
          <ThemedText type="defaultSemiBold">Default SemiBold - Mona Sans SemiBold</ThemedText>
          
          <View style={styles.spacer} />
          
          <ThemedText type="body">Body - Mona Sans Regular</ThemedText>
          <ThemedText type="default">Default - Mona Sans Regular</ThemedText>
          <ThemedText type="caption">Caption - Mona Sans Regular</ThemedText>
          
          <View style={styles.spacer} />
          
          <View style={[styles.button, { backgroundColor: BrandColors.primary }]}>
            <ThemedText type="button" style={styles.buttonText}>
              Button Text - Mona Sans Medium
            </ThemedText>
          </View>
        </View>

        {/* Sample Card */}
        <View style={styles.section}>
          <ThemedText type="heading2" style={styles.sectionTitle}>
            Sample Outfit Card
          </ThemedText>
          
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <ThemedText type="title">Summer Casual</ThemedText>
              <View style={[styles.badge, { backgroundColor: BrandColors.primaryLighter }]}>
                <ThemedText type="caption" style={{ color: BrandColors.primary }}>
                  Favorite
                </ThemedText>
              </View>
            </View>
            
            <ThemedText type="body" style={styles.cardDescription}>
              Perfect for sunny days and casual outings. Comfortable and stylish.
            </ThemedText>
            
            <View style={styles.cardActions}>
              <View style={[styles.button, { backgroundColor: BrandColors.primary }]}>
                <ThemedText type="button" style={styles.buttonText}>
                  Wear Today
                </ThemedText>
              </View>
              
              <View style={[styles.button, styles.secondaryButton]}>
                <ThemedText type="button" style={{ color: BrandColors.primary }}>
                  Edit Outfit
                </ThemedText>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
    color: BrandColors.primary,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: BrandColors.black4,
  },
  spacer: {
    height: 16,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: BrandColors.primary,
  },
  buttonText: {
    color: BrandColors.white,
  },
  card: {
    backgroundColor: BrandColors.primaryWhite,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: BrandColors.black4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  cardDescription: {
    marginBottom: 16,
    color: BrandColors.black3,
  },
  cardActions: {
    flexDirection: 'row',
  },
});
