import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';


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

function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  }, [hash]);

  return (
    <>
      <Header name="Janvi Prajapati" themeColor="var(--accent)" />
      <About />
      <Skills skillList={SKILLS} />
       <Projects />
    </>
  );
}

export default Home;