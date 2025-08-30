import { ApolloClient, InMemoryCache, ApolloLink, Observable } from '@apollo/client';


const mockProducts = [
  { id: "P-1001", name: "12mm Hex Bolt", sku: "HEX-12-100", warehouse: "BLR-A", stock: 180, demand: 120 },
  { id: "P-1002", name: "Steel Washer", sku: "WSR-08-500", warehouse: "BLR-A", stock: 50, demand: 80 },
  { id: "P-1003", name: "M8 Nut", sku: "NUT-08-200", warehouse: "PNQ-C", stock: 80, demand: 80 },
  { id: "P-1004", name: "Bearing 608ZZ", sku: "BRG-608-50", warehouse: "DEL-B", stock: 24, demand: 120 },
  { id: "P-1005", name: "Socket Screw", sku: "SCW-06-300", warehouse: "BLR-A", stock: 200, demand: 150 },
  { id: "P-1006", name: "Spring Lock", sku: "SPR-10-100", warehouse: "PNQ-C", stock: 75, demand: 90 },
  { id: "P-1007", name: "Flat Head Screw", sku: "FHS-04-500", warehouse: "DEL-B", stock: 300, demand: 200 },
  { id: "P-1008", name: "Lock Nut", sku: "LCK-12-150", warehouse: "BLR-A", stock: 45, demand: 60 },
  { id: "P-1009", name: "Aluminum Rivet", sku: "RVT-05-200", warehouse: "MUM-D", stock: 500, demand: 450 },
  { id: "P-1010", name: "Brass Spacer", sku: "SPC-03-100", warehouse: "BLR-A", stock: 120, demand: 140 },
  { id: "P-1011", name: "Stainless Steel Rod", sku: "ROD-16-50", warehouse: "PNQ-C", stock: 40, demand: 35 },
  { id: "P-1012", name: "Copper Wire Roll", sku: "CWR-01-10", warehouse: "DEL-B", stock: 18, demand: 25 },
  { id: "P-1013", name: "Zinc Plated Nail", sku: "NAIL-02-1000", warehouse: "BLR-A", stock: 950, demand: 800 },
  { id: "P-1014", name: "Heavy Duty Clamp", sku: "CLP-20-25", warehouse: "MUM-D", stock: 22, demand: 40 },
  { id: "P-1015", name: "Aluminum Sheet", sku: "ALS-01-50", warehouse: "HYD-E", stock: 60, demand: 55 },
  { id: "P-1016", name: "PVC Pipe 2in", sku: "PVC-02-30", warehouse: "DEL-B", stock: 25, demand: 50 },
  { id: "P-1017", name: "Rubber Gasket", sku: "GST-04-200", warehouse: "PNQ-C", stock: 300, demand: 250 },
  { id: "P-1018", name: "Brass Nut", sku: "BNT-06-150", warehouse: "BLR-A", stock: 75, demand: 120 },
  { id: "P-1019", name: "M12 Bolt", sku: "BLT-12-300", warehouse: "MUM-D", stock: 260, demand: 240 },
  { id: "P-1020", name: "Carbon Steel Plate", sku: "CSP-10-20", warehouse: "HYD-E", stock: 15, demand: 30 },
  { id: "P-1021", name: "Aluminum Tube", sku: "TUB-08-50", warehouse: "BLR-A", stock: 80, demand: 70 },
  { id: "P-1022", name: "Spring Washer", sku: "SWR-05-300", warehouse: "DEL-B", stock: 310, demand: 290 },
  { id: "P-1023", name: "Hex Key Set", sku: "HEXKEY-10", warehouse: "PNQ-C", stock: 45, demand: 60 },
  { id: "P-1024", name: "Machine Screw", sku: "MSC-04-500", warehouse: "MUM-D", stock: 480, demand: 500 },
  { id: "P-1025", name: "Metal Pin", sku: "PIN-02-150", warehouse: "HYD-E", stock: 100, demand: 80 },
  { id: "P-1026", name: "Industrial Bearing", sku: "BRG-100-20", warehouse: "CHE-F", stock: 12, demand: 25 },
  { id: "P-1027", name: "Angle Bracket", sku: "ABR-06-100", warehouse: "CHE-F", stock: 90, demand: 120 },
  { id: "P-1028", name: "Gear Assembly", sku: "GAR-20-05", warehouse: "BLR-A", stock: 6, demand: 10 },
  { id: "P-1029", name: "Hydraulic Seal", sku: "HSL-08-50", warehouse: "DEL-B", stock: 40, demand: 75 },
  { id: "P-1030", name: "Steel Cable", sku: "SCB-05-10", warehouse: "KOL-G", stock: 9, demand: 15 },
];

const mockWarehouses = [
  { code: "BLR-A", name: "Bangalore Alpha", city: "Bangalore", country: "India" },
  { code: "PNQ-C", name: "Pune Charlie", city: "Pune", country: "India" },
  { code: "DEL-B", name: "Delhi Bravo", city: "Delhi", country: "India" },
  { code: "MUM-D", name: "Mumbai Delta", city: "Mumbai", country: "India" },
  { code: "HYD-E", name: "Hyderabad Echo", city: "Hyderabad", country: "India" },
  { code: "CHE-F", name: "Chennai Foxtrot", city: "Chennai", country: "India" },
  { code: "KOL-G", name: "Kolkata Golf", city: "Kolkata", country: "India" },
  { code: "AHM-H", name: "Ahmedabad Hotel", city: "Ahmedabad", country: "India" },
];


const generateKPIs = (range) => {
  const days = range === '7d' ? 7 : range === '14d' ? 14 : 30;
  const kpis = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const baseStock = mockProducts.reduce((sum, p) => sum + p.stock, 0);
    const baseDemand = mockProducts.reduce((sum, p) => sum + p.demand, 0);
    
    kpis.push({
      date: date.toISOString().split('T')[0],
      stock: Math.floor(baseStock * (0.9 + Math.random() * 0.2)),
      demand: Math.floor(baseDemand * (0.8 + Math.random() * 0.4)),
    });
  }
  
  return kpis;
};

const filterProducts = (products, search = '', status = 'All', warehouse = '') => {
  return products.filter(product => {

    const searchMatch = !search || 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase()) ||
      product.id.toLowerCase().includes(search.toLowerCase());


    const warehouseMatch = !warehouse || product.warehouse === warehouse;


    let statusMatch = true;
    if (status !== 'All') {
      const productStatus = product.stock > product.demand ? 'Healthy' 
        : product.stock === product.demand ? 'Low' : 'Critical';
      statusMatch = productStatus === status;
    }

    return searchMatch && warehouseMatch && statusMatch;
  });
};

// Create mock link
const mockLink = new ApolloLink((operation) => {
  return new Observable((observer) => {
    const { query, variables } = operation;
    
    setTimeout(() => {
      try {
        let result = null;


        if (query.definitions[0].name?.value === 'GetProducts') {
          const filtered = filterProducts(
            mockProducts, 
            variables?.search, 
            variables?.status, 
            variables?.warehouse
          );
          result = { data: { products: filtered } };
        }
        
        else if (query.definitions[0].name?.value === 'GetWarehouses') {
          result = { data: { warehouses: mockWarehouses } };
        }
        
        else if (query.definitions[0].name?.value === 'GetKPIs') {
          result = { data: { kpis: generateKPIs(variables?.range || '7d') } };
        }
        
        // Handle mutations
        else if (query.definitions[0].name?.value === 'UpdateDemand') {
          const product = mockProducts.find(p => p.id === variables.id);
          if (product) {
            product.demand = variables.demand;
            result = { data: { updateDemand: { ...product } } };
          }
        }
        
        else if (query.definitions[0].name?.value === 'TransferStock') {
          const product = mockProducts.find(p => p.id === variables.id);
          if (product && product.warehouse === variables.from) {
            const targetProduct = mockProducts.find(p => 
              p.id === variables.id && p.warehouse === variables.to
            );
            
            if (targetProduct) {
              product.stock -= variables.qty;
              targetProduct.stock += variables.qty;
            } else {

              const newProduct = { 
                ...product, 
                warehouse: variables.to, 
                stock: variables.qty,
                demand: 0
              };
              mockProducts.push(newProduct);
              product.stock -= variables.qty;
            }
            
            result = { data: { transferStock: { ...product } } };
          }
        }

        if (result) {
          observer.next(result);
          observer.complete();
        } else {
          observer.error(new Error(`Unhandled operation: ${operation.operationName}`));
        }
      } catch (error) {
        observer.error(error);
      }
    }, 100); 
  });
});


const client = new ApolloClient({
  link: mockLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

export default client;