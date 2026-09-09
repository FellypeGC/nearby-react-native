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
| 2 | Allow location | Stylized map shows user dot (fallback: São Paulo) |
| 3 | Switch category | Bottom-sheet list + numbered pins update (22 markets total) |
| 4 | Tap pin → open | Detail with cover, 2 rules, coupon count |
| 5 | Tap QR Code → allow camera → scan market QR | Confirm dialog → coupon code shown |
| 6 | Back → tap list row | Same detail opens (row `onPress` wired) |

Record per device: cold-start map time, any gray/blank map, scan success. These numbers feed the private `.career/` XYZ bullets (gitignored, not published).

## Notes

- The home "map" is a **stylized SVG preview** (`src/components/simulated-map/`), not live tiles — the Google key inside Expo Go is expired upstream, so native tiles can't render. Pins plot real API coordinates and open the real detail flow.
- iOS is verified by code review (bundle id, permissions, location plugin) as no iOS device is available; Android is the primary test device.
- App language is English-only (UI strings + seed data translated September 2026).
