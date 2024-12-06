import { createContext, ReactNode, useContext, useState } from "react";

type InformedContextValue = {
  informed: boolean | null;
  setInformed: (value: boolean) => void;
} | null;

const InformedContext = createContext<InformedContextValue>(null);

export const InformedContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [informed, setInformed] = useState<boolean | null>(null);
  return (
    <InformedContext.Provider
      value={{
        informed,
        setInformed: (value: boolean) => {
          localStorage.setItem("informed", value ? "1" : "0");
          setInformed(value);
        },
      }}
    >
      {children}
    </InformedContext.Provider>
  );
};

export const useInformed = () => {
  const context = useContext(InformedContext);

  if (!context) {
    throw new Error(
      "useInformed must be used within a InformedContextProvider"
    );
  }

  return context;
};
