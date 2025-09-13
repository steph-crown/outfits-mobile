// Shared types across the app

export interface SelectedPhoto {
  id: string;
  uri: string;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  isPublic?: boolean;
  thumbnailUrl?: string;
  outfitsCount?: number;
}

export interface Outfit {
  id: string;
  title?: string;
  description?: string;
  images: string[];
  collections?: Collection[];
  tags?: string[];
  sourceUrl?: string;
  platform?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type ContentSource =
  | "gallery"
  | "pinterest"
  | "tiktok"
  | "instagram"
  | "share_intent"
  | "processing_complete";

export interface ProcessingParams {
  sharedUrl?: string;
  sharedMedia?: string;
  processedData?: string;
  selectedPhotos?: string;
  source?: ContentSource;
}
