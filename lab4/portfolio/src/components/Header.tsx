import type { FC } from "react";
import type { Theme } from "../types";

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { href: "#about", label: "Про мене" },
  { href: "#reviews", label: "Відгуки" },
  { href: "#footer", label: "Контакти" },
];

const Header: FC<HeaderProps> = ({ theme, onToggleTheme }) => (
  <header className="sticky top-0 z-50 bg-stone-100/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-stone-200 dark:border-neutral-800 transition-colors duration-300">
    <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-8">
      <a
        href="#top"
        className="font-display text-2xl font-black tracking-tight flex-1"
      >
        Antony<span className="text-amber-600 dark:text-amber-400">.</span>
      </a>

      <nav className="hidden sm:flex gap-8">
        {NAV_LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        onClick={onToggleTheme}
        aria-label="Перемкнути тему"
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
          bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700
          text-stone-700 dark:text-stone-300 shadow-sm
          hover:bg-amber-600 hover:text-white hover:border-amber-600
          dark:hover:bg-amber-500 dark:hover:border-amber-500
          transition-all duration-200"
      >
        <span>{theme === "light" ? "🌙" : "☀️"}</span>
        <span className="hidden sm:inline">
          {theme === "light" ? "Нічний" : "Денний"}
        </span>
      </button>
    </div>
  </header>
);

export default Header;
