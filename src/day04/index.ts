import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const isWithinRange = (a: string, b: string): boolean => {
  if (
    (+a.split("-")[0] <= +b.split("-")[0] &&
      +a.split("-")[1] >= +b.split("-")[1]) ||
    (+b.split("-")[0] <= +a.split("-")[0] &&
      +b.split("-")[1] >= +a.split("-")[1])
  ) {
    return true;
  }
  return false;
};

const part1 = (rawInput: string) => {
  const pairs = parseInput(rawInput).split("\n");
  let overlap = 0;

  for (let i = 0; i < pairs.length; i++) {
    const [first, second] = pairs[i].split(",");

    if (isWithinRange(first, second)) {
      overlap++;
    }
  }

  return overlap;
};

const isOverlapping = (a: string, b: string): boolean => {
  if (
    (+a.split("-")[0] >= +b.split("-")[0] &&
      +a.split("-")[0] <= +b.split("-")[1]) ||
    (+a.split("-")[1] >= +b.split("-")[0] &&
      +a.split("-")[1] <= +b.split("-")[1])
  ) {
    return true;
  }
  return false;
};

const part2 = (rawInput: string) => {
  const pairs = parseInput(rawInput).split("\n");
  let overlap = 0;

  for (let i = 0; i < pairs.length; i++) {
    const [first, second] = pairs[i].split(",");

    if (isOverlapping(first, second) || isOverlapping(second, first)) {
      overlap++;
    }
  }
  return overlap;
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
