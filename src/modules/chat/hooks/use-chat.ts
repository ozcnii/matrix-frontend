import { useCallback, useEffect, useRef, useState } from "react";
import { initData, useSignal } from "@telegram-apps/sdk-react";
import { toast } from "react-toastify";
import { useMessages } from "../stores/use-messages";
import { useTranslation } from "react-i18next";
import {
  MAX_GUESSED_WORDS,
  useGuessedWords,
} from "../stores/use-guessed-words";
import { userService } from "../api/user-service";
import { useTasks } from "../stores/use-tasks";
import { AxiosError } from "axios";

export const useChat = () => {
  const { t } = useTranslation();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const user = useSignal(initData.user);

  const {
    messages,
    sendMessage,
    markMessagesAsRead,
    fetchMessages,
    setIsFetchingMessages,
    setFirstMessage,
  } = useMessages();

  const { setSolvedTasks, solved, unsolved, getCurrentTask } = useTasks();
  const { pushGuessedWord, setSeedPhrase, setGuessedWords, setIsShowModal } =
    useGuessedWords();

  const [messageValue, setMessageValue] = useState("");
  const [isAwaitingAnswer, setIsAwaitingAnswer] = useState(false);

  async function loadData() {
    userService
      .getUserRiddlesStat({ userId: user?.id || 0 })
      .then((stat) => {
        setSolvedTasks({ solved: stat.solved, unsolved: stat.unsolved });
        fetchMessages({
          initialMessages: [
            {
              text: t("chat.first_bot_message"),
              from: "bot",
              id: Date.now() + 1,
              isNew: true,
              type: "message",
            },
          ],
          userId: user?.id || 0,
          taskId: stat.solved + 1,
        })
          .then(() => {
            userService
              .getSeedPhrase({ userId: user?.id || 0 })
              .then((seedPhrase) => {
                setSeedPhrase(seedPhrase);
                setGuessedWords(
                  seedPhrase
                    .slice(
                      seedPhrase.length - MAX_GUESSED_WORDS,
                      seedPhrase.length
                    )
                    .filter((w) => w != "?")
                );
                setFirstMessage({
                  text: seedPhrase.join(", "),
                  from: "bot",
                  id: Date.now(),
                  isNew: true,
                  type: "words",
                });
                setIsFetchingMessages(false);
                scrollToBottom();
              })
              .catch((error) => {
                toast(error?.response?.data || error?.message || error);
                console.error(error);
              });
          })
          .catch((error) => {
            toast(error?.response?.data || error?.message || error);
            console.error(error);
          });
      })
      .catch((error) => {
        toast(error?.response?.data || error?.message || error);
        console.error(error);
      });
  }

  useEffect(() => {
    if (!messages.length) {
      loadData();
    } else {
      scrollToBottom(false);
    }

    return () => {
      markMessagesAsRead();
    };
  }, []);

  const scrollToBottom = useCallback((withSmooth = true) => {
    chatEndRef.current?.scrollIntoView({
      behavior: withSmooth ? "smooth" : "instant",
      block: "end",
    });
  }, []);

  const animationCompleteHandler = () => {
    setIsAwaitingAnswer(false);
  };

  const sendMessageHandler = async (message: string) => {
    setMessageValue("");
    setIsAwaitingAnswer(true);

    try {
      const { solved: isSolvedTask, solved_word } = await sendMessage({
        message,
        userId: user!.id,
        onMessageAdded: scrollToBottom,
        taskId: getCurrentTask(),
      });

      if (isSolvedTask) {
        setIsShowModal(true);
        pushGuessedWord(solved_word);

        if (solved < (solved+ unsolved)) {
          setSolvedTasks({
            solved: solved + 1,
            unsolved: unsolved - 1,
          });  
          loadData();
        }
      }
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        if (error.status === 402) {
          toast(
            t("chat.free_limit_message") +
              " " +
              t("chat.free_limit_prize_message")
          );
          return;
        }
      }
      toast(String(error));
    }
  };

  return {
    sendMessage: sendMessageHandler,
    messageValue,
    setMessageValue,
    chatEndRef,
    scrollToBottom,
    animationCompleteHandler,
    isAwaitingAnswer,
  };
};
