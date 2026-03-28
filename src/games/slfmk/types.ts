/**
 * Definimos el rango completo: octavas 2, 3 y 4.
 * Incluimos las notas naturales y las alteraciones que usas.
 */
export type NoteName = 
  // Octava 2
  | 'do2' | 'reb2' | 're2' | 'mib2' | 'mi2' | 'fa2' | 'solb2' | 'sol2' | 'lab2' | 'la2' | 'sib2' | 'si2'
  // Octava 3
  | 'do3' | 'reb3' | 're3' | 'mib3' | 'mi3' | 'fa3' | 'solb3' | 'sol3' | 'lab3' | 'la3' | 'sib3' | 'si3'
  // Octava 4 (Por si llegamos al Do agudo o más)
  | 'do4' | 're4' | 'mi4' | 'fa4' | 'sol4' | 'la4' | 'si4'
  | 'rest'; // Silencio

export interface MusicEvent {
  note: NoteName;
  duration: number; // 4=negra, 2=blanca, 8=corchea
  text?: string;    // Letra del karaoke
}

export interface Song {
  id: string;
  title: string;
  tempo: number;
  events: MusicEvent[];
}