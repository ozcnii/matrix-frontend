import { create } from "zustand";

interface GuessedWordsStore {
  guessedWords: string[];
  setGuessedWords: (words: string[]) => void;
}

export const MAX_GUESSED_WORDS = 3;

export const useGuessedWords = create<GuessedWordsStore>((set) => ({
  guessedWords: [],
  setGuessedWords: (words: string[]) => set({ guessedWords: words }),
}));
