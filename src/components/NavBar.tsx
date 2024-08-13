import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import { useDarkMode } from '../contexts/DarkModeContext';
import iconSearch from '../../icons/ino-search.svg';
import iconMenuTwoBars from '../../icons/ino-menu-two-bars.svg';
import inoIconsLogo from '/ino-icons-logo.svg';
import iconSun from '../../icons/ino-sun.svg';
import iconMoon from '../../icons/ino-moon.svg';

interface NavBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar: React.FC<NavBarProps> = ({ search, setSearch }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav>
      <div className="nav-menu">
        <img src={iconMenuTwoBars} alt="" />
      </div>
      <ul>
        <li className='nav-title'>
          <Link to="/" className='nav-icon-name'>
            <img src={inoIconsLogo} alt="" />
            INO icons
          </Link>
          <span className='nav-icon-version'> v1</span>
        </li>
      </ul>
      <div className="search-container">
        <img src={iconSearch} alt="" />
        <Search search={search} setSearch={setSearch} />
      </div>
      <ul className='dark-donate-container'>
        <li><Link className='link' to="https://github.com/n3pu/ino-icons" target="_blank" rel="noopener noreferrer">Buy me a coffee</Link></li>
        <li>or</li>
        <li><Link className='link' to="/about">Donate</Link></li>
      </ul>
      <ul className='dark-mode-container'>
        <li><Link className='link' to="https://github.com/n3pu/ino-icons" target="_blank" rel="noopener noreferrer">Github</Link></li>
        <li><Link className='link' to="/about">About</Link></li>
        <li>
          <label className="toggleDarkLabel" arial-label="Toggle dark mode">
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
            <div className="toggleDarkIcon sun">
              <img src={iconSun} alt="" />
            </div>
            <div className="toggleDarkIcon moon">
              <img src={iconMoon} alt="" />
            </div>
          </label>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
