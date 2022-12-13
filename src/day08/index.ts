import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const checkVisibility = (
    rows: string[],
    columnIndex: number,
    rowIndex: number,
  ) => {
    let isBlockedAbove = false;
    let isBlockedBelow = false;
    let isBlockedLeft = false;
    let isBlockedRight = false;

    const value = +rows[rowIndex][columnIndex];

    for (let i = 0; i < rows.length; i++) {
      if (i === rowIndex) {
        [...rows[i]].forEach((char, index) => {
          if (index !== columnIndex) {
            if (index < columnIndex && +char >= value) isBlockedLeft = true;
            if (index > columnIndex && +char >= value) isBlockedRight = true;
          }
        });
        continue;
      }

      // Hidden vertical
      if (+rows[i][columnIndex] >= value) {
        if (i < rowIndex) isBlockedAbove = true;
        if (i > rowIndex) isBlockedBelow = true;
      }
    }

    return isBlockedAbove && isBlockedBelow && isBlockedLeft && isBlockedRight;
  };

  const rows = input.split("\n");
  let visible = 0;

  for (let i = 0; i < rows.length; i++) {
    // Top, bottom are visible
    if (i === 0 || i === rows.length - 1) {
      continue;
    }

    const currentRow = rows[i];

    for (let j = 1; j < currentRow.length - 1; j++) {
      const isBlocked = checkVisibility(rows, j, i);
      if (!isBlocked) visible++;
    }
  }

  const visibleOutside = rows.length * 2 + +rows[0].length * 2 - 4;
  return visible + visibleOutside;
};

const part2 = (rawInput: string) => {
  const checkScenicScore = (
    rows: string[],
    columnIndex: number,
    rowIndex: number,
  ) => {
    // Indexes
    let isBlockedAbove = 0;
    let isBlockedBelow = rows.length - 1;
    let isBlockedLeft = 0;
    let isBlockedRight = rows[0].length - 1;

    const value = +rows[rowIndex][columnIndex];

    for (let i = 0; i < rows.length; i++) {
      // Hidden horizontal
      if (i === rowIndex) {
        [...rows[i]].forEach((char, index) => {
          if (index !== columnIndex) {
            if (index < columnIndex && +char >= value) {
              isBlockedLeft = index > isBlockedLeft ? index : isBlockedLeft;
            }
            if (index > columnIndex && +char >= value) {
              isBlockedRight = index < isBlockedRight ? index : isBlockedRight;
            }
          }
        });
        continue;
      }

      // Hidden vertical
      if (+rows[i][columnIndex] >= value) {
        if (i < rowIndex) {
          isBlockedAbove = i > isBlockedAbove ? i : isBlockedAbove;
        }
        if (i > rowIndex) {
          isBlockedBelow = i < isBlockedBelow ? i : isBlockedBelow;
        }
      }
    }

    return (
      (rowIndex - isBlockedAbove) *
      (isBlockedBelow - rowIndex) *
      (columnIndex - isBlockedLeft) *
      (isBlockedRight - columnIndex)
    );
  };

  const input = parseInput(rawInput);
  const rows = input.split("\n");
  let bestScore = 0;
  for (let i = 0; i < rows.length; i++) {
    // Top, bottom are visible
    if (i === 0 || i === rows.length - 1) {
      continue;
    }

    const currentRow = rows[i];

    for (let j = 1; j < currentRow.length - 1; j++) {
      const score = checkScenicScore(rows, j, i);
      if (score > bestScore) bestScore = score;
    }
  }

  return bestScore;
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
