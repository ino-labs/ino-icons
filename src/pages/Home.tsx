import React, { useState, useEffect } from 'react';
import IconCard from '../components/IconCard';
import NavBar from '../components/NavBar';
import FooterBar from '../components/FooterBar';
import IconCounter from '../components/IconCounter';
import ToolBar from '../components/ToolBar';

interface Icon {
  id: number;
  name: string;
  title: string;
  keywords: string[];
}

const Home: React.FC = () => {
  const [icons, setIcons] = useState<Icon[]>([]);
  const [search, setSearch] = useState('');
  const [filteredIcons, setFilteredIcons] = useState<Icon[]>([]);

  useEffect(() => {
    fetch('/assets/icons-data.json')
      .then(response => response.json())
      .then(data => setIcons(data));
  }, []);


  return (
    <div>
      <NavBar />
      <h1 className="text-center font-bold text-[32px] mt-5 mb-4 md:mt-10 md:mb-8">Awesome <IconCounter /> free SVG icons</h1>
      <ToolBar search={search} setSearch={setSearch} setFilteredIcons={setFilteredIcons} />
      <div className='icons-list'>
        {filteredIcons.length > 0 ? (
          filteredIcons.map(icon => (
            <IconCard key={icon.id} name={icon.name} title={icon.title} keywords={icon.keywords} />
          ))
        ) : (
          <p>No icon found =(</p>
        )}
      </div>
      <FooterBar />
    </div>
  );
};

export default Home;
