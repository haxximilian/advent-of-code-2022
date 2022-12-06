import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type Move = "rock" | "paper" | "scissors";

const convertToMove = (move: string): Move => {
  if (move === "A" || move === "X") return "rock";
  if (move === "B" || move === "Y") return "paper";
  return "scissors";
};

const getWinningMove = (move: string): Move => {
  if (convertToMove(move) === "rock") return "paper";
  if (convertToMove(move) === "paper") return "scissors";
  return "rock";
};

const getLosingMove = (move: string): Move => {
  if (convertToMove(move) === "rock") return "scissors";
  if (convertToMove(move) === "paper") return "rock";
  return "paper";
};

const getMoveScore = (move: Move) => {
  if (move === "rock") return 1;
  if (move === "paper") return 2;
  return 3;
};

const getOutcomeScore = (opponentMove: Move, myMove: Move) => {
  if (opponentMove === myMove) return 3;
  if (opponentMove === "rock") {
    return myMove === "paper" ? 6 : 0;
  }
  if (opponentMove === "paper") {
    return myMove === "scissors" ? 6 : 0;
  }
  // Must be scissors
  return myMove === "rock" ? 6 : 0;
};

const getTotalScore = (opponentMove: Move, myMove: Move): number => {
  let score = 0;
  score += getMoveScore(myMove);
  score += getOutcomeScore(opponentMove, myMove);
  return score;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rounds = input.split("\n");

  const scores = rounds.map((round) => {
    const [opponent, myMove] = round.split(/\s+/);
    return getTotalScore(convertToMove(opponent), convertToMove(myMove));
  });

  return scores.reduce((a, b) => a + b);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rounds = input.split("\n");
  const scores = rounds.map((round) => {
    const [opponent, outcome] = round.split(/\s+/);

    if (outcome === "X") {
      return getTotalScore(convertToMove(opponent), getLosingMove(opponent));
    }
    if (outcome === "Y") {
      return getTotalScore(convertToMove(opponent), convertToMove(opponent));
    }
    return getTotalScore(convertToMove(opponent), getWinningMove(opponent));
  });

  return scores.reduce((a, b) => a + b);
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
