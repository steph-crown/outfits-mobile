import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { BrandColors } from '@/constants/Colors';
import { FontStyles } from '@/constants/Fonts';
import { Button } from '@/components/ui';
import { useAuthGuard } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { isAuthenticated, isLoading } = useAuthGuard();
  const { user, logout } = useAuthStore();

  if (isLoading || !isAuthenticated) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.replace('/onboarding');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Hello!</Text>
          <Text style={styles.userName}>{user?.fullName || 'User'}</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/dashboard')}>
          <Text style={styles.dashboardLink}>Dashboard</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: Math.max(insets.bottom, 24) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.sectionTitle}>Welcome to OutFits!</Text>
          <Text style={styles.sectionDescription}>
            Organize your outfit inspiration effortlessly. Start by exploring
            your collections or create your first outfit.
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <Button
            title="Create New Outfit"
            onPress={() => {
              console.log('Create new outfit');
            }}
            variant="primary"
            fullWidth
            style={styles.actionButton}
          />
          
          <Button
            title="Browse Collections"
            onPress={() => {
              console.log('Browse collections');
            }}
            variant="outline"
            fullWidth
            style={styles.actionButton}
          />
          
          <Button
            title="View Dashboard"
            onPress={() => router.push('/dashboard')}
            variant="outline"
            fullWidth
            style={styles.actionButton}
          />
        </View>

        {/* Recent Activity */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No recent activity yet. Start creating outfits to see them here!
            </Text>
          </View>
        </View>

        {/* Debug Section */}
        <View style={styles.debugSection}>
          <Button
            title="Logout"
            onPress={handleLogout}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.black4,
  },
  welcomeText: {
    ...FontStyles.body,
    color: BrandColors.black3,
    marginBottom: 4,
  },
  userName: {
    ...FontStyles.heading4,
    color: BrandColors.primaryBlack,
  },
  dashboardLink: {
    ...FontStyles.bodyMedium,
    color: BrandColors.primary,
    textDecorationLine: 'underline',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  welcomeSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    ...FontStyles.heading3,
    color: BrandColors.primaryBlack,
    marginBottom: 12,
  },
  sectionDescription: {
    ...FontStyles.body,
    color: BrandColors.black3,
    lineHeight: 22,
  },
  actionsSection: {
    marginBottom: 32,
  },
  actionButton: {
    marginBottom: 12,
  },
  recentSection: {
    marginBottom: 32,
  },
  emptyState: {
    backgroundColor: BrandColors.primaryWhite,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BrandColors.black4,
  },
  emptyStateText: {
    ...FontStyles.body,
    color: BrandColors.black3,
    textAlign: 'center',
  },
  debugSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: BrandColors.black4,
  },
});
