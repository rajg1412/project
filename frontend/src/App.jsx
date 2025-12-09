import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SalesTable from './components/SalesTable';
import Pagination from './components/Pagination';
import SortDropdown from './components/SortDropdown';
import { fetchSalesData, fetchFilterOptions } from './services/api';

function App() {
  const [salesData, setSalesData] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [pagination, setPagination] = useState(null);

  const [filters, setFilters] = useState({
    customerRegion: [],
    gender: [],
    minAge: '',
    maxAge: '',
    productCategory: [],
    tags: [],
    paymentMethod: [],
    startDate: '',
    endDate: ''
  });

  // Load filter options once on mount
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const options = await fetchFilterOptions();
        setFilterOptions(options ?? null);
      } catch (err) {
        console.error('Failed to load filter options:', err);
      }
    };

    loadFilterOptions();
  }, []);

  // Load sales data whenever relevant parameters change
  useEffect(() => {
    const loadSalesData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchSalesData({
          page: currentPage,
          limit: 10,
          search: searchTerm,
          sortBy,
          sortOrder,
          filters
        });

        // handle absent or unexpected API response shape
        const { data = [], pagination: apiPagination = null } = result ?? {};
        setSalesData(Array.isArray(data) ? data : []);
        setPagination(apiPagination);
      } catch (err) {
        setError('Failed to load sales data. Please try again.');
        console.error('loadSalesData error:', err);
        setSalesData([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    };

    loadSalesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, currentPage, sortBy, sortOrder, JSON.stringify(filters)]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // smooth scroll to top of page (works in browsers)
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleClearFilters = () => {
    setFilters({
      customerRegion: [],
      gender: [],
      minAge: '',
      maxAge: '',
      productCategory: [],
      tags: [],
      paymentMethod: [],
      startDate: '',
      endDate: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Retail Sales Management System</h1>
        <p>TruEstate Assignment - Sales Dashboard</p>
      </header>

      <main className="app-main">
        <div className="controls-section">
          <SearchBar value={searchTerm} onChange={handleSearch} />

          <div className="controls-row" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <SortDropdown sortBy={sortBy} sortOrder={sortOrder} onChange={handleSortChange} />

            <button className="clear-btn" onClick={handleClearFilters}>
              Clear All Filters
            </button>
          </div>
        </div>

        <div className="content-section" style={{ display: 'flex', gap: 24 }}>
          <FilterPanel filters={filters} filterOptions={filterOptions} onChange={handleFilterChange} />

          <div className="table-section" style={{ flex: 1 }}>
            {error && <div className="error-message">{error}</div>}

            {loading ? (
              <div className="loading">Loading sales data...</div>
            ) : (
              <>
                <SalesTable data={salesData} />

                {pagination && (
                  <Pagination pagination={pagination} onPageChange={handlePageChange} />
                )}

                {salesData.length === 0 && !loading && (
                  <div className="no-results">No sales records found matching your criteria.</div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
