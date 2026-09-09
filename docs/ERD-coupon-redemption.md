# ERD — QR Coupon Redemption (Nearby)

> Status: Implemented in this repo. Written as an Engineering Requirement Document
> in Whippy format: problem → requirements → approach → API deps → testing →
> rollout → metrics → risks. Audience: async reviewers across timezones.

## 1. Problem

Coupons must be validated **in person** at the market. Without a validation gate,
anyone browsing the detail screen could screenshot a code and redeem it remotely,
and redeemed codes could be reused.

## 2. User requirements

1. As a customer, I open a market and see its cover, details, rules, and coupon availability.
2. As a customer, I tap "QR Code" and scan the market's physical QR to redeem.
3. As a market owner, redeemed coupons decrement stock exactly once — no reuse.
4. As a customer without camera access, I get a clear explanation, not a dead screen.

## 3. Technical approach

- Detail screen (`apps/mobile/src/app/market/[id].tsx`): fetch market by id via
  `useLocalSearchParams`; effect depends on `[params.id]` only (no refetch loop).
- "QR Code" button → `requestPermission()` → denied path shows an alert and stops.
- Granted path opens a `Modal` with `CameraView` (`barcodeTypes: ['qr']`).
- `qrLock` ref + 500ms debounce: first scan locks, then a confirm dialog
  ("A redeemed coupon cannot be reused. Do you really want to redeem it?").
- "Yes" → `PATCH /coupons/:id` → coupon code rendered by `<Coupon code />`.
- "No" cancels with zero side effects; `finally` resets the fetching flag.

## 4. API dependencies

| Call | Latency (LAN, measured 2026-09-09) | Contract |
|---|---|---|
| `GET /markets/:id` | ~12ms, 2 rules + cover | 404 → back navigation with alert |
| `PATCH /coupons/:id` | stock 10 → 9 | Returns deterministic 8-char uppercase code (SHA-256 of market id); 404 when place missing; error when stock is 0 |

Derivation (server, `apps/api/src/controllers/coupons-controller.ts:33-38`):
`sha256(market.id).hex.substring(0, 8).toUpperCase()`. Mobile treats the code as
opaque display text and asserts the format in `src/lib/__tests__/coupon.test.ts`.

## 5. Testing strategy

- Unit (`jest-expo`, this repo): API client config (baseURL set, timeout ≥ 5000ms),
  coupon-code format contract (8-char uppercase hex, deterministic, unique per market),
  analytics dispatch (events reach the provider, `track` never throws).
- Manual (physical device, `docs/TESTING-EXPO-GO.md`): permission denied → alert;
  scan → confirm → code visible; stock decrements in DB.
- Next (not yet): e2e scan-to-coupon success rate on device; do not invent numbers.

## 6. Rollout

1. Land behind the existing detail route — no new navigation surface.
2. Verify on Expo Go (SDK 57) with LAN API; reseed if stock is 0.
3. Monitor funnel events: `filter_selected` → `market_opened` → `coupon_redeemed`
   (`apps/mobile/src/lib/analytics.ts`, console provider by default,
   PostHog/Mixpanel-compatible interface).

## 7. Success metrics

- Scan-to-code completion rate on device (target: measure first, then set SLO).
- `PATCH /coupons/:id` p95 latency (baseline: single-digit ms on LAN).
- Zero double-redeems (stock decrements exactly once per confirm).
- Zero analytics-induced crashes (`track` is try/caught by design).

## 8. Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Camera permission denied | High | Alert with guidance; flow stops cleanly, detail stays usable |
| Double scan fires two PATCHes | Medium | `qrLock` ref + 500ms debounce + confirm dialog before mutation |
| Stock hits 0 mid-flow | Low | Server rejects with "No coupons available"; client shows error alert |
| Expo Go camera behavior differs per OEM | Medium | Manual matrix on 360–430px devices; log OEM + outcome in test doc |
