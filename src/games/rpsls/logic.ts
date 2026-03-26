export type Move = "rock" | "paper" | "scissors" | "lizard" | "spock";
export type Result = "win" | "lose" | "tie";

const rules: Record<Move, Move[]> = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["spock", "paper"],
  spock: ["scissors", "rock"],
};

export function getRandomMove(): Move {
  const moves: Move[] = ["rock", "paper", "scissors", "lizard", "spock"];
  return moves[Math.floor(Math.random() * moves.length)];
}

export function getResult(player: Move, cpu: Move): Result {
  if (player === cpu) return "tie";
  if (rules[player].includes(cpu)) return "win";
  return "lose";
}

export function getExplanation(player: Move, cpu: Move): string {
  const map: Record<string, string> = {
    "scissors-paper": "Scissors cuts paper",
    "paper-rock": "Paper covers rock",
    "rock-lizard": "Rock crushes lizard",
    "lizard-spock": "Lizard poisons Spock",
    "spock-scissors": "Spock smashes scissors",
    "scissors-lizard": "Scissors decapitates lizard",
    "lizard-paper": "Lizard eats paper",
    "paper-spock": "Paper disproves Spock",
    "spock-rock": "Spock vaporizes rock",
    "rock-scissors": "Rock crushes scissors",
  };

  return map[`${player}-${cpu}`] || map[`${cpu}-${player}`] || "";
}

// --- Dentro de logic.ts ---

export const VICTORY_PHRASES = ["vexcelent", "voutstanding", "vimpressive", "welldone"];
export const SCREAM_POOL = ["scream", "scream1", "scream2", "scream3", "scream4", "scream5"];
export const LAUGH_POOL = ["laugh", "laugh1", "laugh2", "laugh3", "laugh4", "llaugh"];
export const ELEMENTS_POOL = ["lizardS", "paperS", "rockS", "scissorsS", "spocks"];

// Esta función es una herramienta interna, no hace falta exportarla si no quieres
const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export function getWinSound(): string {
  // 50% de probabilidad de frase épica, 50% de un grito aleatorio (puedes ajustar esto)
  const chance = Math.random();
  return chance > 0.5 ? getRandom(VICTORY_PHRASES) : getRandom(ELEMENTS_POOL);
}

export function getLoseSound(): string {
  // 50% de probabilidad de risa malvada, 50% de que el player grite
  const chance = Math.random();
  return chance > 0.5 ? getRandom(LAUGH_POOL) : getRandom(SCREAM_POOL);
}