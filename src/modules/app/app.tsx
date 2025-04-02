import { useLaunchParams, miniApp, useSignal } from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { Navigate, Route, Routes, HashRouter } from "react-router-dom";
import { routes } from "@/modules/app/navigation/routes";
import { Watcher } from "./watcher";
import { Layout } from "../common/ui/layout";
import { useInformed } from "../common/contexts/informed";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

  const { informed, setInformed } = useInformed();

  useEffect(() => {
    const informed = localStorage.getItem("informed") === "1";
    setInformed(informed);
  }, []);

  return (
    <AppRoot
      appearance={isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      <HashRouter basename="matrix">
        <Layout showNavbar={!!informed}>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Watcher />
          <ToastContainer />
        </Layout>
      </HashRouter>
    </AppRoot>
  );
}
