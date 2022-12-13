import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const commands = input.split("\n");

  let x = 1;
  let cycle = 0;
  let sum = 0;
  const cycles = [20, 60, 100, 140, 180, 220];

  const incrementSum = () => {
    if (cycles.includes(cycle)) {
      sum += cycle * x;
    }
  };

  for (let i = 0; i < commands.length; i++) {
    const [command, value] = commands[i].split(" ");

    if (command === "noop") {
      cycle++;
      incrementSum();
      continue;
    }

    cycle++;
    incrementSum();
    cycle++;
    incrementSum();
    x += Number(value);
  }

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const commands = input.split("\n");

  let x = 1;
  let cycle = 0;
  const canvas: string[][] = [];

  // Init canvas
  for (let i = 0; i < 6; i++) {
    const row: string[] = [];
    for (let j = 0; j < 40; j++) {
      row.push(".");
    }

    canvas.push(row);
  }

  const addPixel = () => {
    const index = cycle - 1;
    const row = Math.floor(index / 40);
    const column = index % 40;

    if (x > column - 2 && x < column + 2) {
      canvas[row][column] = "#";
    }
  };

  for (let i = 0; i < commands.length; i++) {
    const [command, value] = commands[i].split(" ");

    if (command === "noop") {
      cycle++;
      addPixel();
      continue;
    }

    cycle++;
    addPixel();
    cycle++;
    addPixel();
    x += Number(value);
  }

  canvas.forEach((row) => {
    console.log(row.join(""));
  });

  return "PZULBAUA";
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
