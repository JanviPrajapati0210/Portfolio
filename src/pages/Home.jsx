import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';

const SKILLS = [
  'React',
  'JavaScript',
  'Python',
  'FastAPI',
  'Flask',
  'MongoDB',
  'Firebase'
];

function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <>
      <Header name="Janvi Prajapati" themeColor="var(--accent)" />
      <About />
      <Skills skillList={SKILLS} />
    </>
  );
}

export default Home;