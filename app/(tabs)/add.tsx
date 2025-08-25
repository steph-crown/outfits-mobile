import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BrandColors } from '@/constants/Colors';
import { UploadBottomSheet } from '@/components/UploadBottomSheet';

export default function AddScreen() {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // Open the bottom sheet when this screen is focused
  useEffect(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <UploadBottomSheet 
        bottomSheetRef={bottomSheetRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.white,
  },
});
