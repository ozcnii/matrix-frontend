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

const botUsername = import.meta.env.VITE_BOT_USERNAME || "matrix_simple_bot";

export const ReferralsPage = () => {
  const user = useSignal(initData.user);
  const { t } = useTranslation();
  const [claimed, setClaimed] = useState(false);
  const [referrals, setReferrals] = useState<GetReferralsResponse | null>(null);
  const [isReferralsLoading, setIsReferralsLoading] = useState(true);

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
          onClick={() => {
            console.log("@inviteLinkUrl", inviteLinkUrl);
            openTelegramLink(inviteLinkUrl);
          }}
        >
          {t("referrals.invite_button")}
        </Button>
      </section>
    </div>
  );
};
