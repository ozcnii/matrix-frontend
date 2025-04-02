import { create } from "zustand";

interface GuessedWordsStore {
  isShowModal: boolean;
  setIsShowModal: (isShowModal: boolean) => void;
  seedPhrase: string[];
  setSeedPhrase: (seedPhrase: string[]) => void;
  guessedWords: string[];
  pushGuessedWord: (word: string) => void;
  setGuessedWords: (guessedWords: string[]) => void;
}

export const MAX_GUESSED_WORDS = 3;

export const useGuessedWords = create<GuessedWordsStore>((set) => ({
  seedPhrase: [],
  setSeedPhrase: (seedPhrase: string[]) => set({ seedPhrase }),
  guessedWords: [],
  pushGuessedWord: (word: string) =>
    set((state) => ({ guessedWords: [...state.guessedWords, word] })),
  setGuessedWords: (guessedWords: string[]) => set({ guessedWords }),
  isShowModal: false,
  setIsShowModal: (isShowModal: boolean) => set({ isShowModal }),
}));
