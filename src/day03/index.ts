import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getPriority = (letter: string): number => {
  if (letter === letter.toLowerCase()) {
    return letter.charCodeAt(0) - 96;
  }

  return letter.charCodeAt(0) - 38;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const split = input.split("\n");

  let totalPriority = 0;
  for (let i = 0; i < split.length; i++) {
    const middleIndex = split[i].length / 2;
    const a = split[i].slice(0, middleIndex);
    const b = split[i].slice(middleIndex, split[i].length);

    const matchingLetters = [];
    for (let charIndex = 0; charIndex < a.length; charIndex++) {
      const matchingLetter = a.indexOf(b[charIndex]) > -1 ? b[charIndex] : null;
      if (matchingLetter) matchingLetters.push(b[charIndex]);
    }

    if (matchingLetters.length) {
      totalPriority += getPriority(matchingLetters[0]);
    }
  }

  return totalPriority;
};

const getBadge = (items: string[]) => {
  const firstRow = items[0];

  for (let charIndex = 0; charIndex < firstRow.length; charIndex++) {
    let char = firstRow[charIndex];

    const matchesSecond = items[1].indexOf(char) > -1;
    const matchesThird = items[2].indexOf(char) > -1;

    if (matchesSecond && matchesThird) {
      return char;
    }
  }
  throw new Error("Could not find match. You done messed up boy");
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const split = input.split("\n");
  let totalPriority = 0;

  for (let i = 0; i < split.length; i = i + 3) {
    const items = split.slice(i, i + 3);
    const badge = getBadge(items);

    totalPriority += getPriority(badge);
  }

  return totalPriority;
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
