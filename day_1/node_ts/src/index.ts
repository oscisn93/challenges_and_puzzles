import { readFileSync } from "fs";

const sums: number[] = readFileSync("input.txt", "utf-8")
    .split("\n\n")
    .map((set) =>
      set
        .split("\n")
        .map((s) => Number(s))
        .reduce((a, b) => a + b)
    );
// part 1
const max = Math.max(...sums);
// part 2
const sumTopThree = sums.sort().splice(-3).reduce((a, b)=> a+b);
console.log(`Max sum is: ${max}`);
console.log(`The sum of the top three sums is: ${sumTopThree}`);
