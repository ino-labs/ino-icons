import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

interface NavBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar: React.FC<NavBarProps> = ({ search, setSearch }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saveMode = localStorage.getItem('darkmode');
    return saveMode ? JSON.parse(saveMode) : false;
  });
  useEffect(() => {
    document.body.classList.toggle('dark-mode', !darkMode);
  }, [darkMode])
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', JSON.stringify(!darkMode))
  };
  return (
    <nav>
      <h1>Icon Finder</h1>
      <Search search={search} setSearch={setSearch} />
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
    </nav>
  );
};

export default NavBar;
