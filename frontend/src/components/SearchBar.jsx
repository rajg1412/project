import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

function SearchBar({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  return (
    <div className="search-bar">
      <Search size={20} className="search-icon" />
      <input
        type="text"
        placeholder="Search by customer name or phone number..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
