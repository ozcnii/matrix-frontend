import { WalletIcon } from "@/modules/common/icons/wallet-icon";
import { Button } from "@/modules/common/ui/button";
import { Checkbox } from "@/modules/common/ui/checkbox";
import { useTranslation } from "react-i18next";
import StarsIcon from "@/modules/common/assets/tg-stars-icon.png";
import TonIcon from "@/modules/common/assets/ton-icon.png";
import { DisconnectIcon } from "@/modules/common/icons/disconnect-icon";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { PaymentType, useSettings } from "../stores/use-settings";
import { useLayoutEffect } from "react";

export const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  const { selectedPaymentType, setSelectedPaymentType } = useSettings();

  const onConnectTonWallet = () => {
    tonConnectUI.openModal();
  };

  const onDisconnectTonWallet = async () => {
    await tonConnectUI.disconnect();
    setSelectedPaymentType("STARS");
  };

  useLayoutEffect(() => {
    const type = localStorage.getItem("SELECTED_PAYMENT_TYPE");
    if (type === "TON") {
      setSelectedPaymentType("TON");
    } else {
      setSelectedPaymentType("STARS");
    }
  }, []);

  const changePaymnetType = (type: PaymentType) => {
    localStorage.setItem("SELECTED_PAYMENT_TYPE", type);
    setSelectedPaymentType(type);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="text-center py-5 border-b border-white/20">
        <h2 className="text-white text-lg font-bold">{t("settings.header")}</h2>
      </header>

      <section className="p-4 flex flex-col h-full overflow-auto gap-4">
        <h3 className="text-lg text-center text-white">
          {t("settings.select_payment_option")}
        </h3>

        <div className="mt-5 flex flex-col gap-6">
          <div className="flex gap-4 justify-between items-center">
            <div>
              <p className="text-lg text-white flex gap-1 items-center">
                Stars
                <img
                  className="h-[26px] w-[26px]"
                  src={StarsIcon}
                  alt="stars_icon"
                />
              </p>
            </div>
            <Checkbox
              checked={selectedPaymentType === "STARS"}
              onChange={() => changePaymnetType("STARS")}
            />
          </div>

          {wallet ? (
            <>
              <div className="flex gap-4 justify-between items-center">
                <div>
                  <p className="text-lg text-white flex gap-1 items-center">
                    TON
                    <img
                      className="h-[22px] w-[22px]"
                      src={TonIcon}
                      alt="ton_icon"
                    />
                  </p>
                </div>
                <Checkbox
                  checked={wallet && selectedPaymentType === "TON"}
                  onChange={() => wallet && changePaymnetType("TON")}
                />
              </div>
              <Button
                before={<DisconnectIcon />}
                size="l"
                className="w-full"
                onClick={onDisconnectTonWallet}
              >
                {t("settings.disconnect_wallet_button")}
              </Button>
            </>
          ) : (
            <div>
              <p className="text-[#BEBEBE]">{t("settings.to_pay_in_ton")}</p>
              <Button
                before={<WalletIcon />}
                size="l"
                className="w-full mt-5"
                onClick={onConnectTonWallet}
              >
                {t("settings.connect_wallet_button")}
              </Button>
            </div>
          )}
        </div>

        <hr className="border-b border-white/20" />

        <h3 className="text-lg text-center text-white">
          {t("settings.change_language")}
        </h3>

        <div className="flex gap-4 justify-between items-center mt-5">
          <p className="text-white text-lg">
            {t("settings.languages.english")}
          </p>
          <Checkbox
            checked={i18n.language === "en"}
            onChange={() => i18n.changeLanguage("en")}
          />
        </div>

        <div className="flex gap-4 justify-between items-center">
          <p className="text-white text-lg">
            {t("settings.languages.russian")}
          </p>
          <Checkbox
            checked={i18n.language === "ru"}
            onChange={() => i18n.changeLanguage("ru")}
          />
        </div>
      </section>
    </div>
  );
};
