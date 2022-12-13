import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

interface Monkey {
  name: string;
  inspectedItems: number;
  items: number[];
  operation: (value: number) => number;
  // Return which monkey to throw to
  test: (value: number) => number;
  divisibleBy: number;
}

const generateMonkeys = (lines: string[]): Monkey[] => {
  const monkeys: Monkey[] = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("Monkey")) {
      const name = lines[i].split(":")[0];
      i++;
      const items = lines[i]
        .split(":")[1]
        .split(",")
        .map((x) => Number(x.trim()));

      i++;
      const operation = lines[i].split("new = ")[1].split(" ");

      const operationFn = (item: number) => {
        const val1 = operation[0] === "old" ? item : Number(operation[0]);
        const val2 = operation[2] === "old" ? item : Number(operation[2]);

        if (operation[1] === "+") return val1 + val2;
        return val1 * val2;
      };

      i++;

      const test = lines[i];
      i++;
      const ifTrue = lines[i];
      i++;
      const ifFalse = lines[i];

      const divisibleBy = Number(test.split("by ")[1]);
      const testFunction = (value: number) => {
        if (value % divisibleBy === 0)
          return Number(ifTrue.split("monkey ")[1]);
        return Number(ifFalse.split("monkey ")[1]);
      };

      const monkey: Monkey = {
        divisibleBy,
        name: name,
        items: items,
        operation: operationFn,
        test: testFunction,
        inspectedItems: 0,
      };
      monkeys.push(monkey);
    }
  }
  return monkeys;
};

const getMonkeyBusinessLevel = (
  rounds: number,
  monkeys: Monkey[],
  useLcm = false,
) => {
  const leastCommonMultiple = monkeys
    .map((x) => x.divisibleBy)
    .reduce((acc, cur) => acc * cur, 1);

  for (let i = 0; i < rounds; i++) {
    monkeys.forEach((monkey) => {
      monkey.items.forEach((item) => {
        const res = monkey.operation(item);
        const final = useLcm ? res % leastCommonMultiple : Math.floor(res / 3);
        const sendTo = monkey.test(final);

        monkeys[sendTo].items.push(final);
        monkey.inspectedItems++;
      });
      monkey.items = [];
    });
  }

  const sortedObjects = monkeys.sort(
    (a, b) => b.inspectedItems - a.inspectedItems,
  );

  return sortedObjects[0].inspectedItems * sortedObjects[1].inspectedItems;
};

const part1 = (rawInput: string) => {
  const monkeys = generateMonkeys(parseInput(rawInput).split("\n"));
  return getMonkeyBusinessLevel(20, monkeys);
};

const part2 = (rawInput: string) => {
  const monkeys = generateMonkeys(parseInput(rawInput).split("\n"));
  return getMonkeyBusinessLevel(10000, monkeys, true);
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
