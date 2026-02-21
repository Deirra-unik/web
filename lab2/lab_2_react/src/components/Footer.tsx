const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 text-sm">
      <div className="max-w-5xl mx-auto px-6 py-6 text-center">
        <p>
          &copy; Anton Hunderych &nbsp;|&nbsp;{" "}
          <a
            href="mailto:toxa.gunderich@gmail.com"
            className="text-green-400 hover:text-green-300 transition-colors"
          >
            toxa.gunderich@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
