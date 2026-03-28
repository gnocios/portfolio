import React, { useState, useEffect } from 'react';
import { twinkle } from './songs/twinkle';
import { triggerSound, getNoteMs } from './logic';
import './Slfmk.css';

const Slfmk: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const song = twinkle;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    // Solo entramos si el juego está activo y el índice es válido
    if (isPlaying && currentIndex >= 0 && currentIndex < song.events.length) {
      const event = song.events[currentIndex];
      
      // 1. Sonar nota
      if (event.note !== 'rest') {
        triggerSound(event.note);
      }

      // 2. Calcular tiempo de espera
      const ms = getNoteMs(song.tempo, event.duration);

      // 3. Programar el salto a la siguiente nota
      timer = setTimeout(() => {
        if (currentIndex < song.events.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          // Si es la última nota, detenemos el juego
          setIsPlaying(false);
          setCurrentIndex(-1);
        }
      }, ms);
    }

    // Limpieza automática al desmontar o pulsar STOP
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentIndex, song]);

  const handlePlay = () => {
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentIndex(-1);
  };

  // Notas visibles (puedes ampliar este array según necesites)
  const keyboardNotes = ['do3', 're3', 'mi3', 'fa3', 'sol3', 'la3', 'si3'];

  return (
    <div className="slfmk-container">
      <h1>{song.title}</h1>
      
      <div className="controls">
        <button onClick={handlePlay} disabled={isPlaying}>▶ PLAY</button>
        <button onClick={handleStop}>⏹ STOP</button>
      </div>

      <div className="display-area">
        <h2 className="lyrics">
          {currentIndex >= 0 ? song.events[currentIndex].text : "Presiona Play"}
        </h2>
      </div>

      <div className="piano-wrapper">
        <div className="white-keys">
          {keyboardNotes.map((note) => (
            <div 
              key={note} 
              className={`key ${
                currentIndex >= 0 && song.events[currentIndex].note === note ? 'active' : ''
              }`}
            >
              <span>{note.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slfmk;