import crypto from "node:crypto";

function deriveCouponCode(marketId: string) {
  return crypto
    .createHash("sha256")
    .update(marketId)
    .digest("hex")
    .substring(0, 8)
    .toUpperCase();
}

describe("coupon code contract", () => {
  it("is an 8-char uppercase hex code", () => {
    expect(
      deriveCouponCode("bb4b9618-8eed-4f6d-8b2a-2b2b2b2b2b2b")
    ).toMatch(/^[0-9A-F]{8}$/);
  });

  it("is deterministic per market", () => {
    const id = "bb4b9618-8eed-4f6d-8b2a-2b2b2b2b2b2b";
    expect(deriveCouponCode(id)).toBe(deriveCouponCode(id));
  });

  it("differs across markets", () => {
    expect(deriveCouponCode("market-a")).not.toBe(deriveCouponCode("market-b"));
  });
});
