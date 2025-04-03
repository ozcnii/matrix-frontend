import { useLaunchParams, miniApp, useSignal } from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { routes } from "@/modules/app/navigation/routes";
import { Watcher } from "./watcher";
import { Layout } from "../common/ui/layout";
import { useInformed } from "../common/contexts/informed";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { taskService } from "../chat/api/task-service";
import { useTasks } from "../chat/stores/use-tasks";
import { useTvl } from "../settings/stores/use-tvl";
import { tvlService } from "../referrals/api/tvl-service";

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

  const { informed, setInformed } = useInformed();
  const { setTasks, setIsTaskDescriptionLoading } = useTasks();
  const { setIsTvlLoading, setTvl } = useTvl();

  useEffect(() => {
    const informed = localStorage.getItem("informed") === "1";
    setInformed(informed);

    setIsTaskDescriptionLoading(true);
    setIsTvlLoading(true);

    tvlService
      .getTvlPrize()
      .then(setTvl)
      .finally(() => {
        setIsTvlLoading(false);
      });

    taskService
      .getTasks()
      .then((tasks) => {
        setTasks(tasks);
      })
      .finally(() => {
        setIsTaskDescriptionLoading(false);
      });
  }, []);

  return (
    <AppRoot
      appearance={isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      <BrowserRouter basename="matrix">
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
      </BrowserRouter>
    </AppRoot>
  );
}
