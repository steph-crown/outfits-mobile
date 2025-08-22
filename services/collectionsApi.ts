import api from '@/lib/api';

export interface CreateCollectionRequest {
  name: string;
  description?: string;
  isPublic?: boolean;
  thumbnailUrl?: string;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
  thumbnailUrl?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const collectionsApi = {
  create: async (data: CreateCollectionRequest): Promise<ApiResponse<Collection>> => {
    const response = await api.post('/collections', data);
    return response.data;
  },

  getAll: async (): Promise<ApiResponse<Collection[]>> => {
    const response = await api.get('/collections');
    return response.data;
  },

  getPublic: async (limit?: number, offset?: number): Promise<ApiResponse<Collection[]>> => {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());
    
    const response = await api.get(`/collections/public?${params.toString()}`);
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Collection>> => {
    const response = await api.get(`/collections/${id}`);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateCollectionRequest>): Promise<ApiResponse<Collection>> => {
    const response = await api.patch(`/collections/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/collections/${id}`);
    return response.data;
  },
};
