import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { BrandColors } from '@/constants/Colors';
import { Fonts, FontStyles } from '@/constants/Fonts';
import {
  GalleryIcon,
  CameraIcon,
  BrowserIcon,
  TikTokIcon,
  PinterestIcon,
  InstagramIcon,
  FacebookIcon,
  ArrowRightIcon,
} from '@/components/icons';

interface UploadBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
}

export const UploadBottomSheet: React.FC<UploadBottomSheetProps> = ({
  bottomSheetRef,
}) => {
  const snapPoints = React.useMemo(() => ['60%'], []);

  const renderBackdrop = React.useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  const handleOptionPress = (option: string) => {
    Alert.alert('Upload Option', `Selected: ${option}`);
    bottomSheetRef.current?.close();
  };

  const uploadDirectOptions = [
    {
      id: 'gallery',
      title: 'Select from Gallery',
      icon: <GalleryIcon width={24} height={24} fill="#050413" />,
      onPress: () => handleOptionPress('Gallery'),
    },
    {
      id: 'camera',
      title: 'Camera',
      icon: <CameraIcon width={24} height={24} fill="#050413" />,
      onPress: () => handleOptionPress('Camera'),
    },
    {
      id: 'browser',
      title: 'Browser',
      icon: <BrowserIcon width={24} height={24} fill="#050413" />,
      onPress: () => handleOptionPress('Browser'),
    },
  ];

  const socialImportOptions = [
    {
      id: 'tiktok',
      title: 'TikTok',
      icon: <TikTokIcon width={24} height={24} />,
      onPress: () => handleOptionPress('TikTok'),
    },
    {
      id: 'pinterest',
      title: 'Pinterest',
      icon: <PinterestIcon width={24} height={24} />,
      onPress: () => handleOptionPress('Pinterest'),
    },
    {
      id: 'instagram',
      title: 'Instagram',
      icon: <InstagramIcon width={24} height={24} />,
      onPress: () => handleOptionPress('Instagram'),
    },
    {
      id: 'facebook',
      title: 'Facebook',
      icon: <FacebookIcon width={24} height={24} />,
      onPress: () => handleOptionPress('Facebook'),
    },
  ];

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.background}
    >
      <BottomSheetView style={styles.container}>
        {/* Upload directly section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upload directly</Text>
          {uploadDirectOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.option}
              onPress={option.onPress}
            >
              <View style={styles.optionLeft}>
                <View style={styles.iconContainer}>
                  {option.icon}
                </View>
                <Text style={styles.optionText}>{option.title}</Text>
              </View>
              <ArrowRightIcon width={20} height={20} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Import from socials section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Import from socials</Text>
          {socialImportOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.option}
              onPress={option.onPress}
            >
              <View style={styles.optionLeft}>
                <View style={styles.iconContainer}>
                  {option.icon}
                </View>
                <Text style={styles.optionText}>{option.title}</Text>
              </View>
              <ArrowRightIcon width={20} height={20} />
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  handleIndicator: {
    backgroundColor: BrandColors.black4,
    width: 40,
    height: 4,
  },
  background: {
    backgroundColor: BrandColors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    ...FontStyles.caption,
    fontFamily: Fonts.MonaSans.Medium,
    color: BrandColors.black3,
    textTransform: 'uppercase',
    marginBottom: 16,
    fontSize: 12,
    letterSpacing: 0.5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.black5,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionText: {
    ...FontStyles.body,
    fontFamily: Fonts.MonaSans.Medium,
    color: BrandColors.primaryBlack,
    fontSize: 16,
  },
});
