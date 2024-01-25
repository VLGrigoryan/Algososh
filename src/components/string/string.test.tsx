import { generatePalindromeSteps } from "../../utils";

describe("Testing the string reversal algorithm", () => {

  function getLastStepValue(str: string): string {
    return generatePalindromeSteps(str)[generatePalindromeSteps(str).length - 1].map((element) => element.value).join("");
  }

  it("Correctly reverses a string with an even number of characters", () => {
    expect(getLastStepValue("abcd")).toBe("dcba");
  });

  it("Correctly reverses a string with an odd number of characters", () => {
    expect(getLastStepValue("abcde")).toBe("edcba");
  });

  it("Correctly reverses a string with a single character", () => {
    expect(getLastStepValue("a")).toBe("a");
  });

  it("Correctly reverses an empty string", () => {
    expect(getLastStepValue("")).toBe("");
  });

});
