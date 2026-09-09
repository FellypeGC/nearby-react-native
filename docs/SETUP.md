# Setup

Monorepo: `apps/mobile` (Expo Router + React Native, SDK 57) + `apps/api` (Express + Prisma + SQLite).

> Only `.env.example` files are versioned. Real `.env` files, `*.db`, `.career/` and `node_modules/` are gitignored and never pushed.

## Prerequisites

- Node 22, npm 10
- Phone(s) with **Expo Go for SDK 57** installed (Android and/or iOS)
- PC and phone(s) on the **same Wi-Fi/LAN**

## 1. API

```bash
npm --prefix apps/api install
cp apps/api/.env.example apps/api/.env
npx --prefix apps/api prisma migrate dev
npm run dev:api
```

Healthcheck (from the PC): `GET http://<YOUR_LAN_IP>:3333/categories` → expect 5 categories.
Seeded data (measured 2026-09-09): 5 categories, 22 markets (Alimentação 5, Cinema 3, Compras 5, Hospedagem 5, Padaria 4).

> ⚠️ Warning: if the seed command fails with `Unique constraint failed`, the DB is already seeded — safe to ignore.
> Alternative: delete `apps/api/prisma/dev.db*` (local only, gitignored) and re-run migrate + seed.

## 2. Mobile

```bash
npm --prefix apps/mobile install
cp apps/mobile/.env.example apps/mobile/.env
# edit apps/mobile/.env -> EXPO_PUBLIC_API_URL=http://<YOUR_LAN_IP>:3333
npm run dev:mobile
# or: npx --prefix apps/mobile expo start --clear
```

Find your LAN IP: Windows `ipconfig` → IPv4 (e.g. `192.168.100.16`); macOS/Linux `ipconfig getifaddr en0` / `hostname -I`.

> ⚠️ Warning: `EXPO_PUBLIC_*` vars are baked at Metro start. After editing `.env`, restart with `--clear`.
> Alternative: export inline, e.g. `EXPO_PUBLIC_API_URL=http://192.168.100.16:3333 npx expo start --clear`.
