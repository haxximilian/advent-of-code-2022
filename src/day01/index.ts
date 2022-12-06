import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const sums = parseInput(rawInput).split(`\n`);

  const totalCaloriesPerElf = [];
  let caloriesForCurrentElf = 0;
  for (let i = 0; i < sums.length; i++) {
    if (sums[i] === "") {
      totalCaloriesPerElf.push(+caloriesForCurrentElf);
      caloriesForCurrentElf = 0;
    } else {
      caloriesForCurrentElf += +sums[i];
    }
  }

  const biggest = totalCaloriesPerElf.reduce((a, b) => {
    return a > b ? a : b;
  });

  return biggest;
};

const part2 = (rawInput: string) => {
  const sums = parseInput(rawInput).split(`\n`);

  const totalCaloriesPerElf = [];
  let caloriesForCurrentElf = 0;
  for (let i = 0; i < sums.length; i++) {
    if (sums[i] === "") {
      totalCaloriesPerElf.push(+caloriesForCurrentElf);
      caloriesForCurrentElf = 0;
    } else {
      caloriesForCurrentElf += +sums[i];
    }
  }

  const topThree = totalCaloriesPerElf
    .sort((a, b) => {
      return a - b;
    })
    .slice(-3)
    .reduce((a, b) => a + b, 0);

  return topThree;
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
