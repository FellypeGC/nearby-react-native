# Testing with Expo Go (Android + iOS)

## Start order

1. Start the API first (`npm run dev:api`), confirm `GET http://<LAN_IP>:3333/categories` works from the PC browser.
2. Start Metro: `npx --prefix apps/mobile expo start --clear` (LAN mode by default).
3. Open **Expo Go (SDK 57)** on each phone (same Wi-Fi) and scan the QR from the terminal.

> ⚠️ Warning: Expo Go must match the project's SDK (57 — upgraded from 52 in September 2026, see README history). A wrong Go version shows `Something went wrong / version mismatch`.
> Alternative: install the matching Go from the store, or use a dev-client build (out of scope here).

## Test script (~5 min per device)

| # | Step | Expected |
|---|------|----------|
| 1 | Onboarding → tap Get started | Home with 5 categories (English) |
| 2 | Allow location | Map centers near you (fallback: São Paulo) |
| 3 | Switch category | Bottom-sheet list + pins update (22 markets total) |
| 4 | Tap pin → callout → open | Detail with cover, 2 rules, coupon count |
| 5 | Tap QR Code → allow camera → scan market QR | Confirm dialog → coupon code shown |
| 6 | Back → tap list row | Same detail opens (row `onPress` wired) |

Record per device: cold-start map time, any gray/blank map, scan success. These numbers feed the private `.career/` XYZ bullets (gitignored, not published).

## Notes

- Google Maps API key (`EXPO_PUBLIC_GOOGLE_MAPS_KEY`) is **not required** for this Expo Go test — Go uses its own key (`app.config.js` omits the field when unset; it is only injected for standalone/dev-client builds).
- iOS Expo Go renders Apple Maps (the app selects `PROVIDER_GOOGLE` on Android only) — expected, not a bug. iOS is verified by code review (bundle id, permissions, location plugin) as no iOS device is available; Android is the primary test device.
- App language is English-only (UI strings + seed data translated September 2026).
