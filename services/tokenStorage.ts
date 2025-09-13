import * as SecureStore from "expo-secure-store";

// Secure token storage utilities
export const tokenStorage = {
  async setTokens(accessToken: string, refreshToken?: string) {
    console.log("💾 Storing tokens:", {
      accessToken: !!accessToken,
      refreshToken: !!refreshToken,
    });
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
