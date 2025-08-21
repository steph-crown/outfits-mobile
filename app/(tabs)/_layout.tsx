import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { HomeIcon, SearchIcon, CollectionsIcon, PlusIcon } from '@/components/icons/TabIcons';
import { BrandColors } from '@/constants/Colors';
import { useAuthStore } from '@/store/authStore';

export default function TabLayout() {
  const { user } = useAuthStore();

  // Get user's initials for profile tab
  const getUserInitials = () => {
    if (user?.fullName) {
      const names = user.fullName.split(' ');
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      }
      return names[0][0].toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  const ProfileIcon = ({ focused }: { focused: boolean }) => (
    <View style={[
      styles.profileIcon,
      { backgroundColor: focused ? BrandColors.primary : BrandColors.black3 }
    ]}>
      <Text style={[
        styles.profileText,
        { color: focused ? BrandColors.white : BrandColors.white }
      ]}>
        {getUserInitials()}
      </Text>
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: BrandColors.primaryBlack,
        tabBarInactiveTintColor: '#828282',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Outfits',
          tabBarIcon: ({ focused }) => <HomeIcon selected={focused} size={24} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => <SearchIcon selected={focused} size={24} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: '',
          tabBarIcon: () => (
            <View style={styles.addButton}>
              <PlusIcon size={24} />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="collections"
        options={{
          title: 'Collections',
          tabBarIcon: ({ focused }) => <CollectionsIcon selected={focused} size={24} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <ProfileIcon focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: BrandColors.white,
    borderTopWidth: 1,
    borderTopColor: BrandColors.blackLighter,
    paddingTop: 10,
    paddingBottom: 34, // Account for safe area
    height: 90,
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: 'Mona-Sans-Medium',
    marginTop: 4,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: BrandColors.primaryBlack,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -8,
  },
  profileIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 12,
    fontFamily: 'Mona-Sans-SemiBold',
  },
});
