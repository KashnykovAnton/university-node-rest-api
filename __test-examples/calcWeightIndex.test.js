import calcWeightIndex from "./calcWeightIndex.js";

describe("test calcWeightIndex function", () => {
  test("90, 1.9 => 24.93", () => {
    const result = calcWeightIndex(90, 1.9);
    expect(result).toBe(24.93);
  });

  it("1.9, 90 => error 'weight must be first argument, height - second'", () => {
    expect(() => calcWeightIndex(1.9, 90)).toThrow(
      "weight must be first argument, height - second"
    );
  });

  test(" => error 'weight and height required'", () => {
    expect(() => calcWeightIndex()).toThrow("weight and height required");
  });

  test("'90', '1.9' => error 'weight and height must be a number'", () => {
    expect(() => calcWeightIndex("90", "1.9")).toThrow(
      "weight and height must be a number"
    );
  });
});
