export interface OutfitMedia {
  id: string;
  outfit_id: string;
  media_url: string;
  media_type: "image" | "video";
  is_primary: boolean;
  order_index: number;
  width: number;
  height: number;
  file_size: number;
  created_at: string;
}

export interface Collection {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  is_public: boolean;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Outfit {
  id: string;
  user_id: string;
  status: "processing" | "ready" | "failed" | "no_outfit";
  source_url?: string;
  source_type: "tiktok" | "instagram" | "pinterest" | "screenshot" | "photo";
  thumbnail_url: string;
  original_text?: string;
  ai_tags: string[];
  user_tags: string[];
  colors: string[];
  style_category?: string;
  confidence_score: number;
  analysis_data: any;
  outfit_media: OutfitMedia[];
  collections?: Collection[];
  created_at: string;
  updated_at: string;
  note: string;
}

// Dummy data
export const dummyCollections: Collection[] = [
  {
    id: "1",
    user_id: "user-1",
    name: "Work/Office",
    description: "Professional outfits for the office",
    is_public: false,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    user_id: "user-1",
    name: "Party",
    description: "Fun outfits for parties and events",
    is_public: false,
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-10T10:00:00Z",
  },
  {
    id: "3",
    user_id: "user-1",
    name: "Casual",
    description: "Everyday casual looks",
    is_public: false,
    created_at: "2024-01-05T10:00:00Z",
    updated_at: "2024-01-05T10:00:00Z",
  },
];

export const dummyOutfits: Outfit[] = [
  {
    id: "1",
    user_id: "user-1",
    status: "ready",
    source_type: "tiktok",
    source_url: "https://tiktok.com/@user/video1",
    thumbnail_url: require("../assets/images/dummy-outfit-media/outfit-media-1.jpg"),
    ai_tags: ["casual", "streetwear", "comfortable"],
    user_tags: ["weekend", "cozy"],
    colors: ["white", "brown", "black"],
    style_category: "casual",
    confidence_score: 0.92,
    note: "Perfect for brunch dates! Love the flowy fabric and earth tones.",
    analysis_data: {},
    outfit_media: [
      {
        id: "media-1",
        outfit_id: "1",
        media_url: require("../assets/images/dummy-outfit-media/outfit-media-1.jpg"),
        media_type: "image",
        is_primary: true,
        order_index: 1,
        width: 400,
        height: 600,
        file_size: 245760,
        created_at: "2024-01-20T10:00:00Z",
      },
    ],
    collections: [dummyCollections.find((c) => c.name === "Party")!],
    created_at: "2024-01-20T10:00:00Z",
    updated_at: "2024-01-20T10:00:00Z",
  },
  {
    id: "2",
    user_id: "user-1",
    status: "ready",
    source_type: "tiktok",
    thumbnail_url: require("../assets/images/dummy-outfit-media/outfit-media-2.jpg"),
    ai_tags: ["feminine", "trendy", "printed"],
    user_tags: ["summer", "date"],
    colors: ["orange", "white"],
    style_category: "casual",
    confidence_score: 0.88,
    note: "This is a perfect outfit for a summer day out!",
    analysis_data: {},
    outfit_media: [
      {
        id: "media-2",
        outfit_id: "2",
        media_url: require("../assets/images/dummy-outfit-media/outfit-media-2.jpg"),
        media_type: "image",
        is_primary: true,
        order_index: 1,
        width: 400,
        height: 600,
        file_size: 267840,
        created_at: "2024-01-19T10:00:00Z",
      },
    ],
    created_at: "2024-01-19T10:00:00Z",
    updated_at: "2024-01-19T10:00:00Z",
  },
  {
    id: "3",
    user_id: "user-1",
    status: "ready",
    source_type: "pinterest",
    thumbnail_url: require("../assets/images/dummy-outfit-media/outfit-media-3.jpg"),
    ai_tags: ["professional", "elegant", "sophisticated"],
    user_tags: ["work", "meeting"],
    colors: ["beige", "black", "white"],
    style_category: "professional",
    confidence_score: 0.95,
    analysis_data: {},
    note: "A classic choice for the office, this outfit exudes professionalism and confidence.",
    outfit_media: [
      {
        id: "media-3",
        outfit_id: "3",
        media_url: require("../assets/images/dummy-outfit-media/outfit-media-3.jpg"),
        media_type: "image",
        is_primary: true,
        order_index: 1,
        width: 400,
        height: 600,
        file_size: 289760,
        created_at: "2024-01-18T10:00:00Z",
      },
    ],
    collections: [dummyCollections.find((c) => c.name === "Party")!],
    created_at: "2024-01-18T10:00:00Z",
    updated_at: "2024-01-18T10:00:00Z",
  },
  {
    id: "4",
    user_id: "user-1",
    status: "ready",
    source_type: "instagram",
    thumbnail_url: require("../assets/images/dummy-outfit-media/outfit-media-4.jpg"),
    ai_tags: ["streetwear", "urban", "layered"],
    user_tags: ["casual", "cool"],
    colors: ["black", "grey", "white"],
    style_category: "streetwear",
    confidence_score: 0.91,
    analysis_data: {},
    note: "Love the edgy vibe of this streetwear look!",
    outfit_media: [
      {
        id: "media-4",
        outfit_id: "4",
        media_url: require("../assets/images/dummy-outfit-media/outfit-media-4.jpg"),
        media_type: "image",
        is_primary: true,
        order_index: 1,
        width: 400,
        height: 600,
        file_size: 256840,
        created_at: "2024-01-17T10:00:00Z",
      },
    ],
    collections: [dummyCollections.find((c) => c.name === "Party")!],
    created_at: "2024-01-17T10:00:00Z",
    updated_at: "2024-01-17T10:00:00Z",
  },
  {
    id: "5",
    user_id: "user-1",
    status: "ready",
    source_type: "tiktok",
    thumbnail_url: require("../assets/images/dummy-outfit-media/outfit-media-5.jpg"),
    ai_tags: ["formal", "business", "chic"],
    user_tags: ["office", "professional"],
    colors: ["navy", "white", "gold"],
    style_category: "professional",
    confidence_score: 0.94,
    analysis_data: {},
    note: "A sophisticated choice for the office, this outfit is both stylish and professional.",
    outfit_media: [
      {
        id: "media-5",
        outfit_id: "5",
        media_url: require("../assets/images/dummy-outfit-media/outfit-media-5.jpg"),
        media_type: "image",
        is_primary: true,
        order_index: 1,
        width: 400,
        height: 600,
        file_size: 278940,
        created_at: "2024-01-16T10:00:00Z",
      },
    ],
    collections: [dummyCollections.find((c) => c.name === "Work/Office")!],
    created_at: "2024-01-16T10:00:00Z",
    updated_at: "2024-01-16T10:00:00Z",
  },
  {
    id: "6",
    user_id: "user-1",
    status: "ready",
    source_type: "screenshot",
    thumbnail_url: require("../assets/images/dummy-outfit-media/outfit-media-6.jpg"),
    ai_tags: ["trendy", "youthful", "colorful"],
    user_tags: ["fun", "vibrant"],
    colors: ["pink", "white", "purple"],
    style_category: "casual",
    confidence_score: 0.87,
    analysis_data: {},
    note: "Perfect for a casual day out with friends!",
    outfit_media: [
      {
        id: "media-6",
        outfit_id: "6",
        media_url: require("../assets/images/dummy-outfit-media/outfit-media-6.jpg"),
        media_type: "image",
        is_primary: true,
        order_index: 1,
        width: 400,
        height: 600,
        file_size: 234560,
        created_at: "2024-01-15T10:00:00Z",
      },
    ],
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "7",
    user_id: "user-1",
    status: "ready",
    source_type: "instagram",
    thumbnail_url: require("../assets/images/dummy-outfit-media/outfit-media-7.jpg"),
    ai_tags: ["elegant", "sophisticated", "minimalist"],
    user_tags: ["dinner", "date"],
    colors: ["black", "beige"],
    style_category: "elegant",
    confidence_score: 0.93,
    analysis_data: {},
    note: "A timeless choice for any formal occasion.",
    outfit_media: [
      {
        id: "media-7",
        outfit_id: "7",
        media_url: require("../assets/images/dummy-outfit-media/outfit-media-7.jpg"),
        media_type: "image",
        is_primary: true,
        order_index: 1,
        width: 400,
        height: 600,
        file_size: 267890,
        created_at: "2024-01-14T10:00:00Z",
      },
    ],
    created_at: "2024-01-14T10:00:00Z",
    updated_at: "2024-01-14T10:00:00Z",
  },
  {
    id: "8",
    user_id: "user-1",
    status: "ready",
    source_type: "tiktok",
    thumbnail_url: require("../assets/images/dummy-outfit-media/outfit-media-8.jpg"),
    ai_tags: ["sporty", "athletic", "comfortable"],
    user_tags: ["gym", "workout"],
    colors: ["grey", "black", "white"],
    style_category: "athletic",
    confidence_score: 0.89,
    analysis_data: {},
    note: "Perfect for a casual day out with friends!",
    outfit_media: [
      {
        id: "media-8",
        outfit_id: "8",
        media_url: require("../assets/images/dummy-outfit-media/outfit-media-8.jpg"),
        media_type: "image",
        is_primary: true,
        order_index: 1,
        width: 400,
        height: 600,
        file_size: 245670,
        created_at: "2024-01-13T10:00:00Z",
      },
    ],
    collections: [dummyCollections.find((c) => c.name === "Work/Office")!],
    created_at: "2024-01-13T10:00:00Z",
    updated_at: "2024-01-13T10:00:00Z",
  },
];
