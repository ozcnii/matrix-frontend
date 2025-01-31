import { useTranslation } from "react-i18next";

export const ChatHeader = () => {
  const { t } = useTranslation();

  return (
    <header className="text-center py-5 border-b border-white/20">
      <h2 className="text-white text-lg font-bold">
        {t("chat.prize_pool")}: $12,985.12
      </h2>
      <p className="mt-2 text-sm text-[#BEBEBE]">
        330 {t("chat.participants")} · 819 {t("chat.attempts")}
      </p>
    </header>
  );
};
