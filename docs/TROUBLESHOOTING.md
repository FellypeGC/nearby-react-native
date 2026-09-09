# Troubleshooting

Each entry: symptom → likely cause → fix → alternative.

## Do not test on web (`expo start --web` / pressing `w`)

- Symptom: `Web Bundling failed ... Importing native-only module "react-native/Libraries/Utilities/codegenNativeCommands" on web from react-native-maps`.
- Cause: `react-native-maps` is native-only and cannot bundle for web. This is expected and does **not** affect Android/iOS.
- Fix: test on physical devices via Expo Go; ignore the web error.
- Alternative: none — web is not a supported target for this project.

## Empty list / "Não foi possível carregar" / timeout

- Cause: API down, wrong LAN IP in `apps/mobile/.env`, or phone on a different network.
- Fix: on the **phone's browser**, open `http://<LAN_IP>:3333/categories`. If it fails, fix network first. Then restart Metro with `--clear` (env is baked at start).
- Alternative: run Metro with `EXPO_PUBLIC_API_URL=http://<LAN_IP>:3333 npx expo start --clear`, or use `--tunnel` (slower, works across networks).
- ⚠️ Warning: Windows Firewall commonly blocks 3333/8081 on public networks. Set the Wi-Fi as Private or allow Node.js through the firewall.

## QR scans but app can't reach API

- Cause: Metro tunneled but API still LAN-only.
- Fix: keep both on the same Wi-Fi (recommended).
- Alternative: expose the API too (e.g. `ngrok http 3333`) and point `EXPO_PUBLIC_API_URL` at the public URL — dev only, never commit it.

## Gray / blank map in Expo Go

- Cause (device): emulator without Play Services, or no network/GPS.
- Fix: test on a **physical device** with network + location on; allow location permission.
- Alternative: `npx expo start --clear`, reinstall Expo Go (SDK 52). If still gray only on emulator, ignore — record physical-device result.
- ⚠️ Warning: do **not** chase this with a Google Maps key in Expo Go — Go ignores custom keys. Keys matter only for dev-client/standalone builds.

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
