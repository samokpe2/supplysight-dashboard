export const calculateKPIs = (products = []) => {
    if (!products.length) {
      return {
        totalStock: 0,
        totalDemand: 0,
        fillRate: 0
      };
    }
  
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const totalDemand = products.reduce((sum, product) => sum + product.demand, 0);
    
    const totalFilled = products.reduce((sum, product) => 
      sum + Math.min(product.stock, product.demand), 0
    );
    
    const fillRate = totalDemand > 0 ? (totalFilled / totalDemand) * 100 : 0;
  
    return {
      totalStock,
      totalDemand,
      fillRate: Math.round(fillRate * 100) / 100 
    };
  };
  
  export const getProductStatus = (product) => {
    if (product.stock > product.demand) return 'Healthy';
    if (product.stock === product.demand) return 'Low';
    return 'Critical';
  };
  
  export const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };
  
  export const formatPercent = (num) => {
    return `${num.toFixed(1)}%`;
  };