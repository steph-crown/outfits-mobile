import axios from "axios";
import * as SecureStore from "expo-secure-store";

// Base URL for your backend API
const BASE_URL = "http://10.212.40.239:3001/api"; // Using your computer's IP address with /api prefix

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await tokenStorage.getRefreshToken();
        if (refreshToken) {
          const { access_token } = await authAPI.refreshToken(refreshToken);
          await tokenStorage.setTokens(access_token);
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        await tokenStorage.clearTokens();
        // Handle redirect to login
      }
    }

    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  register: async (data: { email: string; password: string }) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await api.post("/auth/refresh", { refreshToken });
    return response.data;
  },
};

// Secure token storage utilities
export const tokenStorage = {
  async setTokens(accessToken: string, refreshToken?: string) {
    console.log("💾 Storing tokens:", { accessToken: !!accessToken, refreshToken: !!refreshToken });
    try {
      if (!accessToken) {
        throw new Error("Access token is required but was undefined/null");
      }
      
      await SecureStore.setItemAsync("access_token", accessToken);
      
      if (refreshToken) {
        await SecureStore.setItemAsync("refresh_token", refreshToken);
      } else {
        console.log("⚠️ No refresh token provided, skipping storage");
      }
      
      console.log("✅ Tokens stored successfully");
    } catch (error) {
      console.error("❌ Error storing tokens:", error);
      throw error;
    }
  },

  async getAccessToken() {
    try {
      return await SecureStore.getItemAsync("access_token");
    } catch (error) {
      console.error("Error getting access token:", error);
      return null;
    }
  },

  async getRefreshToken() {
    try {
      return await SecureStore.getItemAsync("refresh_token");
    } catch (error) {
      console.error("Error getting refresh token:", error);
      return null;
    }
  },

  async clearTokens() {
    try {
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("refresh_token");
    } catch (error) {
      console.error("Error clearing tokens:", error);
    }
  },
};

export default api;
