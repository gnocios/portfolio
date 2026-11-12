import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import "./Rpsls.css";
import {
  GAME_TITLE,
  LIVES,
  MAX_ROUNDS,
  MOVES,
  MOVE_LABELS,
  RULES_LINES,
  gameReducer,
  getLoseSound,
  getRandomMove,
  getWinSound,
  initialState,
} from "./logic";
import type { GameAction, GameState, Move, Outcome, Phase } from "./logic";
import { images, sounds } from "./assets";

// ---------------------------------------------------------------------------
// Settings you can tweak
// ---------------------------------------------------------------------------

const TURN_SECONDS = 4; // time to choose a move; if it runs out, everything beats nothing
const INTRO_MS = 1200; // "Round N" banner
const SUSPENSE_MS = 1200; // wait before the CPU move is revealed
const RESULT_MS = 1500; // time the result stays on screen

const TURN_MS = TURN_SECONDS * 1000;
const TICK_MS = 100;
const MUTE_KEY = "rpsls:muted";

// Phases that move forward on their own after a delay
const AUTO_STEPS: Partial<Record<Phase, { ms: number; action: GameAction }>> = {
  intro: { ms: INTRO_MS, action: { type: "BEGIN_TURN" } },
  suspense: { ms: SUSPENSE_MS, action: { type: "REVEAL" } },
  result: { ms: RESULT_MS, action: { type: "NEXT" } },
};

const ROUND_SOUNDS = [sounds.round1, sounds.round2, sounds.round3];

const OUTCOME_TEXT: Record<Outcome, string> = {
  win: "You win!",
  lose: "You lose!",
  tie: "Tie!",
  timeout: "Too slow!",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadMuted(): boolean {
  try {
    return localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

function saveMuted(value: boolean) {
  try {
    localStorage.setItem(MUTE_KEY, value ? "1" : "0");
  } catch {
    // storage not available: the setting just won't be remembered
  }
}

function getHeadline(state: GameState): string {
  switch (state.phase) {
    case "idle":
      return "Are you ready?";
    case "intro":
      return `Round ${state.round}`;
    case "choosing":
      return "Choose your move!";
    case "suspense":
      return "...";
    case "result":
      return state.outcome ? OUTCOME_TEXT[state.outcome] : "";
    case "finished":
      return state.playerWins > state.cpuWins
        ? "You win the match!"
        : "You lose the match!";
  }
}

function getDetail(state: GameState): string {
  if (state.phase === "finished") {
    return `Rounds won: ${state.playerWins} - ${state.cpuWins}`;
  }
  return state.explanation;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Rpsls() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [timer, setTimer] = useState({ turn: 0, ms: TURN_MS });
  const [showRules, setShowRules] = useState(false);
  const [muted, setMuted] = useState(loadMuted);

  const mutedRef = useRef(muted);
  const activeAudio = useRef(new Set<HTMLAudioElement>());
  const rulesAudio = useRef<HTMLAudioElement | null>(null);

  const {
    phase,
    round,
    turn,
    outcome,
    playerMove,
    cpuMove,
    playerLife,
    cpuLife,
    playerWins,
    cpuWins,
  } = state;

  // ---- Audio ----

  const play = useCallback((src: string): HTMLAudioElement | null => {
    if (mutedRef.current) return null;
    const audio = new Audio(src);
    const active = activeAudio.current;
    active.add(audio);
    audio.addEventListener("ended", () => active.delete(audio), { once: true });
    audio.play().catch(() => active.delete(audio));
    return audio;
  }, []);

  const stopAllAudio = useCallback(() => {
    activeAudio.current.forEach((audio) => audio.pause());
    activeAudio.current.clear();
  }, []);

  useEffect(() => {
    const active = activeAudio.current;
    return () => {
      active.forEach((audio) => audio.pause());
      active.clear();
    };
  }, []);

  const toggleMute = () => {
    const next = !muted;
    mutedRef.current = next;
    setMuted(next);
    if (next) stopAllAudio();
    saveMuted(next);
  };

  // ---- Automatic transitions (intro -> choosing, suspense -> result, result -> next) ----

  useEffect(() => {
    const step = AUTO_STEPS[phase];
    if (!step) return undefined;
    const id = setTimeout(() => dispatch(step.action), step.ms);
    return () => clearTimeout(id);
  }, [phase]);

  // ---- Countdown while the player is choosing ----

  useEffect(() => {
    if (phase !== "choosing") return undefined;
    const currentTurn = turn;
    const deadline = Date.now() + TURN_MS;
    const id = setInterval(() => {
      const left = deadline - Date.now();
      if (left <= 0) {
        clearInterval(id);
        setTimer({ turn: currentTurn, ms: 0 });
        dispatch({ type: "TIMEOUT", cpu: getRandomMove() });
      } else {
        setTimer({ turn: currentTurn, ms: left });
      }
    }, TICK_MS);
    return () => clearInterval(id);
  }, [phase, turn]);

  // ---- Sounds ----

  useEffect(() => {
    if (phase !== "intro") return;
    play(ROUND_SOUNDS[Math.min(round, ROUND_SOUNDS.length) - 1]);
  }, [phase, round, play]);

  useEffect(() => {
    if (phase !== "result" || !outcome) return;
    if (outcome === "win") play(sounds[getWinSound()]);
    else if (outcome === "tie") play(sounds.toasty);
    else play(sounds[getLoseSound()]); // lose and timeout
  }, [phase, outcome, play]);

  useEffect(() => {
    if (phase !== "finished") return;
    play(playerWins > cpuWins ? sounds.vyouwin : sounds.lyoulose);
  }, [phase, playerWins, cpuWins, play]);

  // ---- Actions ----

  const handlePick = (move: Move) => {
    if (phase !== "choosing") return;
    play(sounds.rpsls);
    dispatch({ type: "PICK", move, cpu: getRandomMove() });
  };

  const toggleRules = () => {
    if (showRules) {
      rulesAudio.current?.pause();
      rulesAudio.current = null;
    } else {
      rulesAudio.current = play(sounds.rules);
    }
    setShowRules(!showRules);
  };

  // ---- Derived values for the screen ----

  const inMatch = phase !== "idle" && phase !== "finished";
  const isChoosing = phase === "choosing";
  const remaining = isChoosing && timer.turn === turn ? timer.ms : TURN_MS;
  const percent = (remaining / TURN_MS) * 100;
  const seconds = Math.ceil(remaining / 1000);
  const danger = remaining <= TURN_MS / 3;

  return (
    <div className="rpsls">
      <button
        type="button"
        className="mute-toggle"
        onClick={toggleMute}
        aria-label={muted ? "Unmute" : "Mute"}
        title={muted ? "Unmute" : "Mute"}
      >
        {muted ? "🔇" : "🔊"}
      </button>

      {showRules && (
        <div className="rules-overlay" onClick={toggleRules}>
          <div
            className="rules-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rpsls-rules-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="rpsls-rules-title">Game Rules</h2>
            <ul className="rules-list">
              {RULES_LINES.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="rules-note">
              Best of {MAX_ROUNDS} rounds, {LIVES} lives each. You have{" "}
              {TURN_SECONDS} seconds to choose, or everything beats you.
            </p>
            <button type="button" onClick={toggleRules}>
              Close
            </button>
          </div>
        </div>
      )}

      <h1>{GAME_TITLE}</h1>

      <div className="status">
        <div className="lifebars">
          <div className="bar-container">
            <div className="bar">
              <div className="label left">YOU</div>
              <div
                className="life player"
                style={{ width: `${(playerLife / LIVES) * 100}%` }}
              />
            </div>
            <div
              className="stars left"
              aria-label={`Rounds won: ${playerWins}`}
            >
              {"★".repeat(playerWins)}
            </div>
          </div>

          <div className="bar-container">
            <div className="bar">
              <div className="label right">CPU</div>
              <div
                className="life cpu"
                style={{ width: `${(cpuLife / LIVES) * 100}%` }}
              />
            </div>
            <div
              className="stars right"
              aria-label={`Rounds won: ${cpuWins}`}
            >
              {"★".repeat(cpuWins)}
            </div>
          </div>
        </div>

        <p className={`round-info${inMatch ? "" : " invisible"}`}>
          Round {round} / {MAX_ROUNDS}
        </p>
        <p
          className={`headline${phase === "result" && outcome ? ` is-${outcome}` : ""}`}
        >
          {getHeadline(state)}
        </p>
        <p className="detail">{getDetail(state)}</p>
      </div>

      <div className="arena">
        <img
          src={playerMove ? images[playerMove] : images.none}
          alt={playerMove ? `You: ${MOVE_LABELS[playerMove]}` : ""}
        />
        <img
          className="cpu"
          src={cpuMove ? images[cpuMove] : images.none}
          alt={cpuMove ? `CPU: ${MOVE_LABELS[cpuMove]}` : ""}
        />
      </div>

      <div
        className={`timer${isChoosing ? "" : " invisible"}`}
        role="timer"
        aria-label="Time left"
      >
        <div className="timer-bar">
          <div
            className={`timer-fill${danger ? " danger" : ""}`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="timer-text">{seconds}</span>
      </div>

      <div className="controls">
        {inMatch ? (
          <div className="moves">
            {MOVES.map((move) => (
              <button
                key={move}
                type="button"
                className={`move${playerMove === move ? " selected" : ""}`}
                onClick={() => handlePick(move)}
                disabled={!isChoosing}
              >
                <img src={images[move]} alt="" />
                <span>{MOVE_LABELS[move]}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="actions">
            <button
              type="button"
              className="primary"
              onClick={() => dispatch({ type: "START" })}
            >
              {phase === "finished" ? "Play again" : "Start"}
            </button>
            <button type="button" onClick={toggleRules}>
              Rules
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
