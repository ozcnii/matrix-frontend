import { InformingPage } from "@/modules/informing/pages/informing-page";
import { ChatPage } from "@/modules/chat/pages/chat-page";
import { RouteProps } from "react-router-dom";
import { RefferalsPage } from "@/modules/refferals/pages/refferals-page";
import { SettingsPage } from "@/modules/settings/pages/settings-page";

export const routes: RouteProps[] = [
  {
    path: "/",
    element: null,
  },
  {
    path: "/informing",
    element: <InformingPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "/refferals",
    element: <RefferalsPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
];
