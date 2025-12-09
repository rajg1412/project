import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchSalesData = async ({ page, limit, search, sortBy, sortOrder, filters }) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
    sortBy,
    sortOrder
  });

  if (filters.customerRegion.length > 0) {
    params.append('customerRegion', filters.customerRegion.join(','));
  }
  if (filters.gender.length > 0) {
    params.append('gender', filters.gender.join(','));
  }
  if (filters.minAge) {
    params.append('minAge', filters.minAge);
  }
  if (filters.maxAge) {
    params.append('maxAge', filters.maxAge);
  }
  if (filters.productCategory.length > 0) {
    params.append('productCategory', filters.productCategory.join(','));
  }
  if (filters.tags.length > 0) {
    params.append('tags', filters.tags.join(','));
  }
  if (filters.paymentMethod.length > 0) {
    params.append('paymentMethod', filters.paymentMethod.join(','));
  }
  if (filters.startDate) {
    params.append('startDate', filters.startDate);
  }
  if (filters.endDate) {
    params.append('endDate', filters.endDate);
  }

  const response = await api.get(`/sales?${params.toString()}`);
  return response.data;
};

export const fetchFilterOptions = async () => {
  const response = await api.get('/sales/filters');
  return response.data;
};

export default api;