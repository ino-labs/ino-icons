import React, { useState } from 'react';
import NavBar from '../components/NavBar';

const About: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <div>
      <NavBar search={search} setSearch={setSearch} />
      <h1>About</h1>
      <p>This is an awesome collection of free SVG icons.</p>
    </div>
  );
};

export default About;
