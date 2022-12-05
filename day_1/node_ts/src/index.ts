import { readFileSync } from "fs";

const max: number = Math.max(
  ...readFileSync("input.txt", "utf-8")
    .split("\n\n")
    .map((set) =>
      set
        .split("\n")
        .map((s) => Number(s))
        .reduce((a, b) => a + b)
    )
);

console.log(`Max number is: ${max}`);
