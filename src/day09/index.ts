import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

class Position {
  x: number = 0;
  y: number = 0;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }
}

function solve(input: Array<string>, length: number): number {
  const rope: Position[] = [];
  const visited = new Set<string>();

  for (let i = 0; i < length; i++) {
    rope.push(new Position());
  }

  input.forEach((it) => {
    const split = it.split(" ");
    const addValue =
      split[0] === "R"
        ? new Position(1, 0)
        : split[0] === "U"
        ? new Position(0, 1)
        : split[0] === "L"
        ? new Position(-1, 0)
        : new Position(0, -1);

    for (let j = 1; j <= Number(split[1]); j++) {
      rope[0].x += addValue.x;
      rope[0].y += addValue.y;

      for (let i = 1; i < rope.length; i++) {
        const xDistance: number = Math.abs(rope[i].x - rope[i - 1].x);
        const yDistance: number = Math.abs(rope[i].y - rope[i - 1].y);

        if (
          (xDistance > 1 && yDistance > 0) ||
          (yDistance > 1 && xDistance > 0)
        ) {
          rope[i].x += rope[i - 1].x > rope[i].x ? 1 : -1;
          rope[i].y += rope[i - 1].y > rope[i].y ? 1 : -1;
        } else if (xDistance > 1) {
          rope[i].x += rope[i - 1].x > rope[i].x ? 1 : -1;
        } else if (yDistance > 1) {
          rope[i].y += rope[i - 1].y > rope[i].y ? 1 : -1;
        }
      }

      visited.add(`${rope.slice(-1)[0].x}:${rope.slice(-1)[0].y}`);
    }
  });

  return visited.size;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return solve(input.split("\n"), 2);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return solve(input.split("\n"), 10);
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
