/**
 * Calcula un tiempo aleatorio en milisegundos entre un mínimo y un máximo.
 */
export const getRandomDuration = (min: number, max: number): number => {
  const minMs = min * 1000;
  const maxMs = max * 1000;
  
  if (maxMs <= minMs) return minMs; // Evita errores si el usuario pone max < min
  
  return Math.floor(Math.random() * (maxMs - minMs + 1) + minMs);
};

/**
 * Formatea el mensaje que se muestra en pantalla según el estado
 */
export const getStatusMessage = (status: string): string => {
  switch (status) {
    case 'PLAYING': return "¡A bailar! 💃";
    case 'PAUSED': return "Pausado ⏸";
    case 'REMOVING_CHAIR': return "¡Música fuera! Quitando una silla... 🪑";
    case 'ENDED': return "¡Juego Finalizado! 🏆";
    default: return "Listo para empezar";
  }
};
