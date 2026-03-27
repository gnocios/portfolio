export type GameStatus = 'IDLE' | 'PLAYING' | 'PAUSED' | 'REMOVING_CHAIR' | 'ENDED';

export interface GameConfig {
  minSeconds: number;
  maxSeconds: number;
  removeChairSeconds: number;
  playerCountActive: boolean;
  initialPlayers: number;
  selectedSong: string;
}

export interface GameState {
  status: GameStatus;
  remainingPlayers: number;
  message: string;
}