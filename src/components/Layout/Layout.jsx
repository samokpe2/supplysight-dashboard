import React from 'react';
import TopBar from './TopBar';

const Layout = ({ children, dateRange, onDateRangeChange }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar dateRange={dateRange} onDateRangeChange={onDateRangeChange} />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;