import { ReferralsIcon } from "@/modules/common/icons/referrals-icon";
import { Button } from "@/modules/common/ui/button";
import { useTranslation } from "react-i18next";
import {
  initData,
  openTelegramLink,
  useSignal,
} from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
import { SuccessIcon } from "@/modules/common/icons/success-icon";
import { getStartLink } from "../lib";
import {
  GetReferralsResponse,
  referralsService,
} from "../api/referrals-service";
import { toast } from "react-toastify";
import { useTvl } from "@/modules/settings/stores/use-tvl";
import { CopyIcon } from "@/modules/common/icons/copy-icon";
import { copyToClipboard } from "@/modules/common/helpers/copy-to-clipboard";
import { useGuessedWords } from "@/modules/chat/stores/use-guessed-words";
import { Spinner } from "@telegram-apps/telegram-ui";

const botUsername = import.meta.env.VITE_BOT_USERNAME || "matrix_simple_bot";

export const ReferralsPage = () => {
  const user = useSignal(initData.user);
  const { t } = useTranslation();
  const [claimed, setClaimed] = useState(false);
  const [referrals, setReferrals] = useState<GetReferralsResponse | null>(null);
  const [isReferralsLoading, setIsReferralsLoading] = useState(true);
  const { totalUsd, isTvlLoading } = useTvl();

  const { seedPhrase } = useGuessedWords();

  const inviteLinkUrl =
    "https://t.me/share/url?url=" +
    getStartLink(botUsername, user?.id.toString() || "");

  const onClaim = () => {
    localStorage.setItem("claimed", "1");
    setClaimed(true);
  };

  useEffect(() => {
    localStorage.getItem("claimed") === "1" && setClaimed(true);

    referralsService
      .getReferrals(user!.id)
      .then((data) => {
        setReferrals(data);
        setIsReferralsLoading(false);
      })
      .catch((error) => {
        toast("Произошла ошибка при получении рефералов: " + error);
      });
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="text-center py-5 border-b border-white/20">
        <h2 className="text-white text-lg font-bold">
          {t("referrals.header")}
        </h2>
      </header>

      <h3 className="text-white py-5  text-lg text-center font-bold border-b border-white/20">
        {t("prize_pool.prize_pool")}: ${isTvlLoading ? "..." : totalUsd}
      </h3>

      <section className="p-4 flex flex-col h-full overflow-auto gap-4">
        <div className="text-center">
          <h3 className="text-white text-lg">
            {t("referrals.title")}:{" "}
            {isReferralsLoading ? "..." : referrals?.count}
          </h3>
          <p className="text-[#bebebe]">{t("referrals.instruction")}</p>
          <br />
          <p className="text-white font-bold">
            {t("referrals.earned")}:{" "}
            {isReferralsLoading ? "..." : referrals?.earn + " TON"}
          </p>
        </div>
        <Button
          size="l"
          disabled={claimed}
          className="[&>span]:text-sm !border-[#55B1462B] text-[#55B146]"
          onClick={onClaim}
        >
          {claimed ? (
            <div className="flex gap-2 items-center">
              <SuccessIcon />
              {t("referrals.claimed_button")}
            </div>
          ) : (
            t("referrals.claim_button")
          )}
        </Button>
        <Button
          size="l"
          className="[&>span]:text-sm"
          before={<ReferralsIcon h={18} w={18} />}
          onClick={() => openTelegramLink(inviteLinkUrl)}
        >
          {t("referrals.invite_button")}
        </Button>

        <h3 className="text-white py-5 text-center font-bold border-b border-t border-white/20">
          Seed Phrase
        </h3>

        {seedPhrase.length === 0 ? (
          <div className="flex items-center justify-center">
            <Spinner size="l" className="text-[#55B146]" />
          </div>
        ) : (
          <div className="flex flex-col gap-[5px]">
            <div className="grid grid-cols-3 gap-[5px] text-center text-white">
              {seedPhrase.map((word, index) => (
                <span
                  className="bg-[#242922] h-[38px] p-[10px] rounded-[8px] text-white"
                  key={index}
                >
                  {word}
                </span>
              ))}
            </div>
            <Button
              onClick={() => copyToClipboard(seedPhrase.join(" "))}
              size="m"
              stretched
              style={{
                backgroundColor: "#242922",
                border: "none",
              }}
              className="text-white"
              after={<CopyIcon className="text-[#BEBEBE] absolute right-4" />}
            >
              {t("common.copy")}
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};
