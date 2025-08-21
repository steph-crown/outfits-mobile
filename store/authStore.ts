import { create } from "zustand";
import { authAPI, tokenStorage } from "@/lib/api";

export interface User {
  id: string;
  email: string;
  fullName?: string; // Make optional since we're removing it from registration
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  register: (data: { email: string; password: string }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  clearError: () => void;
  checkAuthStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.register(data);
      console.log("🔍 Register response:", response);
      console.log("🔑 Access token:", response.data.access_token);
      console.log("🔄 Refresh token:", response.data.refresh_token);

      // Store tokens securely - check if they exist first
      if (response.data.access_token) {
        await tokenStorage.setTokens(
          response.data.access_token,
          response.data.refresh_token // This might be undefined, which is okay
        );
      } else {
        throw new Error("No access token received from server");
      }

      // Fetch user profile after registration
      await get().fetchProfile();

      set({ isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      console.log({ theerrrrrro: error.response });
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  login: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.login(data);
      console.log("🔍 Login response:", response);
      console.log("🔑 Access token:", response.data.access_token);
      console.log("🔄 Refresh token:", response.data.refresh_token);

      // Store tokens securely - check if they exist first
      if (response.data.access_token) {
        await tokenStorage.setTokens(
          response.data.access_token,
          response.data.refresh_token // This might be undefined, which is okay
        );
      } else {
        throw new Error("No access token received from server");
      }

      // Fetch user profile after login
      await get().fetchProfile();

      set({ isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      // Clear tokens from secure storage
      await tokenStorage.clearTokens();

      // Reset auth state
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error during logout:", error);
      set({ isLoading: false });
    }
  },

  fetchProfile: async () => {
    try {
      const userData = await authAPI.getProfile();
      set({ user: userData, isAuthenticated: true });
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      // If profile fetch fails, logout the user
      await get().logout();
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  },

  checkAuthStatus: async () => {
    set({ isLoading: true });
    try {
      const token = await tokenStorage.getAccessToken();

      if (token) {
        // Try to fetch profile to verify token is still valid
        await get().fetchProfile();
      } else {
        set({ isAuthenticated: false, isLoading: false });
      }
    } catch (error) {
      // Token is invalid, clear auth state
      console.error("Auth check failed:", error);
      await get().logout();
    } finally {
      set({ isLoading: false });
    }
  },
}));
