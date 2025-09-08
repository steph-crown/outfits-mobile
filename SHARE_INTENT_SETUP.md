# Share Intent Setup for Outfits App

This document explains how to set up and use the share intent functionality in your outfits app.

## What This Enables

Users can now share outfit content directly to your app from:

- **Social Media Apps**: TikTok, Instagram, Pinterest, Twitter
- **Browser**: Safari, Chrome (when sharing URLs)
- **Photos App**: When sharing images/videos
- **Any App**: That supports the standard iOS/Android share functionality

## How It Works

1. **User sees outfit** on TikTok/Instagram/Pinterest
2. **User taps Share** → Share menu appears
3. **User selects "Save to Outfits"** → Your app opens automatically
4. **Your app receives the content** → URL, image, or video data
5. **Content gets processed** → Goes through your existing outfit creation flow

## Setup Instructions

### 1. Run the Setup Script

```bash
cd outfits-mobile
./setup-share-intent.sh
```

This will:

- Install dependencies
- Apply necessary patches
- Configure iOS share extension
- Configure Android intent filters

### 2. Build and Test

#### For iOS:

```bash
npx expo run:ios
```

#### For Android:

```bash
npx expo run:android
```

**Important**: Share intent requires a development build, not Expo Go.

## Testing the Share Intent

### iOS Testing:

1. Open Safari and go to any website
2. Tap the Share button (square with arrow)
3. Look for "Save to Outfits" in the share menu
4. Tap it to open your app with the shared URL

### Android Testing:

1. Open any app with share functionality (Photos, Chrome, etc.)
2. Tap Share
3. Look for "Outfits" in the share menu
4. Tap it to open your app with the shared content

## What Happens When Content is Shared

### Shared URLs:

- App opens to the create-outfit screen
- URL appears in the note field
- User can add photos, tags, and collections as usual

### Shared Images/Videos:

- App opens to the create-outfit screen
- Images/videos are automatically loaded
- User can add notes, tags, and collections
- User can save the outfit as usual

## Configuration Details

The share intent is configured in `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-share-intent",
        {
          "iosActivationRules": {
            "NSExtensionActivationSupportsWebURLWithMaxCount": 1,
            "NSExtensionActivationSupportsImageWithMaxCount": 10,
            "NSExtensionActivationSupportsMovieWithMaxCount": 5,
            "NSExtensionActivationSupportsText": true
          },
          "iosShareExtensionName": "Save to Outfits",
          "androidIntentFilters": ["text/*", "image/*", "video/*"],
          "androidMultiIntentFilters": ["image/*", "video/*"]
        }
      ]
    ]
  }
}
```

## Troubleshooting

### "Share menu doesn't show my app"

- Make sure you're using a development build, not Expo Go
- Check that the app.json configuration is correct
- Try rebuilding the app: `npx expo prebuild --clean`

### "App crashes when sharing"

- Check the console logs for error messages
- Make sure the share intent handler is properly initialized
- Verify that the create-outfit screen can handle the shared content

### "iOS build fails"

- The Xcode patch should fix most iOS build issues
- If problems persist, check the expo-share-intent GitHub issues

## Files Modified

- `app.json` - Added expo-share-intent plugin configuration
- `package.json` - Added postinstall script for patches
- `hooks/useShareIntent.ts` - New hook for handling shared content
- `app/_layout.tsx` - Added share intent handler initialization
- `app/create-outfit.tsx` - Updated to handle shared content
- `patches/xcode+3.0.1.patch` - iOS compatibility patch

## Next Steps

1. **Test thoroughly** on both iOS and Android devices
2. **Add AI processing** for shared outfit content
3. **Enhance URL processing** to extract outfit metadata
4. **Add analytics** to track share intent usage
5. **Consider adding** outfit source attribution (e.g., "Shared from Instagram")

## Support

If you encounter issues:

1. Check the [expo-share-intent GitHub repository](https://github.com/achorein/expo-share-intent)
2. Review the console logs for error messages
3. Test with different types of shared content
4. Ensure you're using a development build, not Expo Go

