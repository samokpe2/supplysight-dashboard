import React, { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { TRANSFER_STOCK } from '../../graphql/mutations';
import Button from '../UI/Button';

const TransferStockForm = ({ product, warehouses, onSuccess }) => {
  const [toWarehouse, setToWarehouse] = useState('');
  const [quantity, setQuantity] = useState('');
  
  const [transferStock, { loading, error }] = useMutation(TRANSFER_STOCK, {
    onCompleted: () => {
      setToWarehouse('');
      setQuantity('');
      onSuccess?.();
    },
    onError: (error) => {
      console.error('Error transferring stock:', error);
    }
  });

  const availableWarehouses = warehouses.filter(w => w.code !== product.warehouse);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const qty = parseInt(quantity);
    
    if (!toWarehouse) {
      alert('Please select a destination warehouse');
      return;
    }
    
    if (qty <= 0) {
      alert('Quantity must be greater than 0');
      return;
    }
    
    if (qty > product.stock) {
      alert('Cannot transfer more than available stock');
      return;
    }

    try {
      await transferStock({
        variables: {
          id: product.id,
          from: product.warehouse,
          to: toWarehouse,
          qty: qty
        }
      });
    } catch (err) {
      console.error('Transfer failed:', err);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="text-sm font-medium text-gray-900 mb-3">Transfer Stock</h4>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="toWarehouse" className="block text-sm font-medium text-gray-700">
            Destination Warehouse
          </label>
          <select
            id="toWarehouse"
            value={toWarehouse}
            onChange={(e) => setToWarehouse(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select warehouse...</option>
            {availableWarehouses.map((warehouse) => (
              <option key={warehouse.code} value={warehouse.code}>
                {warehouse.name} ({warehouse.code})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder={`Max: ${product.stock}`}
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Available stock: {product.stock}
          </p>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            Error: {error.message}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            type="submit"
            loading={loading}
            disabled={!toWarehouse || !quantity || parseInt(quantity) > product.stock}
            size="sm"
            className="flex-1"
          >
            Transfer Stock
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TransferStockForm;