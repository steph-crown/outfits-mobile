import { BaseProcessor } from "./BaseProcessor";
import { ProcessingResult, ProcessedContent, ProcessingOptions } from "./types";
import api from "@/lib/api";

export interface InstagramProcessedData {
  id: string;
  shortcode: string;
  type: "image" | "video" | "carousel";
  media: Array<{
    url: string;
    type: "image" | "video";
    width: number;
    height: number;
    thumbnail?: string;
  }>;
  title: string;
  description: string;
  sourceUrl: string;
  platform: "instagram";
  author: {
    username: string;
    fullName: string;
    profilePicture: string;
    isVerified: boolean;
  };
  metadata: {
    likes?: number;
    comments?: number;
    views?: number;
    duration?: number;
    location?: string;
  };
}

export class InstagramProcessor extends BaseProcessor {
  platform = "instagram" as const;

  canProcess(url: string): boolean {
    return /instagram\.com\/(p|reel|reels)\//.test(url);
  }

  extractMediaId(url: string): string | null {
    try {
      const regex =
        /instagram\.com\/(?:[A-Za-z0-9_.]+\/)?(p|reels|reel|stories)\/([A-Za-z0-9-_]+)/;
      const match = url.match(regex);
      return match && match[2] ? match[2] : null;
    } catch (error) {
      console.warn("Failed to extract Instagram media ID:", error);
      return null;
    }
  }

  async process(
    url: string,
    options?: ProcessingOptions
  ): Promise<ProcessingResult> {
    const { result, time } = await this.measureProcessingTime(async () => {
      try {
        console.log("📸 InstagramProcessor - processing URL:", url);

        // Clean the URL
        const cleanUrl = this.cleanInstagramUrl(url);
        console.log("🧹 InstagramProcessor - cleaned URL:", cleanUrl);

        // Call backend Instagram processing endpoint
        console.log("🌐 InstagramProcessor - calling backend API");
        const response = await api.post("/instagram/process", {
          url: cleanUrl,
        });

        if (!response.data.success) {
          throw new Error(response.data.error || "Instagram processing failed");
        }

        const instagramData: InstagramProcessedData = response.data.data;
        console.log(
          "✅ InstagramProcessor - got data from backend:",
          instagramData
        );

        // Convert to our standard format
        const processedContent: ProcessedContent = {
          type:
            instagramData.type === "carousel" ? "image" : instagramData.type,
          media: instagramData.media.map((item, index) => ({
            url: item.url,
            type: item.type,
            width: item.width,
            height: item.height,
            thumbnail: item.thumbnail,
          })),
          title: instagramData.title,
          description: instagramData.description,
          sourceUrl: instagramData.sourceUrl,
          platform: "instagram",
        };

        console.log("✅ InstagramProcessor - converted to standard format");
        return processedContent;
      } catch (error) {
        console.error("💥 InstagramProcessor - error:", error);
        throw new Error(
          `Instagram processing failed: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    });

    if (result instanceof Error) {
      return this.createErrorResult(result.message);
    }
    return this.createSuccessResult(result, time);
  }

  private cleanInstagramUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split("/");

      // Handle different Instagram URL formats
      if (pathParts[1] === "p" && pathParts[2]) {
        return `https://www.instagram.com/p/${pathParts[2]}/`;
      } else if (pathParts[1] === "reel" && pathParts[2]) {
        return `https://www.instagram.com/reel/${pathParts[2]}/`;
      } else if (pathParts[1] === "reels" && pathParts[2]) {
        return `https://www.instagram.com/reel/${pathParts[2]}/`;
      }

      return url;
    } catch (error) {
      console.warn("Failed to clean Instagram URL:", error);
      return url;
    }
  }
}
