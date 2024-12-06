import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

import { init } from "@/modules/common/tg/init.ts";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "./index.css";

// Mock the environment in case, we are outside Telegram.
import "./modules/common/tg/mock-env.ts";
import { Root } from "./modules/app/root.tsx";
import { EnvUnsupported } from "./modules/common/ui/evn-unsupported.tsx";

const root = ReactDOM.createRoot(document.getElementById("root")!);

try {
  init(retrieveLaunchParams().startParam === "debug" || import.meta.env.DEV);

  root.render(
    <StrictMode>
      <Root />
    </StrictMode>
  );
} catch (e) {
  root.render(<EnvUnsupported />);
}
