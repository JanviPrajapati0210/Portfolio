import { useEffect, useState } from 'react';

const SECTIONS = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

function NavBar() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      let current = 'home';
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          current = id;
        }
      }
      setActive(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <span className="navbar__brand">JV_</span>
      <ul className="navbar__links">
        {SECTIONS.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={active === id ? 'navbar__link navbar__link--active' : 'navbar__link'}
            >
              {String(SECTIONS.indexOf(id) + 1).padStart(2, '0')}. {id}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
