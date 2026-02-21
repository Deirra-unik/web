import { useState, useEffect, type FC, type FormEvent } from "react";
import type { FormStatus } from "../types";

const FORMSPREE_URL: string = "https://formspree.io/f/xykdnwzn";
const MODAL_DELAY_MS: number = 60_000;

const inputCls =
  "w-full px-4 py-3 rounded-xl text-sm " +
  "bg-stone-50 dark:bg-neutral-900 " +
  "border border-stone-200 dark:border-neutral-700 " +
  "text-stone-900 dark:text-stone-100 " +
  "placeholder:text-stone-400 dark:placeholder:text-stone-600 " +
  "focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 " +
  "transition-colors duration-200";

const ContactForm: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(
      () => setIsOpen(true),
      MODAL_DELAY_MS
    );
    return () => clearTimeout(timer);
  }, []);

  const handleClose = (): void => {
    setIsOpen(false);
    setStatus("idle");
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      setTimeout(handleClose, 2500);
    } catch {
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-overlay-in"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 border border-stone-100 dark:border-neutral-800 rounded-3xl p-10 shadow-2xl animate-modal-in">
        <button
          onClick={handleClose}
          aria-label="Закрити"
          className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center
            bg-stone-100 dark:bg-neutral-800 text-stone-400 dark:text-stone-500
            hover:bg-amber-500 hover:text-white hover:rotate-90
            transition-all duration-200"
        >
          ✕
        </button>

        <div className="mb-7">
          <span className="block text-xs font-semibold tracking-[3px] uppercase text-amber-600 dark:text-amber-400 mb-2">
            Зворотній зв'язок
          </span>
          <h2
            id="modal-title"
            className="font-display font-bold text-3xl tracking-tight mb-1"
          >
            Напишіть мені!
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Я буду радий почути від вас 👋
          </p>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="w-16 h-16 rounded-full bg-amber-500 text-white text-3xl flex items-center justify-center animate-pop-in">
              ✓
            </div>
            <p className="font-medium text-stone-700 dark:text-stone-300">
              Повідомлення надіслано! Дякую.
            </p>
          </div>
        ) : (
          <form
            action={FORMSPREE_URL}
            method="POST"
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="cf-name"
                  className="text-xs font-semibold text-stone-700 dark:text-stone-300"
                >
                  Ім'я *
                </label>
                <input
                  id="cf-name"
                  type="text"
                  name="name"
                  placeholder="Ваше ім'я"
                  required
                  className={inputCls}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="cf-email"
                  className="text-xs font-semibold text-stone-700 dark:text-stone-300"
                >
                  Email *
                </label>
                <input
                  id="cf-email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  className={inputCls}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="cf-phone"
                className="text-xs font-semibold text-stone-700 dark:text-stone-300"
              >
                Номер телефону
              </label>
              <input
                id="cf-phone"
                type="tel"
                name="phone"
                placeholder="+380 XX XXX XX XX"
                className={inputCls}
              />
            </div>

            {/* Повідомлення */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="cf-message"
                className="text-xs font-semibold text-stone-700 dark:text-stone-300"
              >
                Повідомлення
              </label>
              <textarea
                id="cf-message"
                name="message"
                rows={4}
                placeholder="Ваше повідомлення..."
                className={`${inputCls} resize-y`}
              />
            </div>

            {status === "error" && (
              <p className="text-red-500 text-sm" role="alert">
                ⚠️ Помилка відправки. Спробуйте ще раз.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-1 py-3.5 rounded-full font-semibold text-sm text-white
                bg-amber-600 dark:bg-amber-500
                shadow-[0_6px_20px_rgba(180,83,9,0.35)]
                hover:bg-amber-700 dark:hover:bg-amber-400
                hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(180,83,9,0.45)]
                disabled:opacity-60 disabled:cursor-not-allowed
                transition-all duration-200"
            >
              {status === "sending" ? "Відправляємо..." : "Відправити →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
