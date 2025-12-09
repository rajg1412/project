const validateSalesRecord = (record) => {
  const errors = [];

  if (!record.customerId) errors.push('Customer ID is required');
  if (!record.productId) errors.push('Product ID is required');
  if (record.quantity < 0) errors.push('Quantity cannot be negative');
  if (record.finalAmount < 0) errors.push('Final amount cannot be negative');

  return {
    isValid: errors.length === 0,
    errors
  };
};

const validateFilters = (filters) => {
  const errors = [];

  if (filters.minAge && filters.maxAge && filters.minAge > filters.maxAge) {
    errors.push('Minimum age cannot be greater than maximum age');
  }

  if (filters.startDate && filters.endDate) {
    const start = new Date(filters.startDate);
    const end = new Date(filters.endDate);
    if (start > end) {
      errors.push('Start date cannot be after end date');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
module.exports = {
  validateSalesRecord,
  validateFilters
};