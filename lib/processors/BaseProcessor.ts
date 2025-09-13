import {
  PlatformProcessor,
  ProcessingResult,
  ProcessingOptions,
  SupportedPlatform,
} from "./types";

export abstract class BaseProcessor implements PlatformProcessor {
  abstract platform: SupportedPlatform;

  abstract canProcess(url: string): boolean;
  abstract process(
    url: string,
    options?: ProcessingOptions
  ): Promise<ProcessingResult>;
  abstract extractMediaId(url: string): string | null;

  protected validateUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  protected createErrorResult(error: string): ProcessingResult {
    return {
      success: false,
      error,
      metadata: {
        processingTime: 0,
        platform: this.platform,
        extractedAt: new Date(),
      },
    };
  }

  protected createSuccessResult(
    data: any,
    processingTime: number,
    metadata?: any
  ): ProcessingResult {
    return {
      success: true,
      data,
      metadata: {
        processingTime,
        platform: this.platform,
        extractedAt: new Date(),
        ...metadata,
      },
    };
  }

  protected async measureProcessingTime<T>(
    operation: () => Promise<T>
  ): Promise<{ result: T; time: number }> {
    const startTime = Date.now();
    const result = await operation();
    const time = Date.now() - startTime;
    return { result, time };
  }
}
