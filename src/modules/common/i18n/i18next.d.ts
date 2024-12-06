import "i18next";
import initialNs from "./locales/en/initial.json";
import { resources, defaultNS } from "./i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "initialNs";
    resources: {
      initialNs: typeof initialNs;
    };
  }
}

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)["en"];
  }
}
