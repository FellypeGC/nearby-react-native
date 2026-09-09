import { api } from "../api";

describe("api client", () => {
  it("has an http baseURL (env or LAN fallback)", () => {
    expect(api.defaults.baseURL).toMatch(/^http:\/\//);
  });

  it("has a production-safe timeout (regression: was 700ms)", () => {
    expect(api.defaults.timeout).toBeGreaterThanOrEqual(5000);
  });
});
