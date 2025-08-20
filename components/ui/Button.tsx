import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from "react-native";
import { BrandColors } from "@/constants/Colors";
import { FontStyles } from "@/constants/Fonts";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  style,
  textStyle,
}: ButtonProps) {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.baseText,
    styles[`${variant}Text` as keyof typeof styles],
    styles[`${size}Text` as keyof typeof styles],
    disabled && styles.disabledText,
    textStyle,
  ];

  const handlePress = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.contentContainer}>
          <ActivityIndicator
            size="small"
            color={
              variant === "primary"
                ? BrandColors.primaryWhite
                : BrandColors.primary
            }
          />
          <Text style={[textStyles, { marginLeft: 8 }]}>{title}</Text>
        </View>
      );
    }

    if (icon) {
      return (
        <View style={styles.contentContainer}>
          {iconPosition === "left" && icon}
          <Text style={textStyles}>{title}</Text>
          {iconPosition === "right" && icon}
        </View>
      );
    }

    return <Text style={textStyles}>{title}</Text>;
  };

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={handlePress}
      activeOpacity={disabled ? 1 : 0.8}
      disabled={disabled || loading}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fullWidth: {
    width: "100%",
  },

  // Variants
  primary: {
    backgroundColor: BrandColors.primaryBlack,
  },
  secondary: {
    backgroundColor: BrandColors.blackLighter,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: BrandColors.primary,
  },
  ghost: {
    backgroundColor: "transparent",
  },

  // Sizes
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  medium: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    minHeight: 48,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 52,
  },

  // States
  disabled: {
    opacity: 0.5,
  },

  // Text styles
  baseText: {
    ...FontStyles.button,
    textAlign: "center",
  },
  primaryText: {
    color: BrandColors.primaryWhite,
  },
  secondaryText: {
    color: BrandColors.primaryBlack,
  },
  outlineText: {
    color: BrandColors.primary,
  },
  ghostText: {
    color: BrandColors.primary,
  },
  disabledText: {
    opacity: 0.7,
  },

  // Size-specific text styles
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 18,
  },
});
