import React, { useState, useEffect } from 'react';
import IconCard from '../components/IconCard';

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
      <h1>{search ? `INO icons - ${search}` : 'Awesome free SVG icons'}</h1>
      <input
        type="text"
        placeholder="Search icons..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div>
        {filteredIcons.map(icon => (
          <IconCard key={icon} name={icon} />
        ))}
      </div>
    </div>
  );
};

export default Home;
