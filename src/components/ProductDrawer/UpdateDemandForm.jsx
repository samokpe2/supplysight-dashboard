import React, { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { UPDATE_DEMAND } from '../../graphql/mutations';
import Button from '../UI/Button';

const UpdateDemandForm = ({ product, onSuccess }) => {
  const [demand, setDemand] = useState(product.demand);
  const [updateDemand, { loading, error }] = useMutation(UPDATE_DEMAND, {
    onCompleted: () => {
      onSuccess?.();
    },
    onError: (error) => {
      console.error('Error updating demand:', error);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (demand < 0) {
      alert('Demand cannot be negative');
      return;
    }

    try {
      await updateDemand({
        variables: {
          id: product.id,
          demand: parseInt(demand)
        }
      });
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="text-sm font-medium text-gray-900 mb-3">Update Demand</h4>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="demand" className="block text-sm font-medium text-gray-700">
            New Demand
          </label>
          <input
            type="number"
            id="demand"
            min="0"
            value={demand}
            onChange={(e) => setDemand(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter new demand"
          />
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
            disabled={demand == product.demand}
            size="sm"
            className="flex-1"
          >
            Update Demand
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDemandForm;