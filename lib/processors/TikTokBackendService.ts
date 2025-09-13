// Backend service for TikTok slideshow extraction
// This would run on your NestJS backend server

export interface TikTokBackendResponse {
  success: boolean;
  data?: {
    type: "slideshow" | "video";
    media: Array<{
      url: string;
      type: "image" | "video";
      id: string;
      width?: number;
      height?: number;
    }>;
    title: string;
    description: string;
    author?: string;
    sourceUrl: string;
  };
  error?: string;
}

export class TikTokBackendService {
  private baseUrl: string;

  constructor(baseUrl: string = "http://172.29.127.1:3001") {
    this.baseUrl = baseUrl;
  }

  /**
   * Call your backend API to extract TikTok slideshow images
   * This will use browser automation (Puppeteer/Playwright) on the backend
   */
  async extractTikTokContent(url: string): Promise<TikTokBackendResponse> {
    try {
      console.log(
        "🌐 TikTokBackendService - calling backend API for URL:",
        url
      );

      const response = await fetch(`${this.baseUrl}/api/tiktok/process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(
          `Backend API error: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log("📊 TikTokBackendService - received response:", result);

      return result;
    } catch (error) {
      console.error("💥 TikTokBackendService - API call failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

// Export singleton instance
export const tiktokBackendService = new TikTokBackendService();
