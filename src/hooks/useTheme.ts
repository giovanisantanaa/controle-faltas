import { useEffect, useState } from "react";

export type Theme = "system" | "light" | "dark";

const STORAGE_KEY = "controle-faltas:theme";

function loadTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : "system";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(loadTheme);

  useEffect(() => {
    if (theme === "system") {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, theme);
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    function applyDark(isDark: boolean) {
      document.documentElement.classList.toggle("dark", isDark);
    }

    if (theme === "system") {
      applyDark(media.matches);

      function handleChange(event: MediaQueryListEvent) {
        applyDark(event.matches);
      }

      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }

    applyDark(theme === "dark");
  }, [theme]);

  return { theme, setTheme };
}
