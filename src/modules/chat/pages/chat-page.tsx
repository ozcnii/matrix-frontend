import { useTranslation } from "react-i18next";
import { useMessageBoxes } from "../hooks/use-message-boxes";
import { useChat } from "../hooks/use-chat";
import { MessageBox } from "@/modules/common/ui/message-box";
import { MessageList } from "../components/message-list";
import { Spinner } from "@telegram-apps/telegram-ui";
import { ChatForm } from "../components/chat-form";

export const ChatPage = () => {
  const { t } = useTranslation();

  const {
    limitMessageBoxClosed,
    prizePoolMessageBoxClosed,
    onCloseLimitMessageBox,
    onClosePrizePoolMessageBox,
    openLimitMessageBox,
  } = useMessageBoxes();

  const {
    messages,
    messageValue,
    setMessageValue,
    addMessage,
    messageButtonDisabled,
    messagesLimitReached,
    userMessages,
    messagesLimit,
    loading,
    chatEndRef,
    scrollToBottom,
  } = useChat();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="text-center py-5 border-b border-white/20">
        <h2 className="text-white text-lg font-bold">
          {t("chat.prize_pool")}: $12,985.12
        </h2>
        <p className="mt-2 text-sm text-[#BEBEBE]">
          330 {t("chat.participants")} · 819 {t("chat.attempts")}
        </p>
      </header>

      <section className="p-4 flex flex-col h-full overflow-hidden gap-4">
        {!prizePoolMessageBoxClosed && (
          <MessageBox onClose={onClosePrizePoolMessageBox}>
            {t("chat.prize_pool_message")}
          </MessageBox>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Spinner size="l" className="text-[#55B146]" />
          </div>
        ) : (
          <MessageList messages={messages} scrollToBottom={scrollToBottom}>
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
          addMessage={addMessage}
          loading={loading}
          messagesLimit={messagesLimit}
          userMessages={userMessages}
          messageValue={messageValue}
          setMessageValue={setMessageValue}
          messageButtonDisabled={messageButtonDisabled}
          messagesLimitReached={messagesLimitReached}
          openLimitMessageBox={openLimitMessageBox}
        />
      </div>
    </div>
  );
};
