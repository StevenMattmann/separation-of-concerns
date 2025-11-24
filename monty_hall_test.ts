
import { expect } from "@std/expect";
import { simulateMontyHall } from "./monty_hall_main.ts";

Deno.test("simulateMontyHall with 0 games returns 0 stats", () => {
  const result = simulateMontyHall(0);

  expect(result.totalGames).toBe(0);
  expect(result.stayWins).toBe(0);
  expect(result.switchWins).toBe(0);
  expect(result.stayWinRate).toBe(0);
  expect(result.switchWinRate).toBe(0);
});

Deno.test("simulateMontyHall throws on negative game count", () => {
  expect(() => simulateMontyHall(-1)).toThrow();
});

Deno.test("simulateMontyHall with many games: switching sollte besser sein", () => {
  const games = 10000;
  const result = simulateMontyHall(games);

  // Basis-Mathe: Switch ≈ 2/3, Stay ≈ 1/3
  expect(result.switchWinRate).toBeGreaterThan(result.stayWinRate);

  expect(result.stayWinRate).toBeGreaterThan(0.25);
  expect(result.stayWinRate).toBeLessThan(0.45);

  expect(result.switchWinRate).toBeGreaterThan(0.55);
  expect(result.switchWinRate).toBeLessThan(0.80);
});
