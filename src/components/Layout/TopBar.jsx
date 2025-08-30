import React from 'react';
import { DATE_RANGES } from '../../utils/constants';

const TopBar = ({ dateRange, onDateRangeChange }) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">

          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              <span className="text-blue-600">Supply</span>Sight
            </h1>
          </div>


          <div className="flex space-x-2">
            {DATE_RANGES.map((range) => (
              <button
                key={range.value}
                onClick={() => onDateRangeChange(range.value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  dateRange === range.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;