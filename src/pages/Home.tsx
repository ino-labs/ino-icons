import React, { useState, useEffect } from 'react';
import IconCard from '../components/IconCard';
import NavBar from '../components/NavBar';
import FooterBar from '../components/FooterBar';
import IconCounter from '../components/IconCounter';

const Home: React.FC = () => {
  const [icons, setIcons] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/assets/icons.json')
      .then(response => response.json())
      .then(data => setIcons(data));
  }, []);


  return (
    <div>
      <NavBar search={search} setSearch={setSearch} />
      <h1 className="text-center font-bold text-[32px] mt-5 mb-4 md:mt-10 md:mb-8">Awesome <IconCounter /> free SVG icons</h1>
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
