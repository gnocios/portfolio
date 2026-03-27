import React, { useState, useEffect, useRef } from 'react';
import { sounds } from './assets';
import { getRandomDuration, getStatusMessage } from './logic';
import type { GameConfig, GameStatus } from './types';
import './Sillas.css';

const Sillas: React.FC = () => {
  // --- Configuración Inicial ---
  const [config, setConfig] = useState<GameConfig>({
    minSeconds: 5,
    maxSeconds: 15,
    removeChairSeconds: 10,
    playerCountActive: true,
    initialPlayers: 10,
    selectedSong: 'song1'
  });

  // --- Estados del Juego ---
  const [status, setStatus] = useState<GameStatus>('IDLE');
  const [players, setPlayers] = useState<number>(config.initialPlayers);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // --- Referencias (para no perder el control en re-renders) ---
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Limpieza al desmontar el componente (evita que la música siga sonando)
  useEffect(() => {
    return () => stopGame();
  }, []);

  // --- Lógica de Control ---
  const startGame = () => {
    stopGame(); // Reset por seguridad
    const selectedAudio = (sounds as any)[config.selectedSong];
    audioRef.current = new Audio(selectedAudio);
    audioRef.current.loop = true;
    
    setPlayers(config.initialPlayers);
    playRound();
  };

  const playRound = () => {
    if (audioRef.current) audioRef.current.play();
    setStatus('PLAYING');

    const duration = getRandomDuration(config.minSeconds, config.maxSeconds);
    
    timerRef.current = setTimeout(() => {
      pauseMusic();
    }, duration);
  };

  const pauseMusic = () => {
    if (audioRef.current) audioRef.current.pause();
    
    if (config.playerCountActive && players <= 2) {
      setStatus('ENDED');
      setPlayers(1);
    } else {
      setStatus('REMOVING_CHAIR');
      if (config.playerCountActive) setPlayers(prev => prev - 1);
      
      // Tiempo para quitar la silla antes de la siguiente ronda
      timerRef.current = setTimeout(() => {
        playRound();
      }, config.removeChairSeconds * 1000);
    }
  };

  const stopGame = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    setStatus('IDLE');
  };

  const togglePause = () => {
    if (status === 'PLAYING') {
      if (audioRef.current) audioRef.current.pause();
      if (timerRef.current) clearTimeout(timerRef.current);
      setStatus('PAUSED');
    } else if (status === 'PAUSED') {
      playRound();
    }
  };

  return (
    <div className="sillas-container">
      <h1>🪑 Juego de las Sillas</h1>

      <div className="status-display">
        {getStatusMessage(status)}
      </div>

      {config.playerCountActive && status !== 'IDLE' && (
        <div className="players-count">
          Jugadores restantes: <strong>{players}</strong>
        </div>
      )}

      <div className="controls-row">
        {status === 'IDLE' || status === 'ENDED' ? (
          <button className="btn-main" onClick={startGame}>▶</button>
        ) : (
          <>
            <button className="btn-main" onClick={togglePause}>
              {status === 'PAUSED' ? '▶' : '⏸'}
            </button>
            <button className="btn-main" onClick={stopGame}>⏹</button>
          </>
        )}
      </div>

      <button className="btn-config" onClick={() => setIsModalOpen(true)}>
        Configuración ⚙
      </button>

      {/* MODAL DE CONFIGURACIÓN */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Ajustes del Juego</h2>
            
            <div className="input-group">
              <label>Mínimo (seg)</label>
              <input type="number" value={config.minSeconds} 
                onChange={e => setConfig({...config, minSeconds: +e.target.value})} />
            </div>

            <div className="input-group">
              <label>Máximo (seg)</label>
              <input type="number" value={config.maxSeconds} 
                onChange={e => setConfig({...config, maxSeconds: +e.target.value})} />
            </div>

            <div className="input-group">
              <label>Pausa quitar silla (seg)</label>
              <input type="number" value={config.removeChairSeconds} 
                onChange={e => setConfig({...config, removeChairSeconds: +e.target.value})} />
            </div>

            <div className="input-group">
              <label>Activar jugadores</label>
              <input type="checkbox" checked={config.playerCountActive} 
                onChange={e => setConfig({...config, playerCountActive: e.target.checked})} />
            </div>

            {config.playerCountActive && (
              <div className="input-group">
                <label>Nº Jugadores</label>
                <input type="number" value={config.initialPlayers} 
                  onChange={e => setConfig({...config, initialPlayers: +e.target.value})} />
              </div>
            )}

            <div className="input-group">
              <label>Canción</label>
              <select value={config.selectedSong} onChange={e => setConfig({...config, selectedSong: e.target.value})}>
                <option value="song1">Song 1</option>
                <option value="song2">Song 2</option>
                <option value="song3">Song 3</option>
              </select>
            </div>

            <button className="btn-close-modal" onClick={() => setIsModalOpen(false)}>
              Guardar y Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sillas;