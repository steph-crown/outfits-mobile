import { ContentSource } from "@/types/shared";

/**
 * Detects the platform from a URL
 */
export function detectPlatformFromUrl(url: string): ContentSource {
  if (url.includes("pinterest.com") || url.includes("pin.it")) {
    return "pinterest";
  } else if (url.includes("tiktok.com")) {
    return "tiktok";
  } else if (url.includes("instagram.com")) {
    return "instagram";
  }
  return "share_intent";
}

/**
 * Converts processed media to selected photos format
 */
export function convertProcessedMediaToPhotos(
  processedData: any
): { id: string; uri: string }[] {
  if (!processedData.media || !Array.isArray(processedData.media)) {
    return [];
  }

  return processedData.media.map((item: any, index: number) => ({
    id: `${processedData.platform || "processed"}-${index}`,
    uri: item.url,
  }));
}

/**
 * Extracts note content from processed data
 */
export function extractNoteFromProcessedData(processedData: any): string {
  if (processedData.title) {
    return processedData.title;
  } else if (processedData.description) {
    return processedData.description;
  } else if (processedData.sourceUrl) {
    return `Shared from: ${processedData.sourceUrl}`;
  }
  return "";
}

/**
 * Generates a unique ID for photos
 */
export function generatePhotoId(prefix: string, index: number): string {
  return `${prefix}-${index}`;
}
