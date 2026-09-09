# Nearby — React Native monorepo

> English | [Português](#português)

Study project (Rocketseat NLW Pocket Mobile) refactored toward a React Native role: coupon discovery with native map, category filter, bottom-sheet list, market detail and QR coupon redemption via camera.

## Structure

```
apps/mobile/  -> Expo Router + React Native (SDK 52), map + camera coupon flow
apps/api/     -> Express + Prisma + SQLite, categories / markets / coupons
docs/         -> SETUP, TESTING-EXPO-GO, TROUBLESHOOTING
```

## Quick start

Prerequisites: Node 22, Expo Go (SDK 52) on your phone, PC and phone on the same Wi-Fi.

```bash
npm install                       # workspaces: installs api + mobile
cp apps/api/.env.example apps/api/.env
cp apps/mobile/.env.example apps/mobile/.env
# edit apps/mobile/.env -> EXPO_PUBLIC_API_URL=http://<YOUR_LAN_IP>:3333
npx --prefix apps/api prisma migrate dev
npm run dev:api                    # healthcheck: GET http://<YOUR_LAN_IP>:3333/categories
./node_modules/.bin/expo start ./apps/mobile --clear --lan
```

Open Expo Go (SDK 52) and scan the QR, or enter `exp://<YOUR_LAN_IP>:8081` manually. Full test script in [`docs/TESTING-EXPO-GO.md`](docs/TESTING-EXPO-GO.md).

## Docs

| Doc | Content |
|-----|---------|
| [`docs/SETUP.md`](docs/SETUP.md) | Detailed install, env, seed, healthcheck |
| [`docs/TESTING-EXPO-GO.md`](docs/TESTING-EXPO-GO.md) | Android + iOS test script with Expo Go |
| [`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md) | Symptom → cause → fix → alternative for common failures |

## Known issues

- Google Maps key (`EXPO_PUBLIC_GOOGLE_MAPS_KEY`) is only needed for standalone/dev-client builds; Expo Go uses its own key.
- iOS Expo Go renders Apple Maps (ignores `PROVIDER_GOOGLE`) — expected.
- App UI strings are in PT-BR (Brazilian study product); a full i18n pass is a known follow-up.
- `tsc --noEmit` reports 9 pre-existing `@tabler/icons-react-native` declaration errors, unrelated to the app logic.

---

## Português

Projeto de estudo (Rocketseat NLW Pocket Mobile) refatorado com foco em vaga React Native: descoberta de cupons com mapa nativo, filtro por categoria, lista em bottom-sheet, detalhe do estabelecimento e resgate de cupom via QR Code na câmera.

## Estrutura

```
apps/mobile/  -> Expo Router + React Native (SDK 52), mapa + fluxo de cupom com câmera
apps/api/     -> Express + Prisma + SQLite, categorias / mercados / cupons
docs/         -> SETUP, TESTING-EXPO-GO, TROUBLESHOOTING (em inglês)
```

## Início rápido

Pré-requisitos: Node 22, Expo Go (SDK 52) no celular, PC e celular na mesma Wi-Fi.

```bash
npm install                       # workspaces: instala api + mobile
cp apps/api/.env.example apps/api/.env
cp apps/mobile/.env.example apps/mobile/.env
# edite apps/mobile/.env -> EXPO_PUBLIC_API_URL=http://<SEU_IP_LAN>:3333
npx --prefix apps/api prisma migrate dev
npm run dev:api                    # healthcheck: GET http://<SEU_IP_LAN>:3333/categories
./node_modules/.bin/expo start ./apps/mobile --clear --lan
```

Abra o Expo Go (SDK 52) e escaneie o QR, ou digite `exp://<SEU_IP_LAN>:8081` manualmente. Roteiro completo em [`docs/TESTING-EXPO-GO.md`](docs/TESTING-EXPO-GO.md) e erros comuns em [`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md).
