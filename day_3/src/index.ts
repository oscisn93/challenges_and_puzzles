import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf-8").split("\n");

// we start with a space so that there is no need for the use of an offset
// when gettting the index of a character to get its priority
const priorities = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const duplicates: string[] = [];
for (const compartment of input) {
  const middle = compartment.length / 2;
  let [first, second] = [
    compartment.slice(0, middle),
    compartment.slice(middle),
  ];
  for (let c of first) {
    if (second.indexOf(c) != -1) {
      duplicates.push(c);
      break;
    }
  }
}
const badges: string[] = []
while(input.length > 0) {
  const [first, second, third] = [input.pop(), input.pop(), input.pop()];
  for (const c of first) {
    if (second.indexOf(c) != -1 && third.indexOf(c) != -1) {
      badges.push(c);
      break;
    }
  }
}

const sum_of_priorities = (list: string[]) => list
  .map((c) => priorities.indexOf(c))
  .reduce((a, b) => a + b);

console.log(`Sum of the priorities of all duplicates is: ${sum_of_priorities(duplicates)}`);
console.log(`Sum of the priorities of all the badges is: ${sum_of_priorities(badges)}`);
