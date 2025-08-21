import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

export function useAuthRedirect() {
  const { isAuthenticated, isLoading, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // User is authenticated, redirect to dashboard
        router.replace('/dashboard');
      } else {
        // User is not authenticated, redirect to onboarding
        router.replace('/onboarding');
      }
    }
  }, [isAuthenticated, isLoading]);

  return { isAuthenticated, isLoading };
}

export function useAuthGuard() {
  const { isAuthenticated, isLoading, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/onboarding');
    }
  }, [isAuthenticated, isLoading]);

  return { isAuthenticated, isLoading };
}
