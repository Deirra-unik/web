import { useEffect, useState, type FC } from "react";
import type { SystemInfo } from "../types";
import {
  collectAndSaveSystemInfo,
  loadSystemInfoFromStorage,
} from "../utils/systemInfo";

const Footer: FC = () => {
  const [sysInfo, setSysInfo] = useState<SystemInfo>({});
  useEffect(() => {
    collectAndSaveSystemInfo();
    setSysInfo(loadSystemInfoFromStorage());
  }, []);

  return (
    <footer
      id="footer"
      className="bg-stone-900 dark:bg-black text-stone-100 py-16 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-12 pb-10 border-b border-white/10">
          <div>
            <span className="font-display font-black text-3xl block mb-1">
              Antony<span className="text-amber-500">.</span>
            </span>
            <p className="text-sm text-stone-500">Веб-розробник · Студент</p>
          </div>
          <nav className="flex gap-8">
            <a
              href="#about"
              className="text-sm text-stone-500 hover:text-amber-400 transition-colors"
            >
              Про мене
            </a>
            <a
              href="#reviews"
              className="text-sm text-stone-500 hover:text-amber-400 transition-colors"
            >
              Відгуки
            </a>
          </nav>
        </div>

        <div className="mb-12">
          <h3 className="font-display font-semibold text-lg text-stone-300 mb-6">
            🖥 Системна інформація{" "}
            <span className="text-stone-600 text-sm font-sans font-normal">
              (з localStorage)
            </span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Object.entries(sysInfo).map(([key, value]) => (
              <div
                key={key}
                className="bg-white/5 border border-white/[0.07] rounded-xl px-4 py-3 flex flex-col gap-1"
              >
                <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-stone-500">
                  {key}
                </span>
                <span className="text-sm text-stone-300 break-all leading-snug">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 text-center text-xs text-stone-600">
          © {new Date().getFullYear()} Гундерич Антон. Всі права захищені.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
