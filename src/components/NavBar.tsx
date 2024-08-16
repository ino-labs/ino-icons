import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import { useDarkMode } from '../contexts/DarkModeContext';
import iconSearch from '/assets/icons/ino-search.svg';
import iconMenuTwoBars from '/assets/icons/ino-menu-two-bars.svg';
import inoIconsLogo from '/ino-icons-logo.svg';
import iconSun from '/assets/icons/ino-sun.svg';
import iconMoon from '/assets/icons/ino-moon.svg';
import iconClose from '/assets/icons/ino-close.svg';

interface NavBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar: React.FC<NavBarProps> = ({ search, setSearch }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [icons, setIcons] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    fetch('/assets/icons.json')
      .then(response => response.json())
      .then(data => setIcons(data));
  }, []);

  useEffect(() => {
    if (search) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [search]);

  const filteredIcons = icons.filter(icon => icon.toLowerCase().includes(search.toLowerCase()));

  const highlightSearchTerm = (name: string, term: string) => {
    const parts = name.split(new RegExp(`(${term})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? <strong key={index}>{part}</strong> : part
    );
  };

  return (
    <nav>
      <div className="nav-first-content">
        <div className="nav-menu" onClick={toggleMenu}>
          <img width={24} height={24} src={iconMenuTwoBars} alt="" />
          {showMenu && (
            <div ref={menuRef} className="menu">
              <ul>
                <li><Link className='link-menu' to="/">Home</Link></li>
                <li><Link className='link-menu' to="/about">About</Link></li>
                <li><Link className='link-menu' to="https://github.com/n3pu/ino-icons" target="_blank" rel="noopener noreferrer">Github</Link></li>
                <li><Link className='link-menu' to="https://buymeacoffee.com/n3pu" target="_blank" rel="noopener noreferrer">Buy me a coffee</Link></li>
                <li><Link className='link-menu' to="https://www.paypal.com/donate/?business=CJPN8GQVW32UU&amount=5&no_recurring=0&item_name=Support+me+if+you+think+I%27ve+given+you+good+results&currency_code=USD" target="_blank" rel="noopener noreferrer">Donate</Link></li>
              </ul>
            </div>
          )}
        </div>
        <ul className='nav-title-container'>
          <li className='nav-title'>
            <Link to="/" className='nav-icon-name'>
              <img height={32} width={32} src={inoIconsLogo} alt="" />
              INO icons
            </Link>
            <span className='nav-icon-version'> v1</span>
          </li>
        </ul>
      </div>
      <div className="nav-second-content">
        <div className="search-container">
          <img height={24} width={24} src={iconSearch} alt="icon search" />
          <Search search={search} setSearch={setSearch} />
          {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <button className='close-popup' onClick={() => setShowPopup(false)}>
                <img height={24} width={24} src={iconClose} alt="Close Search" />
              </button>
              <ul>
                {filteredIcons.length > 0 ? (
                  filteredIcons.map((icon, index) => (
                    <li className='search-item' key={index}>
                      <Link to={`/icon/${icon}`}>
                        {highlightSearchTerm(icon, search)}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>No icon found =(</li>
                )}
              </ul>
            </div>
          </div>
        )}
        </div>
        <ul className='dark-donate-container'>
          <li><Link className='link' to="https://buymeacoffee.com/n3pu" target="_blank" rel="noopener noreferrer">Buy me a coffee</Link></li>
          <li>or</li>
          <li><Link className='link' to="https://www.paypal.com/donate/?business=CJPN8GQVW32UU&amount=5&no_recurring=0&item_name=Support+me+if+you+think+I%27ve+given+you+good+results&currency_code=USD" target="_blank" rel="noopener noreferrer">Donate</Link></li>
        </ul>
        <ul className='dark-mode-container'>
          <li className='dark-mode-container-link'><Link className='link' to="https://github.com/n3pu/ino-icons" target="_blank" rel="noopener noreferrer">Github</Link></li>
          <li className='dark-mode-container-link'><Link className='link' to="/about">About</Link></li>
          <li>
            <label className="toggleDarkLabel" arial-label="Toggle dark mode">
              <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
              <div className="toggleDarkIcon sun">
                <img height={16} width={16} src={iconSun} alt="" />
              </div>
              <div className="toggleDarkIcon moon">
                <img height={16} width={16} src={iconMoon} alt="" />
              </div>
            </label>
          </li>
        </ul>
      </div>
      
    </nav>
  );
};

export default NavBar;
