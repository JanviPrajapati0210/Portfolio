import { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { type: 'route', path: '/', label: 'Home' },
  { type: 'hash', id: 'about', label: 'About' },
  { type: 'hash', id: 'skills', label: 'Skills' },
  { type: 'route', path: '/projects', label: 'Projects' },
  { type: 'route', path: '/contact', label: 'Contact' },
];

function NavBar() {
  const [isLight, setIsLight] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('light', isLight);
  }, [isLight]);

  const goToSection = (id) => {
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        JV_
      </Link>

      <ul className="navbar__links">
        {NAV_ITEMS.map((item, index) => {
          const number = String(index + 1).padStart(2, '0');

          if (item.type === 'route') {
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
                  }
                >
                  {number}. {item.label}
                </NavLink>
              </li>
            );
          }

          const isActiveHash = location.pathname === '/' && location.hash === `#${item.id}`;

          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => goToSection(item.id)}
                className={isActiveHash ? 'navbar__link navbar__link--active' : 'navbar__link'}
              >
                {number}. {item.label}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        className="navbar__toggle"
        onClick={() => setIsLight((prev) => !prev)}
        aria-label="Toggle light and dark mode"
      >
        {isLight ? 'Dark mode' : 'Light mode'}
      </button>
    </nav>
  );
}

export default NavBar;