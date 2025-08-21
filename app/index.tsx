import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuthRedirect } from '@/hooks/useAuth';
import { BrandColors } from '@/constants/Colors';

export default function Index() {
  const { isLoading } = useAuthRedirect();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: BrandColors.white }}>
        <ActivityIndicator size="large" color={BrandColors.primary} />
      </View>
    );
  }

  return null; // Navigation is handled by useAuthRedirect
}
