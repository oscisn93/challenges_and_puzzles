import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((line) => line.split(" "));
const directions = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
};
const start = [0, 0];

function trackTailMoves(size: number) {
  let knots = [...Array(size)].map(() => [...start]);
  const tailMoves = new Set<string>();
  tailMoves.add(start.toString());
  for (const line of input) {
    let moves = Number(line[1]);
    while (moves > 0) {
      let [x, y] = directions[line[0]];
      knots[0][0] += x;
      knots[0][1] += y;
      for (let i = 1; i < knots.length; i++) {
        let head = knots[i - 1];
        let tail = knots[i];
        if (head[0] === tail[0]) {
          let dy = head[1] - tail[1];
          if (Math.abs(dy) > 1) tail[1] += Math.sign(dy);
        } else if (head[1] === tail[1]) {
          let dx = head[0] - tail[0];
          if (Math.abs(dx) > 1) tail[0] += Math.sign(dx);
        } else {
          let d = [head[0] - tail[0], head[1] - tail[1]];
          if (Math.abs(d[0]) > 1 || Math.abs(d[1]) > 1) {
            tail[0] += Math.sign(d[0]);
            tail[1] += Math.sign(d[1]);
          }
        }
        tailMoves.add(knots[knots.length - 1].toString());
      }
      moves--;
    }
  }
  return tailMoves.size;
}

console.log(`Part 1: ${trackTailMoves(2)}`);
console.log(`Part 2: ${trackTailMoves(10)}`);

// function part1() {
//   let head = [...start],
//     tail = [...start];
//   const tailMoves = new Set<string>();

//   for (const line of input) {
//     let moves = Number(line[1]);
//     while (moves > 0) {
//       let [x, y] = directions[line[0]];
//       head[0] += x;
//       head[1] += y;
//       if (head[0] - 2 === tail[0]) {
//         tail[0] += 1;
//         tail[1] = head[1];
//       } else if (head[1] - 2 === tail[1]) {
//         tail[1] += 1;
//         tail[0] = head[0];
//       } else if (head[0] + 2 === tail[0]) {
//         tail[0] -= 1;
//         tail[1] = head[1];
//       } else if (head[1] + 2 === tail[1]) {
//         tail[1] -= 1;
//         tail[0] = head[0];
//       }
//       moves--;
//       tailMoves.add(tail.toString());
//     }
//   }
// }
