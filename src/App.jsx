import "./App.css";

import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Footer from "./components/Footer";

function App() {

  const skills = [
    "Python",
    "C++",
    "React",
    "Machine Learning",
    "HTML",
    "CSS",
    "JavaScript"
  ];

  return (
    <div className="container">

      <Header
        name="Janvi Prajapati"
        themeColor="#F9D5E5"
      />

      <About />

      <Skills skillList={skills} />

      <Footer />

    </div>
  );
}

export default App;