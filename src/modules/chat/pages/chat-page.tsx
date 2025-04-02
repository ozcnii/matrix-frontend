import { useTranslation } from "react-i18next";
import { useMessageBoxes } from "../hooks/use-message-boxes";
import { useChat } from "../hooks/use-chat";
import { MessageBox } from "@/modules/common/ui/message-box";
import { MessageList } from "../components/message-list";
import { Spinner } from "@telegram-apps/telegram-ui";
import { ChatForm } from "../components/chat-form";
import { ChatHeader } from "../components/chat-header";
import { useMessages } from "../stores/use-messages";
import { useGuessedWords } from "../stores/use-guessed-words";
import { GuessedWordModal } from "../components/guessed-word-modal";

export const ChatPage = () => {
  const { t } = useTranslation();
  const { isFetchingMessages, messages } = useMessages();

  const {
    limitMessageBoxClosed,
    prizePoolMessageBoxClosed,
    onCloseLimitMessageBox,
    onClosePrizePoolMessageBox,
    openLimitMessageBox,
  } = useMessageBoxes();

  const {
    messageValue,
    setMessageValue,
    chatEndRef,
    scrollToBottom,
    animationCompleteHandler,
    isAwaitingAnswer,
    sendMessage,
  } = useChat();

  const { isShowModal, setIsShowModal } = useGuessedWords();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ChatHeader />

      <section className="p-4 flex flex-col h-full overflow-hidden gap-4">
        {!prizePoolMessageBoxClosed && (
          <MessageBox onClose={onClosePrizePoolMessageBox}>
            {t("chat.prize_pool_message")}
          </MessageBox>
        )}

        {isFetchingMessages ? (
          <div className="flex items-center justify-center h-full">
            <Spinner size="l" className="text-[#55B146]" />
          </div>
        ) : (
          <MessageList
            messages={messages}
            scrollToBottom={scrollToBottom}
            animationCompleteHandler={animationCompleteHandler}
          >
            <div ref={chatEndRef} />
          </MessageList>
        )}
      </section>

      <div className="flex flex-col gap-4 p-4 pt-0">
        {!limitMessageBoxClosed && (
          <MessageBox onClose={onCloseLimitMessageBox}>
            {t("chat.free_limit_message")}
          </MessageBox>
        )}

        <ChatForm
          messageValue={messageValue}
          isAwaitingAnswer={isAwaitingAnswer}
          setMessageValue={setMessageValue}
          openLimitMessageBox={openLimitMessageBox}
          closeLimitMessageBox={onCloseLimitMessageBox}
          sendMessage={sendMessage}
        />
      </div>

      {isShowModal && (
        <GuessedWordModal onClose={() => setIsShowModal(false)} />
      )}
    </div>
  );
};
