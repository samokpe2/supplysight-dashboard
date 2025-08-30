import { useState } from 'react';

export const useFilters = () => {
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    warehouse: ''
  });

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: 'All',
      warehouse: ''
    });
  };

  return {
    filters,
    updateFilter,
    clearFilters
  };
};