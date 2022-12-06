import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const isUnique = (chars: string) => {
  return new Set(chars).size == chars.length;
};

const getMarker = (input: string, distinctChars: number): number => {
  let firstMarker = 0;
  for (let i = 0; i < input.length; i++) {
    const charSet = input.slice(i, i + distinctChars);

    if (isUnique(charSet)) {
      firstMarker = i + distinctChars;
      break;
    }
  }

  return firstMarker;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return getMarker(input, 4);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return getMarker(input, 14);
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
