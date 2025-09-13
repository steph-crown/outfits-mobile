import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BrandColors } from '@/constants/Colors';
import { FontStyles } from '@/constants/Fonts';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error but don't show red screen
    console.warn('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Return null to render nothing instead of error screen
      return null;
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BrandColors.white,
    padding: 20,
  },
  title: {
    ...FontStyles.heading3,
    color: BrandColors.primaryBlack,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    ...FontStyles.body,
    color: BrandColors.black3,
    textAlign: 'center',
    lineHeight: 22,
  },
});
