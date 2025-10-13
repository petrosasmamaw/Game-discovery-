import React from 'react';

const SearchBar = ({ setSearchTerm, value = "" }) => (
  <div className="searchbar">
    <input
      className="searchbar__input"
      type="text"
      placeholder="Search games..."
      value={value}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
);

export default SearchBar;
