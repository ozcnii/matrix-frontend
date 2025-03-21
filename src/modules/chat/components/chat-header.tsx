import { useTranslation } from "react-i18next";
import {
  MAX_GUESSED_WORDS,
  useGuessedWords,
} from "../stores/use-guessed-words";
import { Progress } from "./progress";

export const ChatHeader = () => {
  const { t } = useTranslation();
  const { guessedWords } = useGuessedWords();

  return (
    <header className="text-center py-5 px-4 border-b border-white/20 flex items-center justify-between gap-1">
      <h2 className="text-white text-lg">
        {t("chat.guessed_words_count_message", {
          count: guessedWords.length,
          max: MAX_GUESSED_WORDS,
        })}
      </h2>
      <Progress current={guessedWords.length} max={MAX_GUESSED_WORDS} />
    </header>
  );
};
