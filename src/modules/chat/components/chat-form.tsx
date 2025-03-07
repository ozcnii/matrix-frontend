import { useTranslation } from "react-i18next";
import { RightArrowIcon } from "@/modules/common/icons/right-arrow-icon";
import { Button } from "@/modules/common/ui/button";
import { useMessages } from "../stores/use-messages";
import { FormEvent, useState } from "react";
import { initData, openInvoice, useSignal } from "@telegram-apps/sdk-react";
import { toast } from "react-toastify";
import { api } from "@/modules/common/api";
import { useSettings } from "@/modules/settings/stores/use-settings";
import { SendTransactionRequest, useTonConnectUI } from "@tonconnect/ui-react";
import { toNano } from "@ton/ton";

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

export const ChatForm = ({
  isAwaitingAnswer,
  messageValue,
  setMessageValue,
  openLimitMessageBox,
  closeLimitMessageBox,
  sendMessage,
}: {
  isAwaitingAnswer: boolean;
  messageValue: string;
  setMessageValue: (value: string) => void;
  openLimitMessageBox: () => void;
  closeLimitMessageBox: () => void;
  sendMessage: (message: string) => void;
}) => {
  const { t } = useTranslation();
  const { selectedPaymentType } = useSettings();
  const {
    isFetchingMessages,
    messages,
    messagesLimit,
    incrementMessagesLimit,
  } = useMessages();

  const [tonConnectUI] = useTonConnectUI();
  const user = useSignal(initData.user);

  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [starsPaymentLink, setStarsPaymentLink] = useState<string | null>(null);

  const userMessages = messages.filter((message) => message.from === "user");
  const isMessagesLimitReached = userMessages.length >= messagesLimit;

  const isSendMessageButtonDisabled =
    !messageValue ||
    isMessagesLimitReached ||
    isAwaitingAnswer ||
    isFetchingMessages;

  const messageInputPlaceholder = isFetchingMessages
    ? ""
    : isMessagesLimitReached
    ? t("chat.limit_placeholder", { amount: "$291.95" })
    : `${userMessages.length} / ${messagesLimit} ${t("chat.free_message")}`;

  const openLimitMessageBoxHandler = () => {
    if (isMessagesLimitReached) {
      openLimitMessageBox();
    }
  };

  const tonPaymentHandler = async () => {
    setIsPaymentLoading(true);

    const transaction: SendTransactionRequest = {
      validUntil: Date.now() + 5 * 60 * 1000,
      messages: [
        {
          address: import.meta.env.VITE_TON_ADDRESS,
          amount: toNano("0.1").toString(),
        },
      ],
    };

    try {
      await tonConnectUI.sendTransaction(transaction);

      const isOk = await checkTonPayment();

      if (isOk) {
        // TODO: add i18n
        toast("Оплата прошла успешно");
        incrementMessagesLimit();
        closeLimitMessageBox();
      } else {
        // TODO: add i18n
        toast("Оплата не прошла");
      }
    } catch {
      //
    } finally {
      setIsPaymentLoading(false);
    }
  };

  const checkTonPayment = async (count = 0): Promise<boolean> => {
    if (count === 10) {
      return false;
    }

    const userId = user?.id || 0;

    const sum = [...userId.toString()]
      .map(Number)
      .reduce((prev, acc) => prev + acc, 0);

    try {
      await api.post<boolean>(
        "/check_payment",
        {
          adr: tonConnectUI.account?.address,
          task_id: sum % 3,
        },
        {
          headers: {
            userid: userId,
          },
        }
      );
      return true;
    } catch (error) {
      await sleep(1000);
      return checkTonPayment(count + 1);
    }
  };

  const telegramStarsPaymentHandler = async () => {
    const link = await fetchStarsPaymentLink();

    if (!link) {
      return;
    }

    const status = await openInvoice(link, "url");

    if (status === "paid") {
      toast(t("payment.success"));
      incrementMessagesLimit();
      closeLimitMessageBox();
    } else if (status === "error" || status === "failed") {
      // TODO: add retries limit and after show error (+ i18n)
      // telegramStarsPaymentHandler();
      //
      toast(t("payment.invoice_error"));
    } else if (status === "cancelled") {
      return;
    } else {
      toast(t("payment.unknown_status", { status }));
    }
  };

  const fetchStarsPaymentLink = async () => {
    if (starsPaymentLink) {
      return starsPaymentLink;
    }

    setIsPaymentLoading(true);

    try {
      const response = await api.get<string>("get_invoice_link");
      setStarsPaymentLink(response.data);
      return response.data;
    } catch (error) {
      toast(t("payment.get_link_error"));
      return null;
    } finally {
      setIsPaymentLoading(false);
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isMessagesLimitReached) {
      sendMessage(messageValue);
      return;
    }

    if (selectedPaymentType === "STARS") {
      telegramStarsPaymentHandler();
    }

    if (selectedPaymentType === "TON") {
      tonPaymentHandler();
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex gap-4">
      <input
        type="text"
        value={messageValue}
        onChange={(e) => {
          setMessageValue(e.target.value);
          openLimitMessageBoxHandler();
        }}
        onFocus={openLimitMessageBoxHandler}
        disabled={isFetchingMessages}
        placeholder={messageInputPlaceholder}
        className="text-white placeholder-white/20 w-full px-2 bg-transparent rounded border border-solid border-white/20 disabled:cursor-default disabled:opacity-35"
      />

      {isMessagesLimitReached ? (
        <Button
          type="submit"
          loading={isPaymentLoading}
          className="h-12 w-12 text-white/20"
        >
          $
        </Button>
      ) : (
        <Button
          type="submit"
          disabled={isSendMessageButtonDisabled}
          className="h-12 w-12 text-white/20"
        >
          <RightArrowIcon />
        </Button>
      )}
    </form>
  );
};
