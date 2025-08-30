export const STATUS_OPTIONS = [
    { value: 'All', label: 'All Status' },
    { value: 'Healthy', label: 'Healthy' },
    { value: 'Low', label: 'Low' },
    { value: 'Critical', label: 'Critical' }
  ];
  
  export const DATE_RANGES = [
    { value: '7d', label: '7 Days' },
    { value: '14d', label: '14 Days' },
    { value: '30d', label: '30 Days' }
  ];
  
  export const ITEMS_PER_PAGE = 10;
  
  export const STATUS_COLORS = {
    Healthy: 'bg-green-100 text-green-800',
    Low: 'bg-yellow-100 text-yellow-800',
    Critical: 'bg-red-100 text-red-800'
  };
  
  export const STATUS_ICONS = {
    Healthy: '🟢',
    Low: '🟡',
    Critical: '🔴'
  };