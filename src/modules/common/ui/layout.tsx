import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { ChatIcon } from "../icons/chat-icon";
import { ReferralsIcon } from "../icons/referrals-icon";
import { SettingsIcon } from "../icons/settings-icon";
import { useTranslation } from "react-i18next";

export const Layout = ({
  children,
  showNavbar = false,
}: {
  children: ReactNode;
  showNavbar?: boolean;
}) => {
  const { t } = useTranslation();

  const items = [
    {
      title: t("navbar.chat"),
      icon: <ChatIcon />,
      to: "/chat",
    },
    {
      title: t("navbar.referrals"),
      icon: <ReferralsIcon />,
      to: "/referrals",
    },
    {
      title: t("navbar.settings"),
      icon: <SettingsIcon />,
      to: "/settings",
    },
  ];

  return (
    <>
      <div className="h-dvh min-h-dvh max-h-dvh overflow-hidden w-full bg-black text-[#55B146] font-mono flex flex-col relative">
        <main className="flex-1 overflow-auto">{children}</main>

        {showNavbar && (
          <nav className="flex gap-2 justify-around w-full bg-black p-4">
            {items.map(({ icon, title, to }) => (
              <NavLink
                key={title}
                to={to}
                className="flex flex-col items-center gap-2 w-20"
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={
                        isActive
                          ? "[&>svg>path]:fill-white"
                          : "[&>svg>path]:fill-[#ccc]/40"
                      }
                    >
                      {icon}
                    </div>
                    <span
                      className={isActive ? "text-white" : "text-[#ccc]/40"}
                    >
                      {title}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        )}
      </div>

      <div className="green-circle-left" />
      <div className="green-circle-center" />
      <div className="green-circle-right" />
    </>
  );
};
