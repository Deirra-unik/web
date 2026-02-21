const Header: React.FC = () => {
  return (
    <header className="w-full bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold tracking-tight mb-1">Anton Hunderych</h1>
        <p className="text-lg text-green-400 font-medium mb-6">Node.js Developer</p>
        <nav>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300">
            <li>
              <a href="tel:+380665202928" className="hover:text-green-400 transition-colors">
                +380 66 520 29 28
              </a>
            </li>
            <li>
              <a href="mailto:toxa.gunderich@gmail.com" className="hover:text-green-400 transition-colors">
                toxa.gunderich@gmail.com
              </a>
            </li>
            <li>
              <a href="https://github.com/DeirraWS" target="_blank" rel="noreferrer" className="hover:text-green-400 transition-colors">
                github.com/DeirraWS
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/anton-hunderych" target="_blank" rel="noreferrer" className="hover:text-green-400 transition-colors">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://t.me/ToderHol" target="_blank" rel="noreferrer" className="hover:text-green-400 transition-colors">
                @ToderHol (Telegram)
              </a>
            </li>
            <li className="text-gray-500">Lviv, Ukraine</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
