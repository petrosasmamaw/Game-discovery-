import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [dark, setDark] = useState(false);

  React.useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <div className="navbar__brand">🎮 Game Reviews</div>
        <div className="navbar__links">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/favorites">Favorites</Link>
          <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle dark mode">
            {dark ? '🌞' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
