import { generateId } from "../common";

describe("generateId", () => {
  it("generates random string id", () => {
    const result = generateId();
    expect(typeof result).toBe("string");
  });
});
