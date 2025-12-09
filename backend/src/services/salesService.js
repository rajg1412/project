// backend/src/services/salesService.js
const csvParser = require('../utils/csvParser');
const _ = require('lodash');
const { parseISO, isWithinInterval } = require('date-fns');

let salesData = [];
let filterOptions = null;

const initializeData = async () => {
  if (salesData.length === 0) {
    salesData = await csvParser.loadSalesData();
    filterOptions = extractFilterOptions(salesData);
  }
};

const extractFilterOptions = (data) => {
  const regions = new Set();
  const genders = new Set();
  const categories = new Set();
  const allTags = new Set();
  const paymentMethods = new Set();
  let minAge = Infinity;
  let maxAge = -Infinity;

  data.forEach(record => {
    if (record.customerRegion) regions.add(record.customerRegion);
    if (record.gender) genders.add(record.gender);
    if (record.productCategory) categories.add(record.productCategory);
    if (record.tags) {
      record.tags.split(',').forEach(tag => allTags.add(tag.trim()));
    }
    if (record.paymentMethod) paymentMethods.add(record.paymentMethod);
    if (record.age) {
      minAge = Math.min(minAge, record.age);
      maxAge = Math.max(maxAge, record.age);
    }
  });

  return {
    customerRegions: Array.from(regions).sort(),
    genders: Array.from(genders).sort(),
    productCategories: Array.from(categories).sort(),
    tags: Array.from(allTags).sort(),
    paymentMethods: Array.from(paymentMethods).sort(),
    ageRange: { min: minAge, max: maxAge }
  };
};

const applySearch = (data, searchTerm) => {
  if (!searchTerm) return data;
  
  const search = searchTerm.toLowerCase();
  return data.filter(record => {
    const nameMatch = record.customerName?.toLowerCase().includes(search);
    const phoneMatch = record.phoneNumber?.toLowerCase().includes(search);
    return nameMatch || phoneMatch;
  });
};

const applyFilters = (data, filters) => {
  let filtered = [...data];

  if (filters.customerRegion?.length > 0) {
    filtered = filtered.filter(r => 
      filters.customerRegion.includes(r.customerRegion)
    );
  }

  if (filters.gender?.length > 0) {
    filtered = filtered.filter(r => 
      filters.gender.includes(r.gender)
    );
  }

  if (filters.minAge !== null || filters.maxAge !== null) {
    filtered = filtered.filter(r => {
      const age = r.age;
      if (filters.minAge !== null && age < filters.minAge) return false;
      if (filters.maxAge !== null && age > filters.maxAge) return false;
      return true;
    });
  }

  if (filters.productCategory?.length > 0) {
    filtered = filtered.filter(r => 
      filters.productCategory.includes(r.productCategory)
    );
  }

  if (filters.tags?.length > 0) {
    filtered = filtered.filter(r => {
      const recordTags = r.tags ? r.tags.split(',').map(t => t.trim()) : [];
      return filters.tags.some(tag => recordTags.includes(tag));
    });
  }

  if (filters.paymentMethod?.length > 0) {
    filtered = filtered.filter(r => 
      filters.paymentMethod.includes(r.paymentMethod)
    );
  }

  if (filters.startDate || filters.endDate) {
    filtered = filtered.filter(r => {
      try {
        const recordDate = parseISO(r.date);
        const start = filters.startDate ? parseISO(filters.startDate) : new Date(0);
        const end = filters.endDate ? parseISO(filters.endDate) : new Date();
        return isWithinInterval(recordDate, { start, end });
      } catch {
        return false;
      }
    });
  }

  return filtered;
};

const applySorting = (data, sortBy, sortOrder) => {
  const sorted = _.orderBy(
    data,
    [record => {
      if (sortBy === 'date') {
        return new Date(record.date);
      } else if (sortBy === 'quantity') {
        return record.quantity;
      } else if (sortBy === 'customerName') {
        return record.customerName?.toLowerCase();
      }
      return record[sortBy];
    }],
    [sortOrder]
  );
  
  return sorted;
};

const applyPagination = (data, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    data: data.slice(startIndex, endIndex),
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(data.length / limit),
      totalRecords: data.length,
      hasNext: endIndex < data.length,
      hasPrevious: page > 1
    }
  };
};

const getFilteredSalesData = async ({ page, limit, search, sortBy, sortOrder, filters }) => {
  await initializeData();

  let result = salesData;
  result = applySearch(result, search);
  result = applyFilters(result, filters);
  result = applySorting(result, sortBy, sortOrder);
  
  return applyPagination(result, page, limit);
};

const getFilterOptions = async () => {
  await initializeData();
  return filterOptions;
};

module.exports = {
  getFilteredSalesData,
  getFilterOptions
};