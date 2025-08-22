import { BrandColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

interface CustomBottomSheetProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export const CustomBottomSheet = forwardRef<
  BottomSheet,
  CustomBottomSheetProps
>(({ title, children, onClose }, ref) => {
  // Bottom sheet snap points

  // Backdrop component
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      // snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      onClose={onClose}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>{children}</View>
      </BottomSheetView>
    </BottomSheet>
  );
});

CustomBottomSheet.displayName = "CustomBottomSheet";

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: BrandColors.white,
    // backgroundColor: "red",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handleIndicator: {
    backgroundColor: BrandColors.black4,
    width: 40,
    height: 4,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 22,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 14,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.MonaSans.SemiBold,
    color: BrandColors.black3,
    lineHeight: 18,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingTop: 24,
  },
});
