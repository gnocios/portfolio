export type GameMode = 'rounds' | 'single';
export type PlayerType = 'solitary' | '2players' | 'vspc';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type SelectionMethod = 'random' | 'family' | 'manual';

export interface Card {
    id: number;           // ID único para el tablero (0 a 53)
    imageIndex: number;   // Índice para buscar en assets.cards[imageIndex]
    family: string;       // clef, metrics, etc.
    isFlipped: boolean;
    isMatched: boolean;
}

export interface GameConfig {
    mode: GameMode;
    players: PlayerType;
    difficulty: Difficulty;
    timeLimit: number | null; // null si el tiempo está en "off"
    hasSound: boolean;
    hasMusic: boolean;
    selectionMethod: SelectionMethod;
    selectedFamily?: string;  // Si eligió por familia
    pairsAmount: number;      // Cuántas parejas hay en juego
    manualIndices?: number[];
}

export interface GameState {
    cards: Card[];
    currentTurn: 'player1' | 'player2' | 'pc';
    score1: number;
    score2: number;
    tries1: number;
    tries2: number;
    matches1: number;
    matches2: number;
    remainingTime: number;
    isGameOver: boolean;
}