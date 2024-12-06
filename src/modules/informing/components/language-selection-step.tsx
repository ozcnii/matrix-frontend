import { Button } from "@/modules/common/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TypeAnimation } from "react-type-animation";

export const LanguageSelectionStep = ({ next }: { next: () => void }) => {
  const { i18n } = useTranslation();
  const [animationFinished, setAnimationFinished] = useState(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    next();
  };

  return (
    <>
      <TypeAnimation
        sequence={[
          "Select the language you want to continue in.",
          () => setAnimationFinished(true),
        ]}
        cursor={false}
        speed={75}
      />
      {animationFinished && (
        <div className="flex gap-3 justify-center">
          <Button onClick={() => changeLanguage("en")} className="w-full">
            English
          </Button>
          <Button onClick={() => changeLanguage("ru")} className="w-full">
            Russian
          </Button>
        </div>
      )}
    </>
  );
};
