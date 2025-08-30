import { useQuery } from '@apollo/client/react';
import { GET_PRODUCTS, GET_WAREHOUSES, GET_KPIS } from '../graphql/queries';

export const useProducts = (filters = {}, dateRange = '7d') => {
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
    refetch: refetchProducts
  } = useQuery(GET_PRODUCTS, {
    variables: {
      search: filters.search || '',
      status: filters.status || 'All',
      warehouse: filters.warehouse || ''
    },
    fetchPolicy: 'cache-and-network'
  });

  const {
    data: warehousesData,
    loading: warehousesLoading,
    error: warehousesError
  } = useQuery(GET_WAREHOUSES, {
    fetchPolicy: 'cache-first'
  });

  const {
    data: kpisData,
    loading: kpisLoading,
    error: kpisError
  } = useQuery(GET_KPIS, {
    variables: { range: dateRange },
    fetchPolicy: 'cache-and-network'
  });

  const products = productsData?.products || [];
  const warehouses = warehousesData?.warehouses || [];
  const kpis = kpisData?.kpis || [];

  const loading = productsLoading || warehousesLoading || kpisLoading;
  const error = productsError || warehousesError || kpisError;

  return {
    products,
    warehouses,
    kpis,
    loading,
    error,
    refetchProducts
  };
};