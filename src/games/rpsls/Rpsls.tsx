import { useState, useRef } from "react";
import "./Rpsls.css";
import { getRandomMove, getResult, getExplanation } from "./logic";
import type { Move } from "./logic"; 
import { images, sounds } from "./assets";
import { getWinSound, getLoseSound } from "./logic";

export default function Rpsls() {
  const [playerMove, setPlayerMove] = useState<Move | null>(null);
  const [cpuMove, setCpuMove] = useState<Move | null>(null);
  const [result, setResult] = useState<string>("");
  const [explain, setExplain] = useState<string>("");
  const [round, setRound] = useState(1);
  const [playerLife, setPlayerLife] = useState(5);
  const [cpuLife, setCpuLife] = useState(5);
  const [playing, setPlaying] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [roundWinsPlayer, setRoundWinsPlayer] = useState(0);
  const [roundWinsCpu, setRoundWinsCpu] = useState(0);
  const [showRules, setShowRules] = useState(false);
  const rulesAudioRef = useRef<HTMLAudioElement | null>(null);
  const moves: Move[] = ["rock", "paper", "scissors", "lizard", "spock"];

  const playSound = (src: string) => {
    const audio = new Audio(src);
    audio.play();
  };

  const toggleRules = () => {
    if (!showRules) {
      // 3. Crear el audio y guardarlo en la referencia
      const audio = new Audio(sounds.rules);
      rulesAudioRef.current = audio;
      audio.play();
      setShowRules(true);
    } else {
      // 4. Si ya existe y se está reproduciendo, lo paramos
      if (rulesAudioRef.current) {
        rulesAudioRef.current.pause();
        rulesAudioRef.current.currentTime = 0; // Reiniciar al principio
      }
      setShowRules(false);
    }
  };

  const handleStart = () => {
    setRound(1);
    setPlayerLife(5);
    setCpuLife(5);
    setResult("");
    setExplain("");
    setPlaying(true);
    playSound(sounds.round1);
    setRoundWinsPlayer(0);
    setRoundWinsCpu(0);
    setIsWaiting(false);
  };

  const handleChoice = (move: Move) => {
    if (!playing || isWaiting) return;

    setIsWaiting(true);

    const cpu = getRandomMove();

    // Mostrar elección del jugador inmediatamente
    setPlayerMove(move);
    setCpuMove(null);
    setResult("");
    setExplain("");

    playSound(sounds.rpsls);

    setTimeout(() => {
      const res = getResult(move, cpu);

      setCpuMove(cpu);
      setResult(res);
      setExplain(getExplanation(move, cpu));

      if (res === "win") {
        setCpuLife((prev) => prev - 1);
        const soundName = getWinSound(); 
        playSound((sounds as any)[soundName]);
      } else if (res === "lose") {
        setPlayerLife((prev) => prev - 1);
        const soundName = getLoseSound();
        playSound((sounds as any)[soundName]);
      } else {
        playSound(sounds.toasty);
      }

      setTimeout(() => {
        checkRoundEnd(res);
        setIsWaiting(false);
      }, 1000);
    }, 1500);
  };

  const checkRoundEnd = (lastResult: string) => {
    // 1. Calculamos las vidas locales para saber si el round terminó
    let playerLifeAfter = playerLife;
    let cpuLifeAfter = cpuLife;

    if (lastResult === "win") cpuLifeAfter -= 1;
    if (lastResult === "lose") playerLifeAfter -= 1;

    // 2. Si alguien se quedó sin vidas, terminó el ROUND
    if (cpuLifeAfter <= 0) {
      const totalWins = roundWinsPlayer + 1;
      setRoundWinsPlayer(totalWins);
      nextRound(totalWins, roundWinsCpu); // Pasamos el dato fresco
    } else if (playerLifeAfter <= 0) {
      const totalWins = roundWinsCpu + 1;
      setRoundWinsCpu(totalWins);
      nextRound(roundWinsPlayer, totalWins); // Pasamos el dato fresco
    }
  };

  const nextRound = (currentWinsPlayer: number, currentWinsCpu: number) => {
    // 1. DETERMINAR GANADOR DE LA PARTIDA (2 de 3)
    if (currentWinsPlayer === 2) {
      setPlaying(false);
      playSound(sounds.vyouwin); // "Victory! You Win"
      return;
    }
    
    if (currentWinsCpu === 2) {
      setPlaying(false);
      playSound(sounds.lyoulose); // "You Lose" (el sonido de derrota que tienes)
      return;
    }

    // 2. SI NADIE HA GANADO LA PARTIDA, PASAMOS AL SIGUIENTE ROUND
    if (round < 3) {
      const nextRoundNumber = round + 1;
      setRound(nextRoundNumber);
      setPlayerLife(5);
      setCpuLife(5);
      setPlayerMove(null);
      setCpuMove(null);
      setResult("");
      setExplain("");

      // Sonar Round 2 o Round 3
      const soundKey = `round${nextRoundNumber}` as keyof typeof sounds;
      if (sounds[soundKey]) {
        playSound(sounds[soundKey]);
      }
    } else {
      // Caso de seguridad por si termina el round 3 sin que nadie llegue a 2 victorias
      setPlaying(false);
      currentWinsPlayer > currentWinsCpu 
        ? playSound(sounds.vyouwin) 
        : playSound(sounds.lyoulose);
    }
  };

  return (
    <div className="rpsls">

      {showRules && (
        <div className="rules-overlay" onClick={toggleRules}>
          <div className="rules-content" onClick={(e) => e.stopPropagation()}>
            <h2>Game Rules</h2>
            <p>
              Scissors cuts paper<br/>
              Paper covers rock<br/>
              Rock crushes lizard<br/>
              Lizard poisons Spock<br/>
              Spock smashes scissors<br/>
              Scissors decapitates lizard<br/>
              Lizard eats paper<br/>
              Paper disproves Spock<br/>
              Spock vaporizes rock<br/>
              And as it always has, rock crushes scissors
            </p>
            <button onClick={toggleRules}>Close</button>
          </div>
        </div>
      )}

      <h1>Rock Paper Scissors Lizard Spock</h1>

      <div className="status">

        <div className="lifebars">
          <div className="bar-container">
            <div className="bar">
              <div className="label left">YOU</div>
              <div className="life player" style={{ width: `${(playerLife / 5) * 100}%` }} />
            </div>
            <div className="stars left">
              {Array(roundWinsPlayer).fill("★").map((s, i) => <span key={i}>{s}</span>)}
            </div>
          </div>

          <div className="bar-container">
            <div className="bar">
              <div className="label right">CPU</div>
              <div className="life cpu" style={{ width: `${(cpuLife / 5) * 100}%` }} />
            </div>
            <div className="stars right">
              {Array(roundWinsCpu).fill("★").map((s, i) => <span key={i}>{s}</span>)}
            </div>
          </div>
        </div>

        <div className="result">
          <p>{explain}</p>
        </div>
      </div>

      <div className="arena">
        <img src={playerMove ? images[playerMove] : images.none} />
        <img className="cpu" src={cpuMove ? images[cpuMove] : images.none} />
      </div>




      <div className="controls">
        {!playing ? (
          <div>
            <button onClick={handleStart}>Start</button>
            <button onClick={toggleRules}>Rules</button>
          </div>
        ) : (
          moves.map((m) => (
            <button
              key={m}
              onClick={() => handleChoice(m as Move)}
              disabled={isWaiting}
            >
              {m}
            </button>
          ))
        )}
      </div>
    </div>
  );
}