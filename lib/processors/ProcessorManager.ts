import {
  PlatformProcessor,
  ProcessingResult,
  ProcessingOptions,
  SupportedPlatform,
} from "./types";
import { TikTokProcessor } from "./TikTokProcessor";
import { PinterestProcessor } from "./PinterestProcessor";
import { InstagramProcessor } from "./InstagramProcessor";

export class ProcessorManager {
  private processors: Map<SupportedPlatform, PlatformProcessor> = new Map();

  constructor() {
    this.registerProcessor(new TikTokProcessor());
    this.registerProcessor(new PinterestProcessor());
    this.registerProcessor(new InstagramProcessor());
  }

  private registerProcessor(processor: PlatformProcessor): void {
    this.processors.set(processor.platform, processor);
  }

  /**
   * Detect which platform a URL belongs to
   */
  detectPlatform(url: string): SupportedPlatform {
    for (const [platform, processor] of this.processors) {
      if (processor.canProcess(url)) {
        return platform;
      }
    }
    return "unknown";
  }

  /**
   * Process a URL and extract media content
   */
  async processUrl(
    url: string,
    options?: ProcessingOptions
  ): Promise<ProcessingResult> {
    console.log("🏭 ProcessorManager - processUrl called with:", url);
    const platform = this.detectPlatform(url);
    console.log("🔍 ProcessorManager - detected platform:", platform);

    if (platform === "unknown") {
      console.log("❌ ProcessorManager - unsupported platform");
      return {
        success: false,
        error: `Unsupported platform for URL: ${url}`,
        metadata: {
          processingTime: 0,
          platform: "unknown",
          extractedAt: new Date(),
        },
      };
    }

    const processor = this.processors.get(platform);
    if (!processor) {
      console.log(
        "❌ ProcessorManager - no processor found for platform:",
        platform
      );
      return {
        success: false,
        error: `No processor available for platform: ${platform}`,
        metadata: {
          processingTime: 0,
          platform,
          extractedAt: new Date(),
        },
      };
    }

    try {
      console.log("⚡ ProcessorManager - calling processor.process");
      const result = await processor.process(url, options);
      console.log("✅ ProcessorManager - processor returned:", result);
      return result;
    } catch (error) {
      console.error("💥 ProcessorManager - processor error:", error);
      return {
        success: false,
        error: `Processing failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        metadata: {
          processingTime: 0,
          platform,
          extractedAt: new Date(),
        },
      };
    }
  }

  /**
   * Get all supported platforms
   */
  getSupportedPlatforms(): SupportedPlatform[] {
    return Array.from(this.processors.keys());
  }

  /**
   * Check if a platform is supported
   */
  isPlatformSupported(platform: SupportedPlatform): boolean {
    return this.processors.has(platform);
  }

  /**
   * Get processor for a specific platform
   */
  getProcessor(platform: SupportedPlatform): PlatformProcessor | undefined {
    return this.processors.get(platform);
  }
}

// Singleton instance
export const processorManager = new ProcessorManager();
