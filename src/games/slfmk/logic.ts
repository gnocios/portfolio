import { noteSounds } from './assets';

/**
 * Convierte el tempo y la duración del JSON a milisegundos.
 */
export const getNoteMs = (tempo: number, duration: number): number => {
  // Evitamos divisiones por cero o valores nulos
  if (!tempo || !duration) return 500; 
  return (60000 / tempo) * (4 / duration);
};

/**
 * Reproduce el sonido de una nota usando la ruta del diccionario.
 */
export const triggerSound = (note: string) => {
  const soundPath = noteSounds[note];
  if (soundPath) {
    const audio = new Audio(soundPath);
    audio.play().catch(err => console.warn("Error al reproducir nota:", note, err));
  }
};