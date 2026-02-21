import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Skills from "./components/Skills";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col w-full">
      <Header />
      <main className="flex-1 w-full mx-auto px-6 py-4">
        <About />
        <Experience />
        <Education />
        <Skills />
      </main>
      <Footer />
    </div>
  );
};

export default App;
