import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { BrandColors } from '@/constants/Colors';
import { FontStyles } from '@/constants/Fonts';
import { Button } from '@/components/ui';
import { useAuthStore } from '@/store/authStore';

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const { user, isLoading, logout, fetchProfile } = useAuthStore();

  useEffect(() => {
    // Fetch latest profile data when component mounts
    fetchProfile().catch(console.error);
  }, [fetchProfile]);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/onboarding');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleRefresh = async () => {
    try {
      await fetchProfile();
    } catch (error) {
      console.error('Refresh error:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.userName}>{user?.fullName || 'User'}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: Math.max(insets.bottom, 24) },
        ]}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <Text style={styles.cardTitle}>Your Profile</Text>
          
          <View style={styles.profileInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{user?.email}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Full Name:</Text>
              <Text style={styles.infoValue}>{user?.fullName}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Member since:</Text>
              <Text style={styles.infoValue}>
                {user?.createdAt ? formatDate(user.createdAt) : 'Unknown'}
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>User ID:</Text>
              <Text style={styles.infoValue}>{user?.id}</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsCard}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          
          <Button
            title="View Outfits"
            onPress={() => router.push('/(tabs)')}
            variant="outline"
            fullWidth
            style={styles.actionButton}
          />
          
          <Button
            title="Create New Outfit"
            onPress={() => {
              router.push('/(tabs)');
              // Navigate to create outfit flow
            }}
            variant="primary"
            fullWidth
            style={styles.actionButton}
          />
          
          <Button
            title="Profile Settings"
            onPress={() => {
              // Navigate to profile settings
              console.log('Navigate to profile settings');
            }}
            variant="outline"
            fullWidth
            style={styles.actionButton}
          />
        </View>

        {/* Stats Card (placeholder for future features) */}
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Your Stats</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Outfits Created</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Collections</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Shared</Text>
            </View>
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.black4,
  },
  welcomeText: {
    ...FontStyles.body,
    color: BrandColors.black3,
    marginBottom: 4,
  },
  userName: {
    ...FontStyles.heading3,
    color: BrandColors.primaryBlack,
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: BrandColors.primaryLighter,
  },
  logoutButtonText: {
    ...FontStyles.buttonSmall,
    color: BrandColors.primary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: BrandColors.primaryWhite,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: BrandColors.black4,
  },
  cardTitle: {
    ...FontStyles.heading4,
    color: BrandColors.primaryBlack,
    marginBottom: 16,
  },
  profileInfo: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    ...FontStyles.bodyMedium,
    color: BrandColors.black3,
    flex: 1,
  },
  infoValue: {
    ...FontStyles.body,
    color: BrandColors.primaryBlack,
    flex: 2,
    textAlign: 'right',
  },
  actionsCard: {
    backgroundColor: BrandColors.primaryWhite,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: BrandColors.black4,
  },
  actionButton: {
    marginBottom: 12,
  },
  statsCard: {
    backgroundColor: BrandColors.primaryWhite,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: BrandColors.black4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 8,
  },
  statNumber: {
    ...FontStyles.heading2,
    color: BrandColors.primary,
    marginBottom: 4,
  },
  statLabel: {
    ...FontStyles.caption,
    color: BrandColors.black3,
    textAlign: 'center',
  },
});
