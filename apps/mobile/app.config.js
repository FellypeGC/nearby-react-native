// Dynamic Expo config: Google Maps keys are only injected when
// EXPO_PUBLIC_GOOGLE_MAPS_KEY is set (standalone / dev-client builds).
// Without it (plain `expo start` + Expo Go), the fields are omitted so
// Expo Go uses its own key — an empty-string key breaks map tiles.
const googleMapsApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY;

const ios = {
  supportsTablet: true,
  bundleIdentifier: "com.nearby.app",
  infoPlist: {
    NSLocationWhenInUseUsageDescription:
      "We need your location to show coupons near you.",
    NSCameraUsageDescription: "We need the camera to scan the coupon QR Code.",
  },
};

if (googleMapsApiKey) {
  ios.config = { googleMapsApiKey };
}

const android = {
  package: "com.nearby.app",
  permissions: ["ACCESS_FINE_LOCATION", "ACCESS_COARSE_LOCATION", "CAMERA"],
  adaptiveIcon: {
    foregroundImage: "./assets/images/adaptive-icon.png",
    backgroundColor: "#ffffff",
  },
};

if (googleMapsApiKey) {
  android.config = { googleMaps: { apiKey: googleMapsApiKey } };
}

module.exports = {
  expo: {
    name: "nearby",
    slug: "nearby",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#257F49",
    },
    ios,
    android,
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      "expo-font",
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow Nearby to use your location to show nearby coupons.",
        },
      ],
      "expo-camera",
      "expo-splash-screen",
      "expo-status-bar",
      "expo-web-browser",
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};
