import About from "./components/files/About";
import Education from "./components/files/Education";
import Experience from "./components/files/Experience";
import Footer from "./components/files/Footer";
import Header from "./components/files/Header";
import Skills from "./components/files/Skills";


function App() {
  return (
    <>
      <Header />
      <main>
        <About />
        <Experience />
        <Education />
        <Skills />
      </main>
      <Footer />
    </>
  );
}

export default App;
