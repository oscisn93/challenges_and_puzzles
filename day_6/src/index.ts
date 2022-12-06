import { readFileSync } from "fs";

// returns the index of the first character after
// n consecutive unique characters past the nth index
function findIndexOfMarker(size: number) {
  const input: string = readFileSync("input.txt", "utf-8");
  for (let i = size; i < input.length; i++) {
    let chunk = input.slice(i - size, i);
    const set = new Set(chunk.split(""));
    if (set.size == chunk.length) return i;
  }
}
console.log(findIndexOfMarker(4));
console.log(findIndexOfMarker(14));
