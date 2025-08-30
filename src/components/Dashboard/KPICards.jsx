import React from 'react';
import { calculateKPIs, formatNumber, formatPercent } from '../../utils/calculations';
import LoadingSpinner from '../UI/LoadingSpinner';

const KPICard = ({ title, value, loading, icon }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="text-2xl">{icon}</div>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">
              {title}
            </dt>
            <dd className="text-lg font-medium text-gray-900">
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                value
              )}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

const KPICards = ({ products, loading }) => {
  const kpis = calculateKPIs(products);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      <KPICard
        title="Total Stock"
        value={formatNumber(kpis.totalStock)}
        loading={loading}
        icon="📦"
      />
      <KPICard
        title="Total Demand"
        value={formatNumber(kpis.totalDemand)}
        loading={loading}
        icon="📊"
      />
      <KPICard
        title="Fill Rate"
        value={formatPercent(kpis.fillRate)}
        loading={loading}
        icon="🎯"
      />
    </div>
  );
};

export default KPICards;