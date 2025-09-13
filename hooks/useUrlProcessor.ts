import { useState, useCallback } from "react";
import {
  processorManager,
  ProcessingResult,
  ProcessingOptions,
} from "@/lib/processors";

export interface UseUrlProcessorReturn {
  isProcessing: boolean;
  result: ProcessingResult | null;
  error: string | null;
  processUrl: (
    url: string,
    options?: ProcessingOptions
  ) => Promise<ProcessingResult>;
  reset: () => void;
}

export function useUrlProcessor(): UseUrlProcessorReturn {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processUrl = useCallback(
    async (
      url: string,
      options?: ProcessingOptions
    ): Promise<ProcessingResult> => {
      console.log("🔧 useUrlProcessor - processUrl called with:", url, options);
      setIsProcessing(true);
      setError(null);
      setResult(null);

      try {
        console.log("⚙️ useUrlProcessor - calling processorManager.processUrl");
        const processingResult = await processorManager.processUrl(
          url,
          options
        );

        console.log("📈 useUrlProcessor - got result:", processingResult);

        if (processingResult.success) {
          setResult(processingResult);
        } else {
          setError(processingResult.error || "Processing failed");
        }

        return processingResult;
      } catch (err) {
        console.error("💥 useUrlProcessor - error:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);

        const errorResult: ProcessingResult = {
          success: false,
          error: errorMessage,
          metadata: {
            processingTime: 0,
            platform: "unknown",
            extractedAt: new Date(),
          },
        };

        return errorResult;
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setIsProcessing(false);
    setResult(null);
    setError(null);
  }, []);

  return {
    isProcessing,
    result,
    error,
    processUrl,
    reset,
  };
}
