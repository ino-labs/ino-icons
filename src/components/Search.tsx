import React from 'react';

interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ search, setSearch }) => {
  return (
    <input
      className='search-icons'
      type="text"
      placeholder="Search icons..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  );
};

export default Search;
