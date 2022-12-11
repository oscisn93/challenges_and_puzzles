import { readFileSync } from "fs";

const input: Array<Array<string>> = readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((line) => line.split(" "));

function getDirectorySizes(): number[] {
  let path = new Array<string>();
  const sizes = new Map<string, number>();
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    // handle cd
    if (line[1] === "cd") {
      let dir = line[2];
      // if the path is root empty the stack
      if (dir === "/") path = [];
      // if .. revert by popping the stack
      else if (dir === "..") path.pop();
      // otherwise push the new directory onto the stack
      else path.push(dir);
    } else {
    // handle ls
      do {
        i++;
        // ignore directories
        if (input[i][0] === "dir") continue;
        // must be a file, therefore, size = file size
        const size = Number(input[i][0]);
        // use a copy of the stack to update all parent directories
        let p_copy = [...path];
        while (true) {
          const full_path = p_copy.join("/");
          // if the path does not yet exist update the map
          if (!sizes.has(full_path)) sizes.set(full_path, size);
          // other wise update size of existing path
          else {
            let d_size = sizes.get(full_path);
            sizes.set(full_path, d_size + size);
          }
          // continue until the stack is empty
          if (p_copy.length == 0) break; 
          p_copy.pop();
        }
        // continue until the next line contains a command
      } while (input[i + 1] && input[i + 1][0] != "$");
    }
  }
  return [...sizes.values()];
}

function firstPart() {
  const sizes = getDirectorySizes();
  console.log(sizes.filter((n) => n <= 100000).reduce((a, b) => a + b));
}

firstPart();

function secondPart() {
  const sizes = getDirectorySizes();
  const used = Math.max(...sizes);
  const free = 70000000 - used;
  const required = 30000000 - free;
  console.log(Math.min(...sizes.filter((n) => n >= required)));
}

secondPart();
