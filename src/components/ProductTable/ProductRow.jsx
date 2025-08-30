import React from 'react';
import { getProductStatus, formatNumber } from '../../utils/calculations';
import StatusPill from '../UI/StatusPill';

const ProductRow = ({ product, onClick }) => {
  const status = getProductStatus(product);
  const isCritical = status === 'Critical';

  return (
    <tr
      className={`cursor-pointer transition-colors ${
        isCritical 
          ? 'bg-red-50 hover:bg-red-100' 
          : 'hover:bg-gray-50'
      }`}
      onClick={() => onClick(product)}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{product.name}</div>
        <div className="text-sm text-gray-500">{product.id}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 font-mono">{product.sku}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{product.warehouse}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 font-semibold">
          {formatNumber(product.stock)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 font-semibold">
          {formatNumber(product.demand)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusPill status={status} />
      </td>
    </tr>
  );
};

export default ProductRow;