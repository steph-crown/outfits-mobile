import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TextInputProps,
  ViewStyle,
  StyleProp,
} from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { BrandColors } from "@/constants/Colors";
import { Fonts, FontStyles } from "@/constants/Fonts";

interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  isPassword?: boolean;
  isBottomSheet?: boolean;
  wrapperStyle?: StyleProp<ViewStyle>;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function InputField({
  label,
  icon,
  error,
  isPassword = false,
  isBottomSheet = false,
  onFocus,
  onBlur,
  value,
  onChangeText,
  placeholder,
  wrapperStyle,
  ...props
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!isPassword);
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;
  const textInputRef = useRef<TextInput>(null);
  const bottomSheetInputRef = useRef<any>(null);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
    Animated.timing(animatedIsFocused, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
    if (!value) {
      Animated.timing(animatedIsFocused, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelStyle = {
    position: "absolute" as const,
    // left: icon ? 54 : 24,
    left: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [icon ? 54 : 24, 24],
    }),
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -8],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [
        BrandColors.black3,
        isFocused ? BrandColors.primaryBlack : BrandColors.black3,
      ],
    }),
    backgroundColor: BrandColors.white,
    paddingHorizontal: 4,
    zIndex: 1,
    fontFamily: Fonts.MonaSans.Medium,
  };

  const containerStyle = [
    styles.container,
    {
      borderColor: error
        ? BrandColors.primary
        : isFocused
        ? BrandColors.primaryBlack
        : BrandColors.black4,
      borderWidth: isFocused || error ? 2 : 1,
    },
  ];

  return (
    <View style={wrapperStyle}>
      <View style={containerStyle}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}

        <TouchableOpacity
          style={styles.labelContainer}
          onPress={() => {
            if (isBottomSheet) {
              bottomSheetInputRef.current?.focus();
            } else {
              textInputRef.current?.focus();
            }
          }}
          activeOpacity={1}
        >
          <Animated.Text style={labelStyle}>{label}</Animated.Text>
        </TouchableOpacity>

        {isBottomSheet ? (
          <BottomSheetTextInput
            ref={bottomSheetInputRef}
            style={[styles.textInput, { paddingLeft: icon ? 56 : 24 }]}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={isPassword && !isPasswordVisible}
            placeholderTextColor={BrandColors.black3}
            {...props}
          />
        ) : (
          <TextInput
            ref={textInputRef}
            style={[styles.textInput, { paddingLeft: icon ? 56 : 24 }]}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={isPassword && !isPasswordVisible}
            placeholderTextColor={BrandColors.black3}
            {...props}
          />
        )}

        {isPassword && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Text style={styles.passwordToggleText}>
              {isPasswordVisible ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  // wrapper: {
  //   marginBottom: 24,
  // },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10000,
    height: 54,
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    left: 24,
    zIndex: 2,
  },
  labelContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    zIndex: 1,
  },
  textInput: {
    flex: 1,
    // paddingTop: 20,
    paddingBottom: 8,
    paddingRight: 24,
    fontSize: 14,
    color: BrandColors.primaryBlack,
    fontFamily: Fonts.MonaSans.Medium,
    height: "100%",
    lineHeight: 18,
  },
  passwordToggle: {
    position: "absolute",
    right: 24,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  passwordToggleText: {
    ...FontStyles.caption,
    color: BrandColors.primary,
    fontWeight: "600",
    fontFamily: Fonts.MonaSans.SemiBold,
  },
  errorText: {
    ...FontStyles.caption,
    color: BrandColors.primary,
    marginTop: 4,
    marginLeft: 16,
  },
});
