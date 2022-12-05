import { readFileSync } from "fs";

const input: string = readFileSync("input.txt", "utf-8");
const [arrangement, procedure] = input.split("\n\n");
let crates = arrangement.split("\n").map(c => {
    let level = [];
    for (let i = 0; i< c.length/4; i++) {
        level.push(c[i*4+1]);
    }
    return level;
});

let positions: number[] = crates.pop().map(a => Number(a));
let stacks: string[][] = [];
for (let i = 0; i < positions.length; i++) {
    stacks.push([])
    for (let crate of crates) {
        if (crate[i] != ' ') {
            stacks[i].unshift(crate[i]);
        }
    }
}

for (const step of procedure.split("\n")) {
    let instructions = step.split(' ');
    let [from, to, moves] = [
        Number(instructions[3])-1, 
        Number(instructions.pop())-1, 
        Number(instructions[1])
    ];
// part 1 logic
    // for (let i = 0; i < moves; i++) {
    //     stacks[to].push(stacks[from].pop());
    // }
// part 2 logic
    const slice = stacks[from].splice(stacks[from].length-moves);
    stacks[to] = stacks[to].concat(...slice);
}
const top = stacks.map(stack => stack.pop());
console.log(top.join(''));