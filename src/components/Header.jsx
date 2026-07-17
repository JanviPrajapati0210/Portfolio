import { useEffect, useState } from 'react';

const ROLES = ['AIML Student', 'Full-Stack Builder', 'Hackathon Participant'];

const STATS = [
  { value: '6+', label: 'Projects Built' },
  { value: '2+', label: 'Hackathons' },
  { value: '1', label: 'Internship' },
];

function Header({ name, themeColor }) {
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
          <span className="badge" style={{ borderColor: themeColor, color: themeColor }}>
            <span className="badge__dot" style={{ background: themeColor }} />
            Available for internships · Vadodara, India
          </span>

          <h1 className="header__name">
            <span className="header__name-solid">{firstName}</span>
            {lastName && (
              <span className="header__name-outline" style={{ WebkitTextStrokeColor: themeColor }}>
                {lastName}
              </span>
            )}
          </h1>

          <p className="header__role">
            <span className="header__cursor" style={{ borderColor: themeColor, color: themeColor }}>
              {ROLES[roleIndex]}
            </span>
          </p>

          <p className="header__tagline">
            <p className="header__tagline">
             Turning ideas into working AI products, one build at a time.
            </p>
          </p>

          <div className="header__actions">
            <a href="#projects" className="btn btn--solid" style={{ background: themeColor }}>
              See My Work ↓
            </a>
            <a href="#contact" className="btn btn--outline">
              Get In Touch
            </a>
          </div>
        </div>

        <div className="stat-panel">
          {STATS.map((s) => (
            <div key={s.label} className="stat-panel__item">
              <p className="stat-panel__value" style={{ color: themeColor }}>
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