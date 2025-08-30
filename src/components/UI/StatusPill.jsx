import React from 'react';
import { STATUS_COLORS, STATUS_ICONS } from '../../utils/constants';

const StatusPill = ({ status }) => {
  const colorClass = STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';
  const icon = STATUS_ICONS[status] || '';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      <span className="mr-1">{icon}</span>
      {status}
    </span>
  );
};

export default StatusPill;