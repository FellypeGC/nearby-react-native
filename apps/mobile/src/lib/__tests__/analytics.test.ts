import {
  AnalyticsEvents,
  resetAnalyticsProvider,
  setAnalyticsProvider,
  track,
} from "../analytics";

describe("analytics", () => {
  afterEach(() => {
    resetAnalyticsProvider();
  });

  it("dispatches events with props to the active provider", () => {
    const seen: Array<{ event: string; props?: Record<string, unknown> }> = [];
    setAnalyticsProvider({
      track: (event, props) => {
        seen.push({ event, props });
      },
    });

    track(AnalyticsEvents.filterSelected, { categoryId: "cat-1" });

    expect(seen).toEqual([{ event: "filter_selected", props: { categoryId: "cat-1" } }]);
  });

  it("exposes the funnel event names", () => {
    expect(AnalyticsEvents).toEqual({
      filterSelected: "filter_selected",
      marketOpened: "market_opened",
      couponRedeemed: "coupon_redeemed",
    });
  });

  it("never throws, even with a broken provider", () => {
    setAnalyticsProvider({
      track: () => {
        throw new Error("provider down");
      },
    });

    expect(() => track("any_event")).not.toThrow();
  });
});
