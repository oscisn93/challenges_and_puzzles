import { readFileSync } from "fs";

function findVisbleTreesInGrid() {
  const grid = readFileSync("input.txt", "utf-8").split("\n").map((line) => line.split("").map((n) => Number(n)));
  let [innerRow, innerColumn] = [grid[0].length - 1, grid.length - 1];
  let visible = grid.length * 4 - 4;
  for (let i = 1; i < innerColumn; i++) {
    for (let j = 1; j < innerRow; j++) {
      let cur = grid[i][j];
      let col = grid.map(n => n[j]);
      // create slices with all heigths left, right, above, and below cur
      let leftSlice = grid[i].slice(0, j);
      let rightSlice = grid[i].slice(j+1);
      let topSlice = col.slice(0,i);
      let bottomSlice = col.slice(i+1);
  // check if cur is bigger than all the numbers in any direction
      if (Math.max(...leftSlice) < cur) visible++;
      else if (Math.max(...rightSlice) < cur) visible++;
      else if (Math.max(...topSlice) < cur) visible++;
      else if (Math.max(...bottomSlice) < cur) visible++;
    }
  }
  return visible;
}

function findGreatestScenicScore() {
  const grid = readFileSync("input.txt", "utf-8").split("\n").map((line) => line.split("").map((n) => Number(n)));
  let [innerRow, innerColumn] = [grid[0].length - 1, grid.length - 1];
  let greatestScenicScore = 0;
  for (let i = 1; i < innerColumn; i++) {
    for (let j = 1; j < innerRow; j++) {
      let cur = grid[i][j];
      let col = grid.map(n => n[j]);
      // create slices with all heigths left, right, above, and below cur
      let leftSlice = grid[i].slice(0, j).reverse();
      let rightSlice = grid[i].slice(j+1);
      let topSlice = col.slice(0,i).reverse();
      let bottomSlice = col.slice(i+1);

      let views = [0,0,0,0]; // l,r,t,b
      for (let tree of leftSlice) {
        views[0]++;
        if (cur <= tree) break;
      }
      for (let tree of rightSlice) {
        views[1]++;
        if (cur <= tree) break;
      }
      for (let tree of topSlice) {
        views[2]++;
        if (cur <= tree) break;
      }
      for (let tree of bottomSlice) {
        views[3]++;
        if (cur <= tree) break;
      }
      let scenicScore = views.reduce((a,b) => a*b);
      if (scenicScore > greatestScenicScore) greatestScenicScore = scenicScore;
    }
  }
  return greatestScenicScore;
}
console.log(findVisbleTreesInGrid());
console.log(findGreatestScenicScore());
