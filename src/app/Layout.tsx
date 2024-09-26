import React from "react";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Link from "../components/Link";
import Text from "../components/Text";
import useSetTheme from "../hooks/useSetTheme";
import { HorizontalDivider, VerticalDivider } from "../components/ThinDivider";
import { routeTitles } from "./router";
import LoadingSpinner from "../components/LoadingSpinner";

const Layout: React.FC = () => {
  const { theme } = useSetTheme();
  const currentRoute = useLocation().pathname;
  const { state } = useNavigation();

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
          <div className="flex h-full items-center gap-4">
            <Link
              className="border-2 border-slate-500 bg-slate-300 px-4 py-0.5 text-slate-900 active:translate-y-px dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
              href="/"
            >
              Home
            </Link>
            <VerticalDivider />
            <Link
              className="border-2 border-slate-500 bg-slate-300 px-4 py-0.5 text-slate-900 active:translate-y-px dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
              href="/prompts"
            >
              Prompts
            </Link>
            <VerticalDivider />
            <Link
              className="border-2 border-slate-500 bg-slate-300 px-4 py-0.5 text-slate-900 active:translate-y-px dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
              href="/timeline"
            >
              Timeline
            </Link>
            <VerticalDivider />
            <Link
              className="border-2 border-slate-500 bg-slate-300 px-4 py-0.5 text-slate-900 active:translate-y-px dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
              href="/settings"
            >
              Settings
            </Link>
            <VerticalDivider />
            <section className="flex flex-col gap-1">
              <Link
                className="border-2 border-slate-500 bg-slate-300 px-4 text-slate-900 active:translate-y-px dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
                href="/login"
              >
                Login
              </Link>
              <Link
                className="border-2 border-slate-500 bg-slate-300 px-4 text-slate-900 active:translate-y-px dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
                href="/signup"
              >
                Signup
              </Link>
            </section>
          </div>
        </nav>
      </header>
      <main className="flex flex-1 flex-col px-2 py-2 dark:bg-slate-900">
        {state == "loading" && <LoadingSpinner />}

        {state == "idle" && (
          <>
            <Text variant="title" className="self-center">
              {routeTitles[currentRoute]}
            </Text>
            <HorizontalDivider />
            <Outlet />
          </>
        )}
      </main>
    </div>
  );
};

export default Layout;
