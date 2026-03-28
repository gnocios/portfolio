import React, { useState, useEffect, useRef } from 'react';
import { images, sounds } from './assets';
import { generateGameDeck, shuffle } from './logic';
import type { GameConfig, GameState, Card as CardType, Difficulty } from './types';
import './Rememora.css';

// --- SUB-COMPONENTE: CARTA (Interno) ---
const Card = ({ card, isFlipped, onClick }: { card: CardType, isFlipped: boolean, onClick: () => void }) => (
    <div 
        className={`card-container ${isFlipped || card.isMatched ? 'flipped' : ''}`} 
        onClick={onClick}
    >
        <div className="card-inner">
            <div className="card-back"><img src={images.ui.back} alt="back" /></div>
            <div className="card-front">
                <img src={card.isMatched ? images.ui.logo : images.cards[card.imageIndex]} alt="icon" />
            </div>
        </div>
    </div>
);

// --- COMPONENTE PRINCIPAL ---
export default function Rememora() {
    const [screen, setScreen] = useState<'MENU' | 'GAME' | 'RESULTS' | 'DECK_SELECT'>('MENU');
    const [config, setConfig] = useState<GameConfig>({
        mode: 'single', players: 'solitary', difficulty: 'medium',
        timeLimit: 60, hasSound: true, hasMusic: true,
        selectionMethod: 'random', pairsAmount: 7
    });
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [flippedIds, setFlippedIds] = useState<number[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [pcMemory, setPcMemory] = useState<Map<number, number>>(new Map());

    // Referencia para la música de fondo
    const bgMusic = useRef<HTMLAudioElement | null>(null);

    // Iniciar Juego
    const startGame = (manualSelection?: number[]) => {
        const deck = generateGameDeck(images.cards, { ...config, manualIndices: manualSelection });
        setGameState({
            cards: deck, currentTurn: 'player1', score1: 0, score2: 0,
            tries1: 0, tries2: 0, matches1: 0, matches2: 0,
            remainingTime: config.timeLimit || 999, isGameOver: false
        });
        setPcMemory(new Map());
        setScreen('GAME');
        if (config.hasMusic) {
            bgMusic.current = new Audio(sounds.childrenSong);
            bgMusic.current.loop = true;
            bgMusic.current.play();
        }
    };

    // Lógica de Clic
    const handleCardClick = (id: number) => {
        if (isProcessing || flippedIds.includes(id) || gameState?.cards[id].isMatched || gameState?.currentTurn === 'pc') return;
        
        const card = gameState!.cards[id];
        setPcMemory(prev => new Map(prev).set(id, card.imageIndex));
        
        if (config.hasSound) new Audio(sounds.flip).play();
        
        const newFlipped = [...flippedIds, id];
        setFlippedIds(newFlipped);

        if (newFlipped.length === 2) {
            setIsProcessing(true);
            setTimeout(() => checkMatch(newFlipped), 800);
        }
    };

    const checkMatch = (ids: number[]) => {
        const [id1, id2] = ids;
        const isMatch = gameState!.cards[id1].imageIndex === gameState!.cards[id2].imageIndex;

        setGameState(prev => {
            if (!prev) return null;
            const newCards = prev.cards.map(c => (c.id === id1 || c.id === id2) ? { ...c, isMatched: isMatch } : c);
            const isP1 = prev.currentTurn === 'player1';
            
            return {
                ...prev,
                cards: newCards,
                matches1: isP1 && isMatch ? prev.matches1 + 1 : prev.matches1,
                matches2: !isP1 && isMatch ? prev.matches2 + 1 : prev.matches2,
                currentTurn: isMatch ? prev.currentTurn : (config.players === 'solitary' ? 'player1' : (isP1 ? (config.players === 'vspc' ? 'pc' : 'player2') : 'player1'))
            };
        });

        if (config.hasSound) new Audio(isMatch ? sounds.match : sounds.beep).play();
        setFlippedIds([]);
        setIsProcessing(false);
    };

    // Efecto para el turno de la PC
    useEffect(() => {
        if (gameState?.currentTurn === 'pc' && !isProcessing && !gameState.isGameOver) {
            setTimeout(handlePcMove, 1000);
        }
    }, [gameState?.currentTurn]);

    const handlePcMove = () => {
        // Aquí aplicamos la dificultad (probabilidad de "recordar")
        const chance = { easy: 0.3, medium: 0.6, hard: 1.0 }[config.difficulty];
        // ... Lógica simplificada de IA ...
        const available = gameState!.cards.filter(c => !c.isMatched).map(c => c.id);
        const choice1 = available[Math.floor(Math.random() * available.length)];
        handleCardClick(choice1);
        setTimeout(() => {
            const choice2 = available.find(id => id !== choice1) || choice1;
            handleCardClick(choice2);
        }, 800);
    };

    return (
        <div className="rememora-app">
            {screen === 'MENU' && (
                <div className="menu-screen">
                    <h1>Rememora</h1>
                    <div className="config-box">
                        <select onChange={e => setConfig({...config, players: e.target.value as any})}>
                            <option value="solitary">Solitario</option>
                            <option value="vspc">Vs PC</option>
                            <option value="2players">2 Jugadores</option>
                        </select>
                        <select onChange={e => setConfig({...config, difficulty: e.target.value as any})}>
                            <option value="easy">Fácil</option>
                            <option value="medium">Medio</option>
                            <option value="hard">Difícil</option>
                        </select>
                    </div>
                    <button className="btn-main" onClick={() => startGame()}>¡JUGAR!</button>
                    <button onClick={() => setScreen('DECK_SELECT')}>Selección Manual</button>
                </div>
            )}

            {screen === 'GAME' && gameState && (
                <div className="game-screen">
                    <div className="status-bar">
                        <div>P1: {gameState.matches1}</div>
                        <div className="turn-indicator">Turno: {gameState.currentTurn}</div>
                        {config.players !== 'solitary' && <div>{config.players === 'vspc' ? 'PC' : 'P2'}: {gameState.matches2}</div>}
                    </div>
                    <div className={`grid-board size-${config.pairsAmount}`}>
                        {gameState.cards.map(card => (
                            <Card 
                                key={card.id} 
                                card={card} 
                                isFlipped={flippedIds.includes(card.id)} 
                                onClick={() => handleCardClick(card.id)} 
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}