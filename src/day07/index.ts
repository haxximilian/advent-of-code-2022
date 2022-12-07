import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

interface Directory {
  parent?: Directory;
  files: { [name: string]: number };
  dirs: { [name: string]: Directory };
}

const mapToDirectory = (input: string): Directory => {
  const rows = input.split("\n");
  const rootDir: Directory = { files: {}, dirs: {} };
  let currentDir = rootDir;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    if (row.startsWith("$")) {
      if (row === "$ ls") {
        i++;
        while (i < rows.length && !rows[i].startsWith("$")) {
          const [size, name] = rows[i].split(" ");
          // If the item is a file
          if (/\d/.test(size)) {
            currentDir.files[name] = +size;
          }
          i++;
        }
        i--;
      } else {
        const direction = row.substring(5, row.length);

        if (direction === "..") {
          currentDir = currentDir.parent!;
        } else if (direction === "/") {
          currentDir = rootDir;
        } else {
          if (!currentDir.dirs[direction]) {
            currentDir.dirs[direction] = {
              parent: currentDir,
              files: {},
              dirs: {},
            };
          }
          currentDir = currentDir.dirs[direction];
        }
      }
    }
  }

  return rootDir;
};

const getTotalDirSize = (folder: Directory) => {
  let totalDirSize = 0;

  for (const file in folder.files) {
    totalDirSize += folder.files[file];
  }

  for (const dir in folder.dirs) {
    const total = getTotalDirSize(folder.dirs[dir]);
    totalDirSize += total;
  }

  return totalDirSize;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const root = mapToDirectory(input);

  const getBelowLimitSum = (folder: Directory) => {
    let totalDirSize = getTotalDirSize(folder);
    let totalBelowLimit = 0;

    for (const dir in folder.dirs) {
      const belowLimit = getBelowLimitSum(folder.dirs[dir]);
      totalBelowLimit += belowLimit;
    }

    if (totalDirSize <= 100000) {
      totalBelowLimit += totalDirSize;
    }

    return totalBelowLimit;
  };

  return getBelowLimitSum(root);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const root = mapToDirectory(input);
  const freeDiskSpace = 70000000 - getTotalDirSize(root);
  const required = 30000000 - freeDiskSpace;

  let bestOption = 70000000;
  const getBestOption = (folder: Directory) => {
    for (const dir in folder.dirs) {
      getBestOption(folder.dirs[dir]);

      const dirSize = getTotalDirSize(folder.dirs[dir]);

      if (dirSize >= required && dirSize < bestOption) {
        bestOption = dirSize;
      }
    }

    return bestOption;
  };

  return getBestOption(root);
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
