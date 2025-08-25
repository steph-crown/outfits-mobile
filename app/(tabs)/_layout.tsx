import React from "react";
import { Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import {
  HomeIcon,
  SearchIcon,
  CollectionsIcon,
  PlusIcon,
} from "@/components/icons/TabIcons";
import { BrandColors } from "@/constants/Colors";
import { useAuthStore } from "@/store/authStore";
import { Fonts } from "@/constants/Fonts";
import { scrollHomeToTop } from "./index";
import { scrollCollectionsToTop } from "./collections";
import {
  BottomSheetProvider,
  useBottomSheet,
} from "@/contexts/BottomSheetContext";
import { CollectionsProvider } from "@/contexts/CollectionsContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { UploadContent } from "../../components/UploadContent";

// Component that handles the tab navigation with bottom sheet integration
function TabsContent() {
  const { openBottomSheet } = useBottomSheet();
  const { user } = useAuthStore();

  // Get user's initials for profile tab
  const getUserInitials = () => {
    if (user?.fullName) {
      const names = user.fullName.split(" ");
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      }
      return names[0][0].toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  const ProfileIcon = ({ focused }: { focused: boolean }) => (
    <View
      style={[
        styles.profileIcon,
        { backgroundColor: focused ? BrandColors.primary : BrandColors.black3 },
      ]}
    >
      <Text
        style={[
          styles.profileText,
          { color: focused ? BrandColors.white : BrandColors.white },
        ]}
      >
        {getUserInitials()}
      </Text>
    </View>
  );

  const handleAddPress = () => {
    openBottomSheet({
      title: "Add Outfit",
      content: <UploadContent />,
    });
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarActiveTintColor: BrandColors.primaryBlack,
        tabBarInactiveTintColor: BrandColors.black2,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Outfits",
          tabBarIcon: ({ focused }) => (
            <HomeIcon selected={focused} size={28} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabBarLabel,
                {
                  fontFamily: focused
                    ? Fonts.MonaSans.Bold
                    : Fonts.MonaSans.SemiBold,
                  color: focused
                    ? BrandColors.primaryBlack
                    : BrandColors.black2,
                },
              ]}
            >
              Outfits
            </Text>
          ),
        }}
        listeners={{
          tabPress: (e) => {
            // Scroll to top when tab is pressed
            scrollHomeToTop();
          },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <SearchIcon selected={focused} size={28} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabBarLabel,
                {
                  fontFamily: focused
                    ? Fonts.MonaSans.Bold
                    : Fonts.MonaSans.SemiBold,
                  color: focused
                    ? BrandColors.primaryBlack
                    : BrandColors.black2,
                },
              ]}
            >
              Explore
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "",
          tabBarIcon: () => (
            <View style={styles.addButton}>
              <PlusIcon size={28} />
            </View>
          ),
          tabBarLabel: () => null,
        }}
        listeners={{
          tabPress: (e) => {
            // Prevent default navigation
            e.preventDefault();
            // Open bottom sheet instead
            handleAddPress();
          },
        }}
      />
      <Tabs.Screen
        name="collections"
        options={{
          title: "Collections",
          tabBarIcon: ({ focused }) => (
            <CollectionsIcon selected={focused} size={28} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabBarLabel,
                {
                  fontFamily: focused
                    ? Fonts.MonaSans.Bold
                    : Fonts.MonaSans.SemiBold,
                  color: focused
                    ? BrandColors.primaryBlack
                    : BrandColors.black2,
                },
              ]}
            >
              Collections
            </Text>
          ),
        }}
        listeners={{
          tabPress: (e) => {
            // Scroll to top when tab is pressed
            scrollCollectionsToTop();
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => <ProfileIcon focused={focused} />,
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabBarLabel,
                {
                  fontFamily: focused
                    ? Fonts.MonaSans.Bold
                    : Fonts.MonaSans.SemiBold,
                  color: focused
                    ? BrandColors.primaryBlack
                    : BrandColors.black2,
                },
              ]}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <BottomSheetModalProvider>
      <BottomSheetProvider>
        <CollectionsProvider>
          <TabsContent />
        </CollectionsProvider>
      </BottomSheetProvider>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: BrandColors.white,
    borderTopWidth: 1,
    borderTopColor: BrandColors.blackLighter,
    height: 72,
    paddingHorizontal: 2,
    paddingTop: 0,
    paddingBottom: 0,
  },
  tabBarItem: {
    // backgroundColor: "red",
    height: 72,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
  },
  tabBarIcon: {
    marginBottom: 2,
  },
  tabBarLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  addButton: {
    width: 52,
    height: 52,
    borderRadius: 28,
    backgroundColor: BrandColors.primaryBlack,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
    borderWidth: 2,
    borderColor: BrandColors.blackLighter,
    borderStyle: "solid",
  },
  profileIcon: {
    width: 28,
    height: 28,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    fontSize: 12,
    fontFamily: "Mona-Sans-SemiBold",
  },
});
