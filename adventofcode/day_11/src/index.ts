import { readFileSync } from "fs";

const input = readFileSync("test.txt", "utf-8")
  .split("\n\n")
  .map((line) => {
    return line.split("\n").map((s) => {
      return s.trim();
    });
  });

type Monkey = {
  items: Array<number>;
  op: (cur: number) => number;
  test: number;
  t_idx: number;
  f_idx: number;
  inspections: number;
};

function operation(args: Array<string>): (cur: number) => number {
  const key = args.splice(1, 1).join();
  const [a, b] = args;
  if (a === "old" && b === "old") {
    return function (cur) {
      if (key === "*") return cur * cur;
      return cur * 2;
    };
  }
  let c = 0;
  if (a === "old") c = Number(b);
  else c = Number(a);
  return function (cur) {
    if (key === "*") return cur * c;
    return cur + c;
  };
}

function parseMonkeys(input: Array<Array<string>>): Array<Monkey> {
  const monkeys: Array<Monkey> = [];
  for (const item of input) {
    const items = item[1]
      .split(" ")
      .splice(2)
      .map((n) => Number(n.replace(/[,]+/g, "")));
    const vars = item[2].split(" ").splice(3);
    const test_num = Number(item[3].split(" ").pop());
    const t_monk = Number(item[4].split(" ").pop());
    const f_monk = Number(item[5].split(" ").pop());
    monkeys.push({
      items: items,
      op: operation(vars),
      test: test_num,
      t_idx: t_monk,
      f_idx: f_monk,
      inspections: 0,
    } as Monkey);
  }
  return monkeys;
}

function simulation(): void {
  const monkeys = parseMonkeys(input);
  const rounds = 20;
  console.log("\tRunning simulation...");
  for (let i = 0; i < rounds; i++) {
    console.log(`\n...\n\nRound ${i + 1}`);
    for (const monkey of monkeys) {
      for (const item of monkey.items) {
        let cur = monkey.op(item);
        if (cur % monkey.test === 0) {
          monkeys[monkey.t_idx].items.push(cur);
        } else {
          monkeys[monkey.f_idx].items.push(cur);
        }
      }
      monkey.inspections += monkey.items.length || 0;
      monkey.items = [];
    }
    monkeys
      .map(({ inspections }) => inspections)
      .forEach((inspections, idx) =>
        console.log(`Monkey ${idx}: ${inspections}`)
      );
  }
  let [m, n] = monkeys
    .map(({ inspections }) => inspections)
    .sort((a, b) => b - a);
  console.log(`\n...\n\nMonkey business: ${m * n}`);
}

simulation();
