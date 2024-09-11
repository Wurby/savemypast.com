import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Link from "../components/Link";
import Text from "../components/Text";
import useSetTheme from "../hooks/useSetTheme";
import { HorizontalDivider, VerticalDivider } from "../components/ThinDivider";

type RouteTitles = {
  [key: string]: string;
};

const routeTitles = {
  "/": "Home",
  "/settings": "Settings",
  "/404": "Page Not Found",
} as RouteTitles;

const Layout: React.FC = () => {
  const { theme } = useSetTheme();
  const currentRoute = useLocation().pathname;

  return (
    <div
      className={
        theme === "dark"
          ? "dark flex min-h-screen flex-col"
          : "flex min-h-screen flex-col"
      }
    >
      <header>
        <nav className="flex w-full items-center justify-between gap-2 bg-slate-500 px-4 py-4 shadow-sm shadow-slate-400 dark:bg-slate-950">
          <div>
            <a href="/" className="flex items-end justify-end">
              <Text variant="title">Save</Text>
              <Text variant="subtitle">mypast</Text>
            </a>
          </div>
          <div className="flex h-full gap-4">
            <Link
              className="border-2 border-slate-500 bg-slate-300 px-4 py-0.5 text-slate-900 active:translate-y-px dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
              href="/"
            >
              Home
            </Link>
            <VerticalDivider />
            <Link
              className="border-2 border-slate-500 bg-slate-300 px-4 py-0.5 text-slate-900 active:translate-y-px dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
              href="/settings"
            >
              Settings
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex flex-1 flex-col px-2 py-2 dark:bg-slate-900">
        <Text variant="title" className="self-center">
          {routeTitles[currentRoute]}
        </Text>
        <HorizontalDivider />
        <Outlet />
      </main>
      <footer className="bg-slate-200 px-4 py-2 dark:bg-slate-950">
        <Text>this is a footer</Text>
      </footer>
    </div>
  );
};

export default Layout;
