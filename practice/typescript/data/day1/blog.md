## Advent of Code 2020 Day One Challenge: Report Repair ##

### Part One ###

***

You are given an expense report and asked to analyze it. The accountant wants you write a program to find the two entries that add up to `$2020` and return their product as output.

A sample report is provided in the file `test.txt`:
```yaml
1721
979
366
299
675
1456
```
> In this exapmle the two entries that add up to `$2020` are `$1721` and `$299`, and their product is `514579`.
### Solution ###
The point then is to create a node/typescript program that parses this file and produces the desired output. 

1. We first begin by writing the code to fetch the file data and store it as an array of numbers. 

Since this will be done synchronously, we can use the `readFileSync` method from the node `fs` module like so:

```typescript
import { readFileSync } from "fs";
const input = readFileSync('./data/test.txt', 'utf-8');
```
However, if we hover over the variable name we see that this gives us a string representation of the string and not a list of numbers: 

```typescript
const input: string
```

...And if we print out input we just get the file printed out to the console. if we're obnservant we notice that the string actually contains newline characters between the numbers, so we can use the `split` method with a delimeter of `\n`, to get an array of just the numbers. Lets print the result:

```typescript
import { readFileSync } from "fs";
const input = readFileSync('./data/test.txt', 'utf-8');

const nums = input.split('\n');
```
> output:
```bash
[ '1721', '979', '366', '299', '675', '1456' ]
```

There is one last issue this is an array of strings, not numbers. You can use your prefered way of convering the values here. Personally I like to map over the array and explicitly cast them.

```typescript
import { readFileSync } from "fs";

const nums: Array<number> = readFileSync("./data/test.txt", "utf-8")
  .split("\n")
  .map((num) => Number(num));
```

Which gives the appropriate output:

```bash
[ 1721, 979, 366, 299, 675, 1456 ]
```
2. Now we have to create an algorithm which searches through the array and finds the two numbers that add up to 2020 (We will assume for now that such a sum always exists and that there is only one pair of numbers which satisfies the condition).

We could do this easily using the brute force solution:

```typescript
function sum_twenty(nums: Array<number>): [number, number] {
  const target = 2020;
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] === target) {
            return [nums[i], nums[j]];
        }
    }
  }
  return [0, 0];
}
```

This approach works jsut fine, however it suffers from an O(n^2) runtime because of the nested loops. We could do better if we use the array `in` operator to use search for the matching pair in the array- a hashmap solution:

```typescript
function sum_twenty(nums: Array<number>): [number, number] {
  const target = 2020;
  for (const n of nums) {
    let m = target - n;
    if (nums.indexOf(m) > 0) return [n, m];
  }
  return [0, 0];
}
```
3. We want to output the product of these two numbers.

Instead of creating anoter function lets just edit our existing function to return this number instead of the tuple of its factors. Additionally we want to make the target a parameter so that we can find such a product for two numbers that add up to any potential target number: 

```typescript
function prod_sum(nums: Array<number>, target: number): number {
  for (const n of nums) {
    let m = target - n;
    if (nums.indexOf(m) > 0) return n*m;
  }
  return -1;
}
```
Which gives the expected output of `514579`.

4. Now we run our completed program with the actual expense report.
> `index.ts`:

```typescript
import { readFileSync } from "fs";

const nums: Array<number> = readFileSync("./data/input.txt", "utf-8")
  .split("\n")
  .map((num) => Number(num));

const target = 2020;

function prod_sum(nums: Array<number>, target: number): number {
  for (const n of nums) {
    let m = target - n;
    if (nums.indexOf(m) > 0) return n*m;
  }
  return -1;
}

console.log(prod_sum(nums, target));
```

> `output`:
```bash
713184
```
> Which is correct!

### Part Two ###

***

Now we are asked to find a set of three numbers in the expense report that meets the same condition: All three must have a sum of 2020. We are again asked to give their product.

Once again, we can look at the sample report that is provided:
```yaml
1721
979
366
299
675
1456
```
> In this exapmle the three entries that add up to `$2020` are `$979`, `$675` and `$366`, and their product is `241861950`.

### Solution ###

Once again we can use a naive brute force solution, which unfotrtunately is now even more inefficient as it has an O(n^3) runtime:

```typescript
function three_sum(nums: Array<number>, target: number): [number, number, number] {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[i] + nums[j] + nums[k] === target) {
          return [nums[i], nums[j], nums[k]];
        }
      }
    }
  }
  return [0, 0, 0];
}
```

However, it is not as easy to optimize this one as the previous one. We must be a little bit more clever in our use of a hashmap. Instead of being able to search for the missig value outright, we mnust itertate throught the array twice, take the sum of both numbers, and use the difference from both and the target as the new missing number. This reduces the time complexity to O(n^2). Still bad, but nowhere near as bad as previously.


```typescript
function three_sum(nums: Array<number>, target: number): [number, number, number] {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      let missing = target - (nums[i] + nums[j]);
      if (nums.indexOf(missing) > 0) return [nums[i], nums[j], missing];
    }
  }
  return [0, 0, 0];
}
```

As we can see the final version is basically just our Part One solution with an extra loop:

```typescript
import { readFileSync } from "fs";

const nums: Array<number> = readFileSync("./data/input.txt", "utf-8")
  .split("\n")
  .map((num) => Number(num));

const target = 2020;

function three_sum(nums: Array<number>, target: number): number {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      let missing = target - (nums[i] + nums[j]);
      if (nums.indexOf(missing) > 0) return nums[i] * nums[j] * missing;
    }
  }
  return -1;
}

console.log(three_sum(nums, target));
```

> `output`:
```bash
261244452
```
> Which is correct!
