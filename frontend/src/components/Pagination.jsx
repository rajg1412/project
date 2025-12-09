import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ pagination, onPageChange }) {
  const { currentPage, totalPages, totalRecords, hasNext, hasPrevious } = pagination;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="pagination">
      <div className="pagination-info">
        Showing page {currentPage} of {totalPages} ({totalRecords} total records)
      </div>
      
      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevious}
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <div className="pagination-numbers">
          {currentPage > 3 && (
            <>
              <button
                className="pagination-number"
                onClick={() => onPageChange(1)}
              >
                1
              </button>
              {currentPage > 4 && <span className="pagination-ellipsis">...</span>}
            </>
          )}

          {getPageNumbers().map(page => (
            <button
              key={page}
              className={`pagination-number ${page === currentPage ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}

          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && <span className="pagination-ellipsis">...</span>}
              <button
                className="pagination-number"
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
