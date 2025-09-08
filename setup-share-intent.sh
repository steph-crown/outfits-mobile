#!/bin/bash

echo "🚀 Setting up Share Intent for Outfits App"
echo "=========================================="

nvm use stable

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Apply patches
echo "🔧 Applying Xcode patch..."
npx patch-package

# Prebuild the app with share intent configuration
echo "🏗️  Prebuilding app with share intent..."
npx expo prebuild --no-install

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Run 'npx expo run:ios' to test on iOS simulator"
echo "2. Run 'npx expo run:android' to test on Android emulator"
echo "3. Test sharing from other apps (Safari, Photos, etc.)"
echo ""
echo "Note: Share intent requires a development build, not Expo Go"
