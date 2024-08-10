import { Greeter } from "../src/Greeter";
import { describe, it, expect, vi } from "vitest";

describe("Greeter", () => {
  it("should greet the person", () => {
    const greeter = new Greeter();
    const to = "John";

    const consoleSpy = vi.spyOn(console, "log");
    greeter.greet(to);

    expect(consoleSpy).toHaveBeenCalledWith(`Hello ${to}`);

    consoleSpy.mockRestore();
  });
});
