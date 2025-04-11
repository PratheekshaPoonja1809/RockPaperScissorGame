import { describe, expect, test } from "vitest";
import { getRandomChoice } from "../helpers/getRandomChoice";
import { CHOICES } from "../Constants";

describe("getRandomChoice", () => {
  test("returns empty string when options is empty", () => {
    expect(getRandomChoice([])).toBe("");
  });

  test("returns empty string when options is undefined", () => {
    expect(getRandomChoice(undefined)).toBe("");
  });

  test("returns an item from the options array", () => {
    const options = CHOICES;
    const result = getRandomChoice(options);
    expect(options).toContain(result);
  });

  test("returns the only item if options has one", () => {
    const result = getRandomChoice(["rock"]);
    expect(result).toBe("rock");
  });

  test("returns a valid index multiple times", () => {
    const options = ["rock", "paper", "scissors"];
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      results.add(getRandomChoice(options));
    }
    for (let choice of results) {
      expect(options).toContain(choice);
    }
  });
});
