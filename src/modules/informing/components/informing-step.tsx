import { Button } from "@/modules/common/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TypeAnimation } from "react-type-animation";
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
              <TypeAnimation
                sequence={[content, 1000, () => setStep((s) => s + 1)]}
                cursor={false}
                speed={75}
              />
              <br />
              <br />
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
