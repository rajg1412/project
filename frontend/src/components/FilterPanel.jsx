import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

function FilterPanel({ filters, filterOptions, onChange }) {
  const [expandedSections, setExpandedSections] = useState({
    region: true,
    gender: true,
    age: true,
    category: true,
    tags: false,
    payment: false,
    date: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleMultiSelect = (field, value) => {
    const current = filters[field];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    
    onChange({ ...filters, [field]: updated });
  };

  const handleInputChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  if (!filterOptions) return <div className="filter-panel">Loading filters...</div>;

  return (
    <div className="filter-panel">
      <h2 className="filter-title">Filters</h2>

      <FilterSection
        title="Customer Region"
        isExpanded={expandedSections.region}
        onToggle={() => toggleSection('region')}
      >
        {filterOptions.customerRegions.map(region => (
          <label key={region} className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.customerRegion.includes(region)}
              onChange={() => handleMultiSelect('customerRegion', region)}
            />
            <span>{region}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection
        title="Gender"
        isExpanded={expandedSections.gender}
        onToggle={() => toggleSection('gender')}
      >
        {filterOptions.genders.map(gender => (
          <label key={gender} className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.gender.includes(gender)}
              onChange={() => handleMultiSelect('gender', gender)}
            />
            <span>{gender}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection
        title="Age Range"
        isExpanded={expandedSections.age}
        onToggle={() => toggleSection('age')}
      >
        <div className="age-range">
          <input
            type="number"
            placeholder="Min"
            value={filters.minAge}
            onChange={(e) => handleInputChange('minAge', e.target.value)}
            className="age-input"
            min={filterOptions.ageRange.min}
            max={filterOptions.ageRange.max}
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxAge}
            onChange={(e) => handleInputChange('maxAge', e.target.value)}
            className="age-input"
            min={filterOptions.ageRange.min}
            max={filterOptions.ageRange.max}
          />
        </div>
      </FilterSection>

      <FilterSection
        title="Product Category"
        isExpanded={expandedSections.category}
        onToggle={() => toggleSection('category')}
      >
        {filterOptions.productCategories.map(category => (
          <label key={category} className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.productCategory.includes(category)}
              onChange={() => handleMultiSelect('productCategory', category)}
            />
            <span>{category}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection
        title="Tags"
        isExpanded={expandedSections.tags}
        onToggle={() => toggleSection('tags')}
      >
        <div className="tags-container">
          {filterOptions.tags.map(tag => (
            <label key={tag} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.tags.includes(tag)}
                onChange={() => handleMultiSelect('tags', tag)}
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Payment Method"
        isExpanded={expandedSections.payment}
        onToggle={() => toggleSection('payment')}
      >
        {filterOptions.paymentMethods.map(method => (
          <label key={method} className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.paymentMethod.includes(method)}
              onChange={() => handleMultiSelect('paymentMethod', method)}
            />
            <span>{method}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection
        title="Date Range"
        isExpanded={expandedSections.date}
        onToggle={() => toggleSection('date')}
      >
        <div className="date-range">
          <label>
            Start Date
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              className="date-input"
            />
          </label>
          <label>
            End Date
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              className="date-input"
            />
          </label>
        </div>
      </FilterSection>
    </div>
  );
}

function FilterSection({ title, isExpanded, onToggle, children }) {
  return (
    <div className="filter-section">
      <button className="filter-section-header" onClick={onToggle}>
        <span>{title}</span>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isExpanded && (
        <div className="filter-section-content">
          {children}
        </div>
      )}
    </div>
  );
}

export default FilterPanel;
