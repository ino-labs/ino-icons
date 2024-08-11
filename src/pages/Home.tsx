import React, { useState, useEffect } from 'react';
import IconCard from '../components/IconCard';
import NavBar from '../components/NavBar';

const Home: React.FC = () => {
  const [icons, setIcons] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/icons.json')
      .then(response => response.json())
      .then(data => setIcons(data));
  }, []);

  const filteredIcons = icons.filter(icon => icon.includes(search));

  return (
    <div>
      <NavBar search={search} setSearch={setSearch} />
      <h1>{search ? `INO icons - ${search}` : 'Awesome free SVG icons'}</h1>
      <div className='icons-list'>
        {filteredIcons.map(icon => (
          <IconCard key={icon} name={icon} />
        ))}
      </div>
    </div>
  );
};

export default Home;
