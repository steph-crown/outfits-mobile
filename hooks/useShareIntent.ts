import { useEffect, useState } from "react";
import { useShareIntent } from "expo-share-intent";
import { router } from "expo-router";
import { Alert } from "react-native";

export interface SharedContent {
  type: "text" | "media";
  value: string | string[];
  mimeType?: string;
}

export function useOutfitShareIntent() {
  const { shareIntent, resetShareIntent } = useShareIntent();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Only process if we have valid share intent data and not already processing
    if (
      shareIntent &&
      !isProcessing &&
      shareIntent.type &&
      shareIntent.type !== null
    ) {
      console.log("🚀 Processing share intent:", shareIntent.type);
      handleSharedContent(shareIntent);
    }
  }, [shareIntent, isProcessing]);

  const handleSharedContent = async (content: any) => {
    setIsProcessing(true);

    try {
      // Handle web URLs (like TikTok, Instagram, etc.)
      if (content.type === "weburl" && (content.text || content.webUrl)) {
        const url = content.webUrl || content.text;
        console.log("🌐 Processing web URL:", url);
        await handleSharedUrl(url);
      }
      // Handle media files (images, videos)
      else if (
        content.type === "media" &&
        content.files &&
        content.files.length > 0
      ) {
        console.log(
          "📸 Processing media files:",
          content.files.length,
          "files"
        );
        const filePaths = content.files.map((file: any) => file.path);
        await handleSharedMedia(filePaths);
      }
      // Handle text content
      else if (content.type === "text" && content.text) {
        console.log("📝 Processing text content:", content.text);
        await handleSharedUrl(content.text);
      }
      // Handle legacy format or unknown types
      else if (
        content.text &&
        (content.text.startsWith("http") || content.text.startsWith("https"))
      ) {
        console.log("🔗 Processing URL from text field:", content.text);
        await handleSharedUrl(content.text);
      } else {
        console.log("⚠️ Unknown content type or missing value:", content.type);
        Alert.alert(
          "Info",
          "Shared content received but couldn't process it. Content: " +
            JSON.stringify(content),
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      console.error("❌ Error processing shared content:", error);
      Alert.alert(
        "Error",
        "Failed to process shared content. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsProcessing(false);
      resetShareIntent();
    }
  };

  const handleSharedUrl = async (url: string) => {
    console.log("🌐 Processing shared URL:", url);

    // Navigate to create outfit screen with the shared URL
    console.log("🧭 Navigating to create-outfit with URL:", url);
    router.push({
      pathname: "/create-outfit",
      params: {
        sharedUrl: url,
        source: "share_intent",
      },
    });
  };

  const handleSharedMedia = async (mediaFiles: string[]) => {
    console.log("📸 Processing shared media files:", mediaFiles);

    // Navigate to create outfit screen with the shared media
    console.log("🧭 Navigating to create-outfit with media files:", mediaFiles);
    router.push({
      pathname: "/create-outfit",
      params: {
        sharedMedia: JSON.stringify(mediaFiles),
        source: "share_intent",
      },
    });
  };

  return {
    isProcessing,
    hasSharedContent: !!shareIntent,
  };
}
