import React, { useState, useEffect } from 'react';
import IconCard from '../components/IconCard';
import NavBar from '../components/NavBar';
import FooterBar from '../components/FooterBar';

const Home: React.FC = () => {
  const [icons, setIcons] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/icons.json')
      .then(response => response.json())
      .then(data => setIcons(data));
  }, []);


  return (
    <div>
      <NavBar search={search} setSearch={setSearch} />
      <h1 className="text-center font-bold text-[32px] mt-10 mb-8">Awesome free SVG icons</h1>
      <div className='icons-list'>
        {icons.map(icon => (
          <IconCard key={icon} name={icon} />
        ))}
      </div>
      <FooterBar />
    </div>
  );
};

export default Home;
