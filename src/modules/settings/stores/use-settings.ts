import { create } from "zustand";

export type PaymentType = "TON" | "STARS";

interface SettingsStore {
  selectedPaymentType: PaymentType;
  setSelectedPaymentType: (type: PaymentType) => void;
}

export const useSettings = create<SettingsStore>((set) => ({
  selectedPaymentType: "STARS",
  setSelectedPaymentType: (type) => set({ selectedPaymentType: type }),
}));
