import { Button } from "@/modules/common/ui/button";
import { ChatModal } from "./chat-modal";
import {
  MAX_GUESSED_WORDS,
  useGuessedWords,
} from "../stores/use-guessed-words";
import { useTranslation } from "react-i18next";
import { CopyIcon } from "@/modules/common/icons/copy-icon";
import { copyToClipboard } from "@/modules/common/helpers/copy-to-clipboard";

export const GuessedWordModal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const { guessedWords } = useGuessedWords();
  const lastWord = guessedWords[guessedWords.length - 1] || "-";

  return (
    <ChatModal header={<span>🏆 Congratulations!</span>} onClose={onClose}>
      <span>
        {t("chat.guessed_words_count_message", {
          count: guessedWords.length,
          max: MAX_GUESSED_WORDS,
        })}
      </span>
      <Button
        onClick={() => copyToClipboard(lastWord)}
        size="l"
        stretched
        className="mt-5"
        style={{
          backgroundColor: "#242922",
          border: "none",
        }}
        after={<CopyIcon className="text-[#BEBEBE] absolute right-4" />}
      >
        <span className="text-white text-xl">{lastWord}</span>
      </Button>
    </ChatModal>
  );
};
