import { describe, beforeEach, expect, it } from "vitest";
import { add } from "../src/index";


describe("add", () => {
  it("should add two numbers", () => {
    expect(add(1, 2)).toBe(3);
  });
    
    it("should throw an error if one of the arguments is not a number", () => { 
        expect(() => add(1, "2" as any)).toThrowError("Both arguments must be numbers");
    });
});