// Core types for URL processing system

export interface ProcessingResult {
  success: boolean;
  data?: ProcessedContent;
  error?: string;
  metadata?: ProcessingMetadata;
}

export interface ProcessedContent {
  type: "image" | "video" | "mixed";
  media: MediaItem[];
  title?: string;
  description?: string;
  sourceUrl: string;
  platform: SupportedPlatform;
}

export interface MediaItem {
  url: string;
  type: "image" | "video";
  thumbnail?: string;
  width?: number;
  height?: number;
  duration?: number; // for videos
  size?: number; // file size in bytes
}

export interface ProcessingMetadata {
  processingTime: number;
  platform: SupportedPlatform;
  extractedAt: Date;
  confidence?: number; // AI confidence score
  tags?: string[]; // AI-generated tags
  colors?: string[]; // extracted colors
  style?: string; // detected style category
}

export type SupportedPlatform =
  | "tiktok"
  | "instagram"
  | "pinterest"
  | "youtube"
  | "twitter"
  | "unknown";

export interface PlatformProcessor {
  platform: SupportedPlatform;
  canProcess(url: string): boolean;
  process(url: string, options?: ProcessingOptions): Promise<ProcessingResult>;
  extractMediaId(url: string): string | null;
}

export interface ProcessingOptions {
  includeThumbnails?: boolean;
  maxQuality?: "low" | "medium" | "high";
  extractMetadata?: boolean;
  aiAnalysis?: boolean;
}
