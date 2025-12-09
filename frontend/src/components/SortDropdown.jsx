import React from 'react';
import { ArrowUpDown } from 'lucide-react';

function SortDropdown({ sortBy, sortOrder, onChange }) {
  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'quantity', label: 'Quantity' },
    { value: 'customerName', label: 'Customer Name' }
  ];

  const handleSortChange = (e) => {
    onChange(e.target.value, sortOrder);
  };

  const handleOrderChange = () => {
    onChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="sort-dropdown">
      <label className="sort-label">
        <ArrowUpDown size={16} />
        Sort by:
      </label>
      
      <select 
        value={sortBy}
        onChange={handleSortChange}
        className="sort-select"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        className="sort-order-btn"
        onClick={handleOrderChange}
        title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
      >
        {sortOrder === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
}

export default SortDropdown;