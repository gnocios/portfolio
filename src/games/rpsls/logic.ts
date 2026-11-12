// ---------------------------------------------------------------------------
// Moves and texts
// ---------------------------------------------------------------------------

export const MOVES = ["rock", "paper", "scissors", "lizard", "spock"] as const;
export type Move = (typeof MOVES)[number];
export type Result = "win" | "lose" | "tie";
// "timeout" = the player did not choose in time (everything beats nothing)
export type Outcome = Result | "timeout";

// Texts shown on screen. Change them here.
export const GAME_TITLE = "Rock Paper Scissors Lizard Spock";

export const MOVE_LABELS: Record<Move, string> = {
  rock: "Rock",
  paper: "Paper",
  scissors: "Scissors",
  lizard: "Lizard",
  spock: "Spock",
};

export const TIMEOUT_TEXT = "Too slow! Everything beats nothing.";

// ---------------------------------------------------------------------------
// Rules
// ---------------------------------------------------------------------------

// Each entry reads: winner, loser, sentence.
// Results, explanations and the rules screen all come from this one list.
const BEATS: ReadonlyArray<readonly [Move, Move, string]> = [
  ["scissors", "paper", "Scissors cuts paper"],
  ["paper", "rock", "Paper covers rock"],
  ["rock", "lizard", "Rock crushes lizard"],
  ["lizard", "spock", "Lizard poisons Spock"],
  ["spock", "scissors", "Spock smashes scissors"],
  ["scissors", "lizard", "Scissors decapitates lizard"],
  ["lizard", "paper", "Lizard eats paper"],
  ["paper", "spock", "Paper disproves Spock"],
  ["spock", "rock", "Spock vaporizes rock"],
  ["rock", "scissors", "Rock crushes scissors"],
];

export const RULES_LINES: string[] = BEATS.map(([, , text]) => text);

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function getRandomMove(): Move {
  return pick(MOVES);
}

export function getResult(player: Move, cpu: Move): Result {
  if (player === cpu) return "tie";
  const playerWins = BEATS.some(
    ([winner, loser]) => winner === player && loser === cpu,
  );
  return playerWins ? "win" : "lose";
}

export function getExplanation(a: Move, b: Move): string {
  const entry = BEATS.find(
    ([winner, loser]) =>
      (winner === a && loser === b) || (winner === b && loser === a),
  );
  return entry ? entry[2] : "";
}

// ---------------------------------------------------------------------------
// Sound pools (names must match the keys of `sounds` in assets/index.ts)
// ---------------------------------------------------------------------------

const VICTORY_PHRASES = ["vexcelent", "voutstanding", "vimpressive", "welldone"] as const;
const SCREAM_POOL = ["scream", "scream1", "scream2", "scream3", "scream4", "scream5"] as const;
const LAUGH_POOL = ["laugh", "laugh1", "laugh2", "laugh3", "laugh4", "llaugh"] as const;
const ELEMENTS_POOL = ["lizardS", "paperS", "rockS", "scissorsS", "spocks"] as const;

export type WinSoundName =
  | (typeof VICTORY_PHRASES)[number]
  | (typeof ELEMENTS_POOL)[number];
export type LoseSoundName =
  | (typeof LAUGH_POOL)[number]
  | (typeof SCREAM_POOL)[number];

// 50% epic phrase, 50% the sound of an element
export function getWinSound(): WinSoundName {
  return Math.random() > 0.5 ? pick(VICTORY_PHRASES) : pick(ELEMENTS_POOL);
}

// 50% evil laugh, 50% the player screams
export function getLoseSound(): LoseSoundName {
  return Math.random() > 0.5 ? pick(LAUGH_POOL) : pick(SCREAM_POOL);
}

// ---------------------------------------------------------------------------
// Game state machine (pure: no timers, no sounds, no React)
// ---------------------------------------------------------------------------

export const LIVES = 5;
export const ROUNDS_TO_WIN = 2;
export const MAX_ROUNDS = ROUNDS_TO_WIN * 2 - 1;

export type Phase =
  | "idle" // before the first game
  | "intro" // "Round N" banner
  | "choosing" // the clock is running
  | "suspense" // the player chose, the CPU move is still hidden
  | "result" // both moves are on screen
  | "finished"; // the match is over

export interface GameState {
  phase: Phase;
  round: number;
  playerLife: number;
  cpuLife: number;
  playerWins: number;
  cpuWins: number;
  playerMove: Move | null;
  cpuMove: Move | null;
  pendingCpu: Move | null; // CPU choice, hidden until REVEAL
  outcome: Outcome | null;
  explanation: string;
  turn: number; // increases every time a new turn starts
}

export type GameAction =
  | { type: "START" }
  | { type: "BEGIN_TURN" }
  | { type: "PICK"; move: Move; cpu: Move }
  | { type: "REVEAL" }
  | { type: "TIMEOUT"; cpu: Move }
  | { type: "NEXT" };

export const initialState: GameState = {
  phase: "idle",
  round: 1,
  playerLife: LIVES,
  cpuLife: LIVES,
  playerWins: 0,
  cpuWins: 0,
  playerMove: null,
  cpuMove: null,
  pendingCpu: null,
  outcome: null,
  explanation: "",
  turn: 0,
};

function startTurn(state: GameState): GameState {
  return {
    ...state,
    phase: "choosing",
    turn: state.turn + 1,
    playerMove: null,
    cpuMove: null,
    pendingCpu: null,
    outcome: null,
    explanation: "",
  };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START": {
      if (state.phase !== "idle" && state.phase !== "finished") return state;
      return { ...initialState, phase: "intro", turn: state.turn };
    }

    case "BEGIN_TURN": {
      if (state.phase !== "intro") return state;
      return startTurn(state);
    }

    case "PICK": {
      if (state.phase !== "choosing") return state;
      return {
        ...state,
        phase: "suspense",
        playerMove: action.move,
        cpuMove: null,
        pendingCpu: action.cpu,
        outcome: null,
        explanation: "",
      };
    }

    case "REVEAL": {
      if (state.phase !== "suspense" || !state.playerMove || !state.pendingCpu) {
        return state;
      }
      const outcome = getResult(state.playerMove, state.pendingCpu);
      return {
        ...state,
        phase: "result",
        cpuMove: state.pendingCpu,
        pendingCpu: null,
        outcome,
        explanation: getExplanation(state.playerMove, state.pendingCpu),
        playerLife: state.playerLife - (outcome === "lose" ? 1 : 0),
        cpuLife: state.cpuLife - (outcome === "win" ? 1 : 0),
      };
    }

    case "TIMEOUT": {
      if (state.phase !== "choosing") return state;
      return {
        ...state,
        phase: "result",
        playerMove: null,
        cpuMove: action.cpu,
        pendingCpu: null,
        outcome: "timeout",
        explanation: TIMEOUT_TEXT,
        playerLife: state.playerLife - 1,
      };
    }

    case "NEXT": {
      if (state.phase !== "result") return state;

      const roundOver = state.playerLife <= 0 || state.cpuLife <= 0;
      if (!roundOver) return startTurn(state);

      const playerWins = state.playerWins + (state.cpuLife <= 0 ? 1 : 0);
      const cpuWins = state.cpuWins + (state.playerLife <= 0 ? 1 : 0);

      if (playerWins >= ROUNDS_TO_WIN || cpuWins >= ROUNDS_TO_WIN) {
        return { ...state, phase: "finished", playerWins, cpuWins };
      }

      return {
        ...state,
        phase: "intro",
        round: state.round + 1,
        playerLife: LIVES,
        cpuLife: LIVES,
        playerWins,
        cpuWins,
        playerMove: null,
        cpuMove: null,
        pendingCpu: null,
        outcome: null,
        explanation: "",
      };
    }

    default:
      return state;
  }
}