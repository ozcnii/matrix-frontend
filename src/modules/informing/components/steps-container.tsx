import { useState } from "react";
import { LanguageSelectionStep } from "./language-selection-step";
import { InformingStep } from "./informing-step";

export const StepsContainer = ({ onStart }: { onStart: () => void }) => {
  const [languageSelected, setLanguageSelected] = useState(false);

  return (
    <>
      {!languageSelected ? (
        <LanguageSelectionStep next={() => setLanguageSelected(true)} />
      ) : (
        <InformingStep next={onStart} />
      )}
    </>
  );
};
