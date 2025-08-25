import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BrandColors } from '@/constants/Colors';
import { router } from 'expo-router';

export default function AddScreen() {
  const insets = useSafeAreaInsets();

  // This screen should not be reached since we prevent navigation in the tab listener
  // But if it somehow gets reached, redirect back
  useEffect(() => {
    router.back();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Empty placeholder - this screen should not be visible */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.white,
  },
});
