# Nearby — monorepo local

Cópia de estudo (Rocketseat NLW Pocket Mobile) para refatorar rumo à vaga Tempo — Frontend Engineer (React Native).

## Estrutura

```
apps/mobile/  -> Expo Router + React Native (copiado de NLW-Mobile/react-native/nearby, sem .git/.expo/node_modules)
apps/api/     -> Express + Prisma + SQLite (copiado de nlw-pocket-mobile-api-main, sem node_modules/.env)
.career/      -> NÃO versionado (gitignored): cópia da vaga + bullets XYZ no método Google
```

## Rodar por aqui

1. API:
```bash
npm --prefix apps/api install
# copiar .env.example -> .env
npx --prefix apps/api prisma migrate dev
npm run dev:api
# healthcheck: GET http://SEU_IP_LAN:3333/categories
```

2. Mobile (device físico recomendado — mapa não renderiza bem em emulador sem Play Services):
```bash
npm --prefix apps/mobile install
# copiar apps/mobile/.env.example -> apps/mobile/.env com seu IP LAN
npm run dev:mobile
```

> `apps/mobile/src/services/api.ts` ainda aponta para IP fixo `192.168.100.16:3333` com timeout 700ms — trocar por `process.env.EXPO_PUBLIC_API_URL` (ver `.env.example`). Bugs mapeados: `home.tsx` (`./categories`, `getCurrentLocation` nunca chamada), `place/index.tsx` (onPress não repassado), `app.json` sem plugins de mapa/location.

## Career

Ver `.career/tempo-react-native.md` (método XYZ do Google, com Evidence/STAR/ATS por bullet). Pasta ignorada pelo git de propósito.
