import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getStacks = (rows: string[]) => {
  const stacks: Array<string[]> = [];

  rows.forEach((row) => {
    for (let i = 0; i < row.length; i++) {
      const element = row[i];

      if (i % 4 === 1 && element.trim()) {
        const rowIndex = (i - 1) / 4;

        if (stacks[rowIndex]) {
          stacks[rowIndex].push(element);
        } else {
          stacks[rowIndex] = [element];
        }
      }
    }
  });

  return stacks;
};

const getTopRow = (
  moves: string[],
  stacks: Array<string[]>,
  isCrateMover9000 = false,
): string => {
  moves.forEach((move) => {
    const split = move.split(" ");
    const amount = split[1];
    const from = split[3];
    const to = split[5];

    let items: string[] = [];

    for (let i = 0; i < +amount; i++) {
      const item = stacks[+from - 1].shift();
      if (item)
        isCrateMover9000 ? items.push(item) : stacks[+to - 1].unshift(item);
    }
    if (isCrateMover9000) {
      stacks[+to - 1] = [...items, ...stacks[+to - 1]];
    }
  });

  return stacks.reduce((a, b) => {
    return (a += b[0]);
  }, "");
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rows = input.split("\n", 8);
  const moves = input.split("\n").slice(10);
  const stacks = getStacks(rows);

  return getTopRow(moves, stacks);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rows = input.split("\n", 8);
  const moves = input.split("\n").slice(10);
  const stacks = getStacks(rows);

  return getTopRow(moves, stacks, true);
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
