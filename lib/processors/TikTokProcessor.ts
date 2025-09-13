import { BaseProcessor } from "./BaseProcessor";
import {
  ProcessingResult,
  ProcessedContent,
  MediaItem,
  ProcessingOptions,
} from "./types";
import { tiktokBackendService } from "./TikTokBackendService";

export class TikTokProcessor extends BaseProcessor {
  platform = "tiktok" as const;

  canProcess(url: string): boolean {
    if (!this.validateUrl(url)) return false;

    const tiktokDomains = [
      "tiktok.com",
      "vt.tiktok.com",
      "vm.tiktok.com",
      "www.tiktok.com",
    ];

    try {
      const urlObj = new URL(url);
      return tiktokDomains.some(
        (domain) =>
          urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
      );
    } catch {
      return false;
    }
  }

  extractMediaId(url: string): string | null {
    try {
      const urlObj = new URL(url);

      // Handle different TikTok URL formats
      if (urlObj.hostname.includes("tiktok.com")) {
        // Extract from path like /@username/video/1234567890
        const pathMatch = urlObj.pathname.match(/\/video\/(\d+)/);
        if (pathMatch) return pathMatch[1];

        // Extract from query params
        const idParam = urlObj.searchParams.get("id");
        if (idParam) return idParam;

        // For shortened URLs like vt.tiktok.com/ZSAobWgWp, we can't extract ID directly
        // We'll need to resolve the URL first in the process method
        if (
          urlObj.hostname === "vt.tiktok.com" ||
          urlObj.hostname === "vm.tiktok.com"
        ) {
          // Return a placeholder that indicates we need to resolve the URL
          return "RESOLVE_URL";
        }
      }

      return null;
    } catch {
      return null;
    }
  }

  async process(
    url: string,
    options: ProcessingOptions = {}
  ): Promise<ProcessingResult> {
    const { result, time } = await this.measureProcessingTime(async () => {
      try {
        console.log("🎬 TikTokProcessor - starting process for URL:", url);

        // Step 1: Resolve shortened URL if needed
        const resolvedUrl = await this.resolveShortenedUrl(url);
        console.log("🔗 TikTokProcessor - resolved URL:", resolvedUrl);

        // Step 2: Call backend service to extract TikTok content
        console.log("📸 TikTokProcessor - calling backend service");
        const backendResult = await tiktokBackendService.extractTikTokContent(
          resolvedUrl
        );

        if (backendResult.success && backendResult.data) {
          console.log("✅ TikTokProcessor - backend processing successful");

          const processedContent: ProcessedContent = {
            type: backendResult.data.type === "slideshow" ? "mixed" : "video",
            media: backendResult.data.media.map((item) => ({
              url: item.url,
              type: item.type,
              id: item.id,
              width: item.width,
              height: item.height,
            })),
            title: backendResult.data.title,
            description: backendResult.data.description,
            sourceUrl: backendResult.data.sourceUrl,
            platform: "tiktok",
          };

          return processedContent;
        } else {
          throw new Error(backendResult.error || "Backend processing failed");
        }
      } catch (error) {
        console.error("💥 TikTokProcessor - error:", error);
        throw new Error(
          `TikTok processing failed: ${
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
    // For now, we'll use a simple fetch to resolve shortened URLs
    // In production, you might want to use a more robust solution
    try {
      const response = await fetch(url, {
        method: "HEAD",
        redirect: "follow",
      });
      return response.url;
    } catch {
      // If resolution fails, return original URL
      return url;
    }
  }
}
