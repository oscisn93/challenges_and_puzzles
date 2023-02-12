import { readFileSync } from "fs";

function day_one() {
  const nums: Array<number> = readFileSync("./data/day1/input.txt", "utf-8")
    .split("\n")
    .map((num) => Number(num));

  const target = 2020;

  function two_sum(nums: Array<number>, target: number): number {
    for (const n of nums) {
      let m = target - n;
      if (nums.indexOf(m) > 0) return n * m;
    }
    return -1;
  }

  function three_sum(nums: Array<number>, target: number): number {
    for (let i = 0; i < nums.length - 1; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        let missing = target - (nums[i] + nums[j]);
        if (nums.indexOf(missing) > 0) return nums[i] * nums[j] * missing;
      }
    }
    return 0;
  }

  console.log(two_sum(nums, target));
  console.log(three_sum(nums, target));
}

const input: Array<Array<string>> = readFileSync("./data/day2/input.txt", "utf-8")
    .split("\n")
    .map((line) => line.split(' '));

console.log(input);

// let valid_passwords = 0;

// for (const line of input) {
//   let [low, high] = line[0].split('-');
//   const char = RegExp(line[1][0], 'g');
//   const matches = [...line[2].matchAll(char)].length;
//   if (matches >= Number(low) && matches <= Number(high)) valid_passwords++;
// }

// console.log(valid_passwords);

let valid_passwords = 0;

for (const line of input) {
  const [low, high] = line[0].split('-');
  const char = line[1][0];
  const password = line[2];
  if (
    password[Number(low)-1] === char && password[Number(high)-1] !== char ||
    password[Number(high)-1] === char && password[Number(low)-1] !== char
  ) valid_passwords++;
}

console.log(valid_passwords);