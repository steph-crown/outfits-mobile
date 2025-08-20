import { StyleSheet, Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Fonts, FontStyles } from "@/constants/Fonts";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "heading1"
    | "heading2"
    | "heading3"
    | "body"
    | "caption"
    | "button";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "heading1" ? styles.heading1 : undefined,
        type === "heading2" ? styles.heading2 : undefined,
        type === "heading3" ? styles.heading3 : undefined,
        type === "body" ? styles.body : undefined,
        type === "caption" ? styles.caption : undefined,
        type === "button" ? styles.button : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FontStyles.body.fontFamily,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FontStyles.bodyMedium.fontFamily,
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    fontFamily: FontStyles.heading1.fontFamily,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: FontStyles.heading4.fontFamily,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
    fontFamily: FontStyles.body.fontFamily,
  },
  heading1: FontStyles.heading1,
  heading2: FontStyles.heading2,
  heading3: FontStyles.heading3,
  body: FontStyles.body,
  caption: FontStyles.caption,
  button: FontStyles.button,
});
