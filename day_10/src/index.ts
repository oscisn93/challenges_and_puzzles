import { readFileSync } from "fs";
import { stringify } from "querystring";

function* input_lines(): Generator<string[], void, unknown> {
  const input = readFileSync("test.txt", "utf-8")
    .split("\n")
    .map((line) => line.split(" "));
  for (let i = 0; i < input.length; i++) {
    yield input[i];
  }
}

function signal_strengths() {
  const lines = input_lines();
  const cycle: Record<string, number> = {
    idx: 0,
    x: 1,
    stack: 0.1,
  };
  let checkpoint = 20;
  const signal_strengths: Array<Record<string,number>> = [];
  while (true) {
    cycle.idx++;      
    if (cycle.idx === checkpoint && cycle.idx < 240) {
        signal_strengths.push({...cycle});
        checkpoint += 40;
    }
    if (cycle.stack != 0.1) {
      cycle.x += cycle.stack;
      cycle.stack = 0.1;
      continue;
    }
    let { value, done } = lines.next();
    if (done) break;
    let cmd = String(value[0]);
    if (cmd !== "noop") {
      cycle.stack = Number(value[1]);
    }
  }
  return signal_strengths.map(({idx, x}) => idx*x).reduce((a,b) => a+b);
}

console.log(signal_strengths());

function render_CRT() {
  const lines = input_lines();
  const stack: Array<number> = [];
  let cycle = 0;
  let x = 1;
  let log_line = "";
  while (true) {
    cycle++;
    let cursor_pos = [x % 40, x + (1 % 40), x + (2 % 40)];
    let sprite = ".";
    if (cursor_pos.includes(cycle % 40)) sprite = "#";
    log_line += sprite;
    if (log_line.length === 40) {
      console.log(log_line);
      log_line = "";
    }
    if (stack.length >= 1) {
      x += stack.pop();
      continue;
    }
    let { value, done } = lines.next();
    if (done) break;
    if (value) {
      let opcode = value[0];
      if (opcode !== "noop") {
        stack.push(Number(value[1]));
      }
    }
  }
}

render_CRT();
