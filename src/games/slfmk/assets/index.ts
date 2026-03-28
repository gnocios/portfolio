// ==========================================
// --- OCTAVA 2 (Sonidos e Imágenes) ---
// ==========================================
import do2Sound from './sounds/do3.mp3';
import re2Sound from './sounds/re3.mp3';
import mi2Sound from './sounds/mi3.mp3';
import fa2Sound from './sounds/fa3.mp3';
import sol2Sound from './sounds/sol2.mp3';
import la2Sound from './sounds/la2.mp3';
import si2Sound from './sounds/si2.mp3';

import do2Img from './images/do3.svg';
import re2Img from './images/re3.svg';
import mi2Img from './images/mi3.svg';
import fa2Img from './images/fa3.svg';
import sol2Img from './images/sol2.svg';
import la2Img from './images/la2.svg';
import si2Img from './images/si2.svg';

// ==========================================
// --- OCTAVA 3 (Sonidos e Imágenes) ---
// ==========================================
import do3Sound from './sounds/do3.mp3';
import re3Sound from './sounds/re3.mp3';
import mi3Sound from './sounds/mi3.mp3';
import fa3Sound from './sounds/fa3.mp3';
import sol3Sound from './sounds/sol3.mp3';
import la3Sound from './sounds/la3.mp3';
import si3Sound from './sounds/si3.mp3';

import do3Img from './images/do3.svg';
import re3Img from './images/re3.svg';
import mi3Img from './images/mi3.svg';
import fa3Img from './images/fa3.svg';
import sol3Img from './images/sol3.svg';
import la3Img from './images/la3.svg';
import si3Img from './images/si3.svg';

// ==========================================
// --- OCTAVA 4 (Sonidos e Imágenes) ---
// ==========================================
import do4Sound from './sounds/do4.mp3';
import re4Sound from './sounds/re4.mp3';
import mi4Sound from './sounds/mi4.mp3';
import fa4Sound from './sounds/fa4.mp3';
import sol4Sound from './sounds/sol4.mp3';
import la4Sound from './sounds/la4.mp3';
import si4Sound from './sounds/si4.mp3';

import do4Img from './images/do4.svg';
import re4Img from './images/re4.svg';
import mi4Img from './images/mi4.svg';
import fa4Img from './images/fa4.svg';
import sol4Img from './images/sol4.svg';
import la4Img from './images/la4.svg';
import si4Img from './images/si4.svg';

// ==========================================
// --- DICCIONARIOS FINALES (Mapeo Dinámico) ---
// ==========================================

/**
 * Diccionario de Sonidos: 
 * Mapea la nota ('do2') a su archivo MP3 importado.
 */
export const noteSounds: Record<string, string> = {
  do2: do2Sound, re2: re2Sound, mi2: mi2Sound, fa2: fa2Sound, sol2: sol2Sound, la2: la2Sound, si2: si2Sound,
  do3: do3Sound, re3: re3Sound, mi3: mi3Sound, fa3: fa3Sound, sol3: sol3Sound, la3: la3Sound, si3: si3Sound,
  do4: do4Sound, re4: re4Sound, mi4: mi4Sound, fa4: fa4Sound, sol4: sol4Sound, la4: la4Sound, si4: si4Sound
};

/**
 * Diccionario de Imágenes (Símbolos únicos):
 * Mapea la nota ('do2') a su SVG único importado.
 */
export const noteImages: Record<string, string> = {
  do2: do2Img, re2: re2Img, mi2: mi2Img, fa2: fa2Img, sol2: sol2Img, la2: la2Img, si2: si2Img,
  do3: do3Img, re3: re3Img, mi3: mi3Img, fa3: fa3Img, sol3: sol3Img, la3: la3Img, si3: si3Img,
  do4: do4Img, re4: re4Img, mi4: mi4Img, fa4: fa4Img, sol4: sol4Img, la4: la4Img, si4: si4Img
};