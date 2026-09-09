# Troubleshooting

Each entry: symptom → likely cause → fix → alternative.

## Do not test on web (`expo start --web` / pressing `w`)

- Symptom: `Web Bundling failed ... Importing native-only module "react-native/Libraries/Utilities/codegenNativeCommands" on web from react-native-maps`.
- Cause: `react-native-maps` is native-only and cannot bundle for web. This is expected and does **not** affect Android/iOS.
- Fix: test on physical devices via Expo Go; ignore the web error.
- Alternative: none — web is not a supported target for this project.

## Empty list / timeout / failed to load

- Cause: API down, wrong LAN IP in `apps/mobile/.env`, or phone on a different network.
- Fix: on the **phone's browser**, open `http://<LAN_IP>:3333/categories`. If it fails, fix network first. Then restart Metro with `--clear` (env is baked at start).
- Alternative: run Metro with `EXPO_PUBLIC_API_URL=http://<LAN_IP>:3333 npx expo start --clear`, or use `--tunnel` (slower, works across networks).
- ⚠️ Warning: Windows Firewall commonly blocks 3333/8081 on public networks. Set the Wi-Fi as Private or allow Node.js through the firewall.

## QR scans but app can't reach API

- Cause: Metro tunneled but API still LAN-only.
- Fix: keep both on the same Wi-Fi (recommended).
- Alternative: expose the API too (e.g. `ngrok http 3333`) and point `EXPO_PUBLIC_API_URL` at the public URL — dev only, never commit it.

## Gray / blank native map in Expo Go (root cause found, workaround shipped)

- Cause (upstream, verified Aug 2026): the Google Maps API key **bundled inside Expo Go Android (SDK 55/56/57)** is expired server-side (`REQUEST_DENIED: The provided API key is expired`). The map mounts (controls render) but no tiles ever load. No `app.json`/`app.config.js` setting can fix it — Go uses Expo's key, not yours. OSM `UrlTile` overlays were also tried and render nothing on the dead surface.
- Fix (shipped): `src/components/simulated-map/` — stylized SVG preview plotting real GPS + API coordinates with tappable pins into the same detail flow. Deterministic, zero keys, zero cost.
- Alternative (production-grade, needs budget-free EAS account + build time): migrate to MapLibre + dev-client build with your own tile source; or set `EXPO_PUBLIC_GOOGLE_MAPS_KEY` (requires paid Google billing) for dev-client/standalone only.
- ⚠️ Warning: do **not** chase this with a Google Maps key in Expo Go — Go ignores custom keys.

## Location never centers / fallback São Paulo persists

- Cause: permission denied (or "approximate" only), GPS without fix (indoors), or old build without camera animation.
- Fix: the app now shows a status line under the categories ("Locating you…" / "Location unavailable — showing São Paulo as fallback") plus an alert when permission is denied. Grant **precise** location in OS settings, go outdoors briefly, reload.
- Alternative: `Location.getLastKnownPositionAsync` fast path covers most cases; a cold GPS fix can take 30–60s.

## `Something went wrong / version mismatch`

- Cause: Expo Go version ≠ project SDK (project is SDK 57 since the September 2026 upgrade from 52).
- Fix: install the Go build matching `"expo": "^57.0.21"`.
- Alternative: `npx expo upgrade` the project (bigger change — do on a branch).

## Metro cache / stale bundle

- Symptom: edits don't appear, `Unable to resolve module`.
- Fix: `npx --prefix apps/mobile expo start --clear`.
- Alternative: `rm -rf apps/mobile/node_modules && npm --prefix apps/mobile install`.

## Camera denied / QR never fires

- Cause: permission denied, or non-QR barcode.
- Fix: enable Camera for Expo Go in OS settings; the app filters `barcodeTypes: ['qr']`.
- Alternative: verify the detail screen + coupon UI without scanning (scan rate is recorded separately).

## Seed fails: `Unique constraint failed`

- Cause: DB already seeded.
- Fix: safe to ignore.
- Alternative: reset local DB (`rm apps/api/prisma/dev.db*`, re-run migrate) — file is gitignored.

## `tsc --noEmit` errors about `@tabler/icons-react-native` types

- Cause: pre-existing missing type declarations (9 errors, unrelated to recent fixes).
- Fix: none required to run the app.
- Alternative: add `declare module '@tabler/icons-react-native';` or install community types.
