import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import LoadingSpinner from '../UI/LoadingSpinner';

const StockChart = ({ kpis, loading }) => {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Stock vs Demand Trend</h3>
        <div className="h-80 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }
  
  const chartData = kpis.map(kpi => ({
    ...kpi,
    formattedDate: format(new Date(kpi.date), 'MMM dd')
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Stock vs Demand Trend</h3>
      
      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="formattedDate" 
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            labelFormatter={(value, payload) => {
              if (payload && payload[0]) {
                return format(new Date(payload[0].payload.date), 'MMMM dd, yyyy');
              }
              return value;
            }}
            formatter={(value, name) => [value.toLocaleString(), name]}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="stock" 
            stroke="#3B82F6" 
            strokeWidth={2}
            name="Stock"
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="demand" 
            stroke="#EF4444" 
            strokeWidth={2}
            name="Demand"
            dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;