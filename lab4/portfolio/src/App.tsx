import { useState, useEffect } from "react";
import type { Theme } from "./types";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Reviews from "./components/Reviews";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

function App(): JSX.Element {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const hour = new Date().getHours();
    setTheme(hour >= 7 && hour < 21 ? "light" : "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = (): void =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div className="min-h-screen flex flex-col bg-stone-100 dark:bg-neutral-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="flex-1">
        <Hero />
        <Reviews />
      </main>
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
