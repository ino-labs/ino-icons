import React, { useState, useEffect } from 'react';
import Search from './Search';
import iconSearch from '/assets/icons/ino-search.svg';
import iconClose from '/assets/icons/ino-close.svg';

interface ToolBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setFilteredIcons: React.Dispatch<React.SetStateAction<Icon[]>>;
}

interface Icon {
  id: number;
  name: string;
  title: string;
  keywords: string[];
}

const ToolBar: React.FC<ToolBarProps> = ({ search, setSearch, setFilteredIcons }) => {
  const [icons, setIcons] = useState<Icon[]>([]);

  useEffect(() => {
    fetch('/assets/icons-data.json')
      .then(response => response.json())
      .then(data => setIcons(data));
  }, []);

  useEffect(() => {
    const filteredIcons = icons.filter(icon =>
      icon.keywords.some(keyword => keyword.toLowerCase().includes(search.toLowerCase()))
    );
    setFilteredIcons(filteredIcons);
  }, [search, icons, setFilteredIcons]);

  return (
    <div className="search-container">
      <img height={24} width={24} src={iconSearch} alt="icon search" />
      <Search search={search} setSearch={setSearch} />
      {search && (
        <button className="clear-search" onClick={() => setSearch('')}>
          <img height={24} width={24} src={iconClose} alt="Clear Search" />
        </button>
      )}
    </div>
  );
};

export default ToolBar;