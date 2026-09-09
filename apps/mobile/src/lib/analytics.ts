declare const __DEV__: boolean | undefined;

export type AnalyticsProps = Record<string, unknown>;

export interface AnalyticsProvider {
  track(event: string, props?: AnalyticsProps): void;
}

const devConsoleProvider: AnalyticsProvider = {
  track(event, props) {
    if (typeof __DEV__ === "undefined" || __DEV__) {
      console.log("[analytics]", event, props ?? {});
    }
  },
};

let provider: AnalyticsProvider = devConsoleProvider;

export function setAnalyticsProvider(next: AnalyticsProvider) {
  provider = next;
}

export function resetAnalyticsProvider() {
  provider = devConsoleProvider;
}

export function track(event: string, props?: AnalyticsProps) {
  try {
    provider.track(event, props);
  } catch {
    // Analytics must never break the user flow.
  }
}

export const AnalyticsEvents = {
  filterSelected: "filter_selected",
  marketOpened: "market_opened",
  couponRedeemed: "coupon_redeemed",
} as const;
