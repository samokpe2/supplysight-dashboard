import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client/react';
import client from './graphql/client';
import Layout from './components/Layout/Layout';
import KPICards from './components/Dashboard/KPICards';
import StockChart from './components/Dashboard/StockChart';
import FiltersRow from './components/Dashboard/FiltersRow';
import ProductTable from './components/ProductTable/ProductTable';
import ProductDrawer from './components/ProductDrawer/ProductDrawer';
import { useProducts } from './hooks/useProducts';
import { useFilters } from './hooks/useFilters';

function AppContent() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dateRange, setDateRange] = useState('7d');
  
  const {
    filters,
    updateFilter,
    clearFilters
  } = useFilters();

  const {
    products,
    warehouses,
    kpis,
    loading,
    error,
    refetchProducts
  } = useProducts(filters, dateRange);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleDrawerClose = () => {
    setSelectedProduct(null); // Refresh data after mutations
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <Layout dateRange={dateRange} onDateRangeChange={setDateRange}>
      <div className="space-y-6">
        {/* KPI Cards */}
        <KPICards products={products} loading={loading} />

        {/* Stock Chart */}
        <StockChart kpis={kpis} loading={loading} />

        {/* Filters */}
        <FiltersRow
          filters={filters}
          warehouses={warehouses}
          onFilterChange={updateFilter}
          onClearFilters={clearFilters}
        />

        {/* Products Table */}
        <ProductTable
          products={products}
          loading={loading}
          onProductClick={handleProductClick}
        />

        {/* Product Drawer */}
        {selectedProduct && (
          <ProductDrawer
            product={selectedProduct}
            warehouses={warehouses}
            isOpen={!!selectedProduct}
            onClose={handleDrawerClose}
            refetchProducts={refetchProducts}
          />
        )}
      </div>
    </Layout>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <AppContent />
    </ApolloProvider>
  );
}

export default App;