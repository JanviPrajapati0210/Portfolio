import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ROLES = ['AIML Student', 'Full-Stack Builder', 'Hackathon Participant'];

const STATS = [
  { value: '6+', label: 'Projects Built' },
  { value: '2+', label: 'Hackathons' },
  { value: '1', label: 'Internship' },
];

function Header({ name }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [firstName, ...rest] = name.trim().split(' ');
  const lastName = rest.join(' ');

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <header id="Home" className="header">
      <div className="header__grid">
        <div>
          <span className="badge" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
            <span className="badge__dot" style={{ background: 'var(--accent)' }} />
            Available for internships · Vadodara, India
          </span>

          <h1 className="header__name">
            <span className="header__name-solid">{firstName}</span>
            {lastName && (
              <span className="header__name-outline" style={{ WebkitTextStrokeColor: 'var(--accent)' }}>
                {lastName}
              </span>
            )}
          </h1>

          <p className="header__role-static">
            <strong style={{ color: 'var(--accent)' }}>AIML Engineer</strong>
            <span className="divider">·</span>
            Web Developer
            <span className="divider">·</span>
            Designer
          </p>

          <p className="header__tagline">
             Turning ideas into working AI products, one build at a time.
          </p>

          <div className="header__actions">
            <Link to="/projects" className="btn btn--solid" style={{ background: 'var(--accent)' }}>
              See My Work ↓
            </Link>
            <Link to="/contact" className="btn btn--outline">
              Get In Touch
            </Link>
          </div>

          <p className="header__scroll-cue">Scroll to explore</p>
        </div>

        <div className="stat-panel">
          {STATS.map((s) => (
            <div key={s.label} className="stat-panel__item">
              <p className="stat-panel__value" style={{ color: 'var(--accent)' }}>
                {s.value}
              </p>
              <p className="stat-panel__label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;