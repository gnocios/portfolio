import type { Card, GameConfig, Difficulty } from './types';


/**
 * Baraja un array usando el algoritmo Fisher-Yates
 */
export const shuffle = <T>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

/**
 * Genera el mazo de cartas basado en la configuración
 * @param allCards El mazo completo de 54 definiciones
 * @param config Configuración elegida por el usuario
 */
export const generateGameDeck = (allCards: any[], config: GameConfig): Card[] => {
    let selected: any[] = [];

    if (config.selectionMethod === 'family' && config.selectedFamily) {
        selected = allCards.filter(c => c.family === config.selectedFamily);
    } else if (config.selectionMethod === 'manual') {
        // Aquí vendrían los IDs seleccionados manualmente
        // selected = allCards.filter(c => config.manualIndices?.includes(c.id));
    } else {
        // Random: barajamos todo y tomamos N parejas
        const shuffledAll = shuffle(allCards);
        selected = shuffledAll.slice(0, config.pairsAmount);
    }

    // Duplicamos para crear parejas
    const deck = [...selected, ...selected].map((card, index) => ({
        id: index, // ID único para el componente React
        imageIndex: parseInt(card.name), // El número del SVG
        family: card.family,
        isFlipped: false,
        isMatched: false
    }));

    return shuffle(deck);
};

/**
 * Lógica de decisión de la PC
 * @param memory Cartas que la PC "ha visto" (id -> imageIndex)
 * @param difficulty Nivel de dificultad
 * @returns El ID de la carta que la PC decide levantar
 */
export const getPcMove = (
    visibleCards: Card[], 
    memory: Map<number, number>, 
    difficulty: Difficulty
): number => {
    const availableCards = visibleCards.filter(c => !c.isMatched && !c.isFlipped);
    
    // 1. ¿Conocemos alguna pareja en memoria?
    // Aplicamos probabilidad de "olvido" según dificultad
    const memoryPower = { easy: 0.3, medium: 0.7, hard: 1.0 }[difficulty];
    
    if (Math.random() < memoryPower) {
        // Lógica para buscar pareja en el Map de memoria...
        // Si encuentra dos IDs con el mismo imageIndex, elige uno.
    }

    // 2. Si no sabe o "olvidó", elige una al azar
    const randomIdx = Math.floor(Math.random() * availableCards.length);
    return availableCards[randomIdx].id;
};