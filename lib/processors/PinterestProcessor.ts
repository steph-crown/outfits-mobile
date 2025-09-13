import { BaseProcessor } from "./BaseProcessor";
import { ProcessingResult, ProcessedContent, ProcessingOptions } from "./types";

export class PinterestProcessor extends BaseProcessor {
  platform = "pinterest" as const;

  canProcess(url: string): boolean {
    return url.includes("pinterest.com") || url.includes("pin.it");
  }

  extractMediaId(url: string): string | null {
    try {
      // Extract Pinterest pin ID from URL
      const patterns = [
        // Regular Pinterest URLs: https://www.pinterest.com/pin/123456789/
        /pinterest\.com\/pin\/(\d+)/,
        // Pinterest URLs with username: https://www.pinterest.com/username/pin/123456789/
        /pinterest\.com\/[^\/]+\/pin\/(\d+)/,
        // Short URLs: https://pin.it/123456789
        /pin\.it\/(\d+)/,
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
          return match[1];
        }
      }

      return null;
    } catch (error) {
      console.warn("Failed to extract Pinterest media ID:", error);
      return null;
    }
  }

  async process(
    url: string,
    options?: ProcessingOptions
  ): Promise<ProcessingResult> {
    const { result, time } = await this.measureProcessingTime(async () => {
      try {
        console.log("📌 PinterestProcessor - processing URL:", url);

        // Resolve shortened Pinterest URLs
        const resolvedUrl = await this.resolveShortenedUrl(url);
        console.log("🔗 PinterestProcessor - resolved URL:", resolvedUrl);

        // Clean the URL to remove tracking parameters and extra path segments
        const cleanUrl = this.cleanPinterestUrl(resolvedUrl);
        console.log("🧹 PinterestProcessor - cleaned URL:", cleanUrl);

        // Use Pinterest oEmbed API to get proper image and metadata
        console.log("🌐 PinterestProcessor - calling oEmbed API");
        const oembedData = await this.fetchPinterestOEmbed(cleanUrl);

        if (oembedData && oembedData.thumbnail_url) {
          console.log("✅ PinterestProcessor - got oEmbed data with thumbnail");
          const processedContent: ProcessedContent = {
            type: "image",
            media: [
              {
                url: oembedData.thumbnail_url,
                type: "image",
                width: oembedData.thumbnail_width,
                height: oembedData.thumbnail_height,
              },
            ],
            title: oembedData.title || "Pinterest Content",
            description: oembedData.author_name
              ? `By ${oembedData.author_name}`
              : `Pinterest content: ${resolvedUrl}`,
            sourceUrl: resolvedUrl,
            platform: "pinterest",
          };

          return processedContent;
        } else {
          // No fallback - if oEmbed fails, throw an error
          throw new Error(
            "Failed to extract Pinterest content. Please try again."
          );
        }
      } catch (error) {
        console.error("💥 PinterestProcessor - error:", error);
        throw new Error(
          `Pinterest processing failed: ${
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

  private async resolveShortenedUrl(url: string): Promise<string> {
    try {
      if (url.includes("pin.it")) {
        const response = await fetch(url, {
          method: "HEAD",
          redirect: "follow",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1",
          },
        });
        return response.url;
      }
      return url;
    } catch (error) {
      console.warn("Failed to resolve shortened Pinterest URL:", error);
      return url;
    }
  }

  private cleanPinterestUrl(url: string): string {
    try {
      const urlObj = new URL(url);

      // Only keep the base domain and pin path, remove everything else
      // Example: https://www.pinterest.com/pin/1055599908675215/sent/?invite_code=...
      // Should become: https://www.pinterest.com/pin/1055599908675215

      const pathParts = urlObj.pathname.split("/");
      if (pathParts.length >= 3 && pathParts[1] === "pin" && pathParts[2]) {
        // Extract just the pin ID and reconstruct clean URL
        const pinId = pathParts[2];
        return `https://www.pinterest.com/pin/${pinId}`;
      }

      // If it's not a standard pin URL, return as is
      return url;
    } catch (error) {
      console.warn("Failed to clean Pinterest URL:", error);
      return url;
    }
  }

  private async fetchPinterestOEmbed(url: string): Promise<any> {
    try {
      // Validate URL to prevent security issues
      if (!this.validateUrl(url) || !url.includes("pinterest.com")) {
        throw new Error("Invalid Pinterest URL");
      }

      const oembedUrl = `https://www.pinterest.com/oembed.json?url=${encodeURIComponent(
        url
      )}`;
      console.log("🔗 PinterestProcessor - oEmbed URL:", oembedUrl);

      const response = await fetch(oembedUrl, {
        method: "GET",
        headers: {
          "User-Agent": "OutfitsApp/1.0",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Pinterest content could not be loaded (${response.status}). Please try again.`
        );
      }

      const data = await response.json();
      console.log("📊 PinterestProcessor - oEmbed response:", data);

      if (!data || !data.thumbnail_url) {
        throw new Error(
          "Pinterest content is not available. Please try a different pin."
        );
      }

      return data;
    } catch (error) {
      console.error("💥 PinterestProcessor - oEmbed fetch failed:", error);
      throw error; // Re-throw instead of returning null
    }
  }
}
