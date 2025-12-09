export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  } catch {
    return dateString;
  }
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};