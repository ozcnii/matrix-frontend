import { Button } from "@/modules/common/ui/button";
import { TypingText } from "@/modules/common/ui/typing-text";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";

export const InformingStep = ({ next }: { next: () => void }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  const stepsContent = [
    t("informing.knock_knock"),
    t("informing.convince_matrix"),
    t("informing.start_attempts"),
    t("informing.paid_messages"),
    t("informing.prize_pool"),
    t("informing.good_luck"),
  ];

  return (
    <>
      {stepsContent.map(
        (content, index) =>
          step >= index && (
            <Fragment key={index}>
              <TypingText
                text={content}
                onAnimationComplete={() => {
                  setTimeout(() => {
                    setStep((s) => s + 1);
                  }, 1000);
                }}
              />
            </Fragment>
          )
      )}

      {step === stepsContent.length && (
        <Button onClick={next} className="w-full">
          {t("informing.start")}
        </Button>
      )}
    </>
  );
};
