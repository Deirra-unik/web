import type { FC } from "react";

const Hero: FC = () => (
  <section
    id="about"
    className="relative min-h-[90vh] flex items-center overflow-hidden"
  >
    <div className="absolute -top-24 -right-36 w-[560px] h-[560px] rounded-full bg-amber-500 opacity-[0.07] blur-[80px] animate-blob pointer-events-none" />
    <div className="absolute -bottom-10 -left-16 w-72 h-72 rounded-full bg-amber-500 opacity-[0.05] blur-[80px] animate-blob [animation-direction:reverse] pointer-events-none" />

    <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">
      <span className="inline-block text-xs font-semibold tracking-[3px] uppercase text-amber-600 dark:text-amber-400 mb-5">
        Розробник · Студент · Ентузіаст
      </span>

      <h1
        className="font-display font-black leading-none tracking-tight mb-8"
        style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
      >
        Привіт, я
        <em className="block not-italic text-amber-600 dark:text-amber-400">
          Гундерич Антон
        </em>
      </h1>

      <p className="text-lg text-stone-500 dark:text-stone-400 leading-relaxed max-w-xl mb-12">
        Студент факультету комп'ютерних наук. Захоплений веб-розробкою,
        сучасними технологіями та чистим кодом.
      </p>

      <a
        href="#reviews"
        className="inline-flex items-center gap-3 px-8 py-4 rounded-full
          bg-amber-600 dark:bg-amber-500 text-white font-semibold text-sm
          shadow-[0_6px_24px_rgba(180,83,9,0.35)]
          hover:bg-amber-700 dark:hover:bg-amber-400
          hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(180,83,9,0.45)]
          transition-all duration-300 group"
      >
        Переглянути відгуки
        <span className="group-hover:translate-x-1.5 transition-transform duration-300">
          →
        </span>
      </a>
    </div>
  </section>
);

export default Hero;
