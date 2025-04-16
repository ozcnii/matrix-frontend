import { useTranslation } from "react-i18next";
import {
  MAX_GUESSED_WORDS,
  useGuessedWords,
} from "../stores/use-guessed-words";
import { Progress } from "./progress";
import { useTasks } from "../stores/use-tasks";
import { Button, Tooltip } from "@telegram-apps/telegram-ui";
import { useRef, useState } from "react";
import { useOutsideClick } from "@/modules/common/hooks/use-outside-click";

export const ChatHeader = ({
  setMessageValue,
}: {
  setMessageValue: (value: string) => void;
}) => {
  const tooltipRef = useRef<HTMLButtonElement>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  useOutsideClick(tooltipRef, () => setIsTooltipVisible(false));

  const { t, i18n } = useTranslation();
  const { guessedWords } = useGuessedWords();
  const { getCurrentTaskSubject } = useTasks();

  const lang = i18n.language === "en" ? "en" : "ru";
  const taskDescription = getCurrentTaskSubject()?.description[lang] || "";

  const sureSolvedHandler = () => {
    const message =
      lang == "en"
        ? "Did I solve the riddle completely?"
        : "Я отгадал загадку полностью?";

    setMessageValue(message);
  };

  return (
    <div>
      <header className="text-center py-5 px-4 border-b border-white/20 flex items-center justify-between gap-1">
        <h2 className="text-white text-lg">
          {t("chat.guessed_words_count_message", {
            count: guessedWords.length,
            max: MAX_GUESSED_WORDS,
          })}
        </h2>
        <div className="flex items-center gap-2">
          <Progress current={guessedWords.length} max={MAX_GUESSED_WORDS} />

          <button
            ref={tooltipRef}
            onClick={() => setIsTooltipVisible((prev) => !prev)}
            className="h-9 w-9 border-2 border-white/20 rounded-full"
          >
            ?
          </button>

          {isTooltipVisible && (
            <Tooltip mode="light" withArrow={false} targetRef={tooltipRef}>
              {t("common.hint")}
            </Tooltip>
          )}
        </div>
      </header>

      <div className="text-center py-5 px-4 border-b border-white/20 text-white">
        <p>{taskDescription}</p>

        <Button
          stretched
          className="bg-[#242922] mt-1 text-white"
          onClick={sureSolvedHandler}
        >
          {t("chat.sure_solved_riddle")}
        </Button>
      </div>
    </div>
  );
};
