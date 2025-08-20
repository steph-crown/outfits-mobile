import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="heading1">OutFits Design System</ThemedText>
      </ThemedView>
      <ThemedText type="body">
        Explore the beautiful Mona Sans font family and brand colors used throughout the OutFits app.
      </ThemedText>
      
      <ThemedView style={styles.section}>
        <ThemedText type="heading2">Typography Showcase</ThemedText>
        <ThemedText type="heading1">Heading 1 - Bold</ThemedText>
        <ThemedText type="heading2">Heading 2 - SemiBold</ThemedText>
        <ThemedText type="heading3">Heading 3 - SemiBold</ThemedText>
        <ThemedText type="title">Title - Medium</ThemedText>
        <ThemedText type="subtitle">Subtitle - Medium</ThemedText>
        <ThemedText type="body">Body text - Regular</ThemedText>
        <ThemedText type="caption">Caption text - Regular</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  section: {
    marginTop: 24,
    gap: 8,
  },
});
