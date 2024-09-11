import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface UseSetThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
  resetTheme: () => void;
}

const useSetTheme = (): UseSetThemeReturn => {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const localTheme = localStorage.getItem("theme") as Theme;

    if (localTheme) {
      setTheme(localTheme);
    } else {
      setTheme(systemTheme);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      window.location.reload();
      return newTheme;
    });
  };

  const resetTheme = () => {
    setTheme("system");
    localStorage.removeItem("theme");
    window.location.reload();
  };

  return { theme, toggleTheme, resetTheme };
};

export default useSetTheme;
