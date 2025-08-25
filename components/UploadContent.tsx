import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { BrandColors } from "@/constants/Colors";
import { Fonts, FontStyles } from "@/constants/Fonts";
import {
  GalleryIcon,
  CameraIcon,
  BrowserIcon,
  TikTokIcon,
  PinterestIcon,
  InstagramIcon,
  FacebookIcon,
  ArrowRightIcon,
} from "@/components/icons";

export const UploadContent: React.FC = () => {
  const handleOptionPress = (option: string) => {
    Alert.alert("Upload Option", `Selected: ${option}`);
  };

  const uploadDirectOptions = [
    {
      id: "gallery",
      title: "Select from Gallery",
      icon: <GalleryIcon width={24} height={24} fill="#050413" />,
      onPress: () => handleOptionPress("Gallery"),
    },
    {
      id: "camera",
      title: "Camera",
      icon: <CameraIcon width={24} height={24} fill="#050413" />,
      onPress: () => handleOptionPress("Camera"),
    },
    {
      id: "browser",
      title: "Browser",
      icon: <BrowserIcon width={24} height={24} fill="#050413" />,
      onPress: () => handleOptionPress("Browser"),
    },
  ];

  const socialImportOptions = [
    {
      id: "tiktok",
      title: "TikTok",
      icon: <TikTokIcon width={24} height={24} />,
      onPress: () => handleOptionPress("TikTok"),
    },
    {
      id: "pinterest",
      title: "Pinterest",
      icon: <PinterestIcon width={24} height={24} />,
      onPress: () => handleOptionPress("Pinterest"),
    },
    {
      id: "instagram",
      title: "Instagram",
      icon: <InstagramIcon width={24} height={24} />,
      onPress: () => handleOptionPress("Instagram"),
    },
    {
      id: "facebook",
      title: "Facebook",
      icon: <FacebookIcon width={24} height={24} />,
      onPress: () => handleOptionPress("Facebook"),
    },
  ];

  return (
    <View style={styles.container}>
      {/* <View style={styles.section}>

      </View> */}
      {uploadDirectOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.option}
          onPress={option.onPress}
        >
          <View style={styles.optionLeft}>
            <View style={styles.iconContainer}>{option.icon}</View>
            <Text style={styles.optionText}>{option.title}</Text>
          </View>
          <ArrowRightIcon width={24} height={24} />
        </TouchableOpacity>
      ))}

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Import from socials</Text>
      {socialImportOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.option}
          onPress={option.onPress}
        >
          <View style={styles.optionLeft}>
            <View style={styles.iconContainer}>{option.icon}</View>
            <Text style={styles.optionText}>{option.title}</Text>
          </View>
          <ArrowRightIcon width={24} height={24} />
        </TouchableOpacity>
      ))}
      {/* </View> */}

      {/* Import from socials section */}
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Import from socials</Text>
        {socialImportOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.option}
            onPress={option.onPress}
          >
            <View style={styles.optionLeft}>
              <View style={styles.iconContainer}>{option.icon}</View>
              <Text style={styles.optionText}>{option.title}</Text>
            </View>
            <ArrowRightIcon width={24} height={24} />
          </TouchableOpacity>
        ))}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 54,
    display: "flex",
    gap: 27,
  },
  // section: {
  //   marginBottom: 24,
  // },
  sectionTitle: {
    // ...FontStyles.body,
    // fontFamily: Fonts.MonaSans.Bold,
    // color: BrandColors.primaryBlack,
    // // marginBottom: 12,
    // fontSize: 16,

    fontSize: 14,
    fontFamily: Fonts.MonaSans.SemiBold,
    color: BrandColors.black3,
    lineHeight: 18,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingVertical: 16,
    // paddingHorizontal: 4,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  optionText: {
    ...FontStyles.body,
    fontFamily: Fonts.MonaSans.SemiBold,
    color: BrandColors.primaryBlack,
    fontSize: 16,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#ECEDF0",
  },
});
