import { RefferalsIcon } from "@/modules/common/icons/refferals-icon";
import { Button } from "@/modules/common/ui/button";
import { useTranslation } from "react-i18next";
import { openTelegramLink } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
import { SuccessIcon } from "@/modules/common/icons/success-icon";

export const RefferalsPage = () => {
  const inviteLink = "https://t.me/matrix_example_bot?start=true";
  const inviteLinkUrl = "https://t.me/share/url?url=" + inviteLink;

  const [claimed, setClaimed] = useState(false);

  const { t } = useTranslation();

  const onClaim = () => {
    localStorage.setItem("claimed", "1");
    setClaimed(true);
  };

  useEffect(() => {
    localStorage.getItem("claimed") === "1" && setClaimed(true);
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="text-center py-5 border-b border-white/20">
        <h2 className="text-white text-lg font-bold">
          {t("refferals.header")}
        </h2>
      </header>

      <section className="p-4 flex flex-col h-full overflow-auto gap-4">
        <div className="text-center">
          <h3 className="text-white text-lg">{t("refferals.title")}: 20</h3>
          <p className="text-[#bebebe]">{t("refferals.instruction")}</p>
          <br />
          <p className="text-white font-bold">
            {t("refferals.earned")}: 0.22 TON
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
              {t("refferals.claimed_button")}
            </div>
          ) : (
            t("refferals.claim_button")
          )}
        </Button>

        <Button
          size="l"
          className="[&>span]:text-sm"
          before={<RefferalsIcon h={18} w={18} />}
          onClick={() => openTelegramLink(inviteLinkUrl)}
        >
          {t("refferals.invite_button")}
        </Button>
      </section>
    </div>
  );
};
