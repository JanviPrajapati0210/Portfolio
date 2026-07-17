import NavBar from './components/NavBar';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';
import './App.css';

const SKILLS = [
  'React',
  'JavaScript',
  'Python',
  'FastAPI',
  'Flask',
  'MongoDB',
  'Firebase',
  'Gemini API',
  'Claude API',
  'Git & GitHub',
];

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Header name="Janvi Prajapati" themeColor="#2DD4BF" />
        <About />
        <Skills skillList={SKILLS} />
        <Projects />
      </main>
      <Footer />
    </>
  );
}

export default App;
