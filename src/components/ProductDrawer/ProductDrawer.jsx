import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getProductStatus, formatNumber } from '../../utils/calculations';
import StatusPill from '../UI/StatusPill';
import UpdateDemandForm from './UpdateDemandForm';
import TransferStockForm from './TransferStockForm';

const ProductDrawer = ({ product, warehouses, isOpen, onClose, refetchProducts }) => {
  const status = getProductStatus(product);
  
  if (!isOpen) return null;

  return (
    <>
      {/* Transparent backdrop (click outside to close) */}
      <div 
        className="fixed inset-0 bg-transparent z-40"
        onClick={onClose}
      />

      {/* Drawer with slide animation */}
      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex z-50">
        <div
          className={`
            w-screen max-w-md transform transition-transform duration-300 ease-out
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
            {/* Header */}
            <div className="px-4 py-6 bg-gray-50 sm:px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Product Details</h2>
                <button
                  onClick={onClose}
                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-4 py-6 sm:px-6 space-y-6">
              {/* Product Info */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">{product.name}</h3>
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Product ID</dt>
                    <dd className="mt-1 text-sm text-gray-900">{product.id}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">SKU</dt>
                    <dd className="mt-1 text-sm text-gray-900 font-mono">{product.sku}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Warehouse</dt>
                    <dd className="mt-1 text-sm text-gray-900">{product.warehouse}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="mt-1">
                      <StatusPill status={status} />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Current Stock</dt>
                    <dd className="mt-1 text-lg font-semibold text-gray-900">
                      {formatNumber(product.stock)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Current Demand</dt>
                    <dd className="mt-1 text-lg font-semibold text-gray-900">
                      {formatNumber(product.demand)}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Analysis */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Analysis</h4>
                <div className="text-sm text-blue-800">
                  {status === 'Healthy' && (
                    <p>✅ Stock levels are healthy. Current stock exceeds demand by {formatNumber(product.stock - product.demand)} units.</p>
                  )}
                  {status === 'Low' && (
                    <p>⚠️ Stock levels match demand exactly. Consider restocking to maintain buffer inventory.</p>
                  )}
                  {status === 'Critical' && (
                    <p>🚨 Critical stock shortage! Demand exceeds stock by {formatNumber(product.demand - product.stock)} units. Immediate action required.</p>
                  )}
                </div>
              </div>

              {/* Forms */}
              <UpdateDemandForm product={product} onSuccess={() => {onClose();  refetchProducts();}} />
              <TransferStockForm product={product} warehouses={warehouses} onSuccess={() => {onClose();  refetchProducts();}}  />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDrawer;
