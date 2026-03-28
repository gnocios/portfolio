import type { Song } from '../types';

export const twinkle: Song = {
  id: "twinkle-01",
  title: "Twinkle Twinkle Little Star",
  tempo: 100,
  events: [
    { note: "do3", duration: 4, text: "Twin-" },
    { note: "do3", duration: 4, text: "kle" },
    { note: "sol3", duration: 4, text: "twin-" },
    { note: "sol3", duration: 4, text: "kle" },
    { note: "la3", duration: 4, text: "lit-" },
    { note: "la3", duration: 4, text: "tle" },
    { note: "sol3", duration: 2, text: "star" },

    { note: "fa3", duration: 4, text: "How" },
    { note: "fa3", duration: 4, text: "I" },
    { note: "mi3", duration: 4, text: "won-" },
    { note: "mi3", duration: 4, text: "der" },
    { note: "re3", duration: 4, text: "what" },
    { note: "re3", duration: 4, text: "you" },
    { note: "do3", duration: 2, text: "are" }
  ]
};