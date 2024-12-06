import { useLayoutEffect, useState } from "react";

export const useMessageBoxes = () => {
  const [prizePoolMessageBoxClosed, setPrizePoolMessageBoxClosed] =
    useState(false);
  const [limitMessageBoxClosed, setLimitMessageBoxClosed] = useState(true);

  useLayoutEffect(() => {
    const prizePoolMessageBoxClosed = localStorage.getItem(
      "prizePoolMessageBoxClosed"
    );
    const limitMessageBoxClosed = localStorage.getItem("limitMessageBoxClosed");

    if (prizePoolMessageBoxClosed) {
      setPrizePoolMessageBoxClosed(true);
    }

    if (limitMessageBoxClosed === "1") {
      setLimitMessageBoxClosed(true);
    } else if (limitMessageBoxClosed === "0") {
      setLimitMessageBoxClosed(false);
    }
  }, []);

  const onClosePrizePoolMessageBox = () => {
    localStorage.setItem("prizePoolMessageBoxClosed", "1");
    setPrizePoolMessageBoxClosed(true);
  };

  const onCloseLimitMessageBox = () => {
    localStorage.setItem("limitMessageBoxClosed", "1");
    setLimitMessageBoxClosed(true);
  };

  const openLimitMessageBox = () => {
    localStorage.setItem("limitMessageBoxClosed", "0");
    setLimitMessageBoxClosed(false);
  };

  return {
    prizePoolMessageBoxClosed,
    limitMessageBoxClosed,
    onClosePrizePoolMessageBox,
    onCloseLimitMessageBox,
    openLimitMessageBox,
  };
};
