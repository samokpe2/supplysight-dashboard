# SupplySight Dashboard - Development Notes

## Architecture Decisions

### Frontend Framework & Tooling
- **React + Vite**: Chose Vite over Create React App for faster development and build times
- **Tailwind CSS**: Provides utility-first styling with excellent developer experience and consistent design system
- **Apollo Client**: Selected over urql for its mature ecosystem, better developer tools, and excellent caching capabilities

### Component Structure
- **Atomic Design Pattern**: Organized components into UI, Layout, Dashboard, ProductTable, and ProductDrawer directories
- **Custom Hooks**: Separated data fetching (`useProducts`) and filter state management (`useFilters`) into reusable hooks
- **Utility Functions**: Centralized business logic calculations and constants for maintainability

### GraphQL Implementation
- **Mock Server**: Implemented a sophisticated custom MockLink that handles dynamic queries and mutations
- **In-Memory Data**: All data mutations update the mock data store to simulate real backend behavior
- **Error Handling**: Comprehensive error states and loading indicators throughout the application

## Key Features Implemented

### Dashboard Components
1. **KPI Cards**: Real-time calculations of Total Stock, Total Demand, and Fill Rate
2. **Interactive Chart**: Stock vs Demand trend visualization using Recharts
3. **Advanced Filters**: Search by name/SKU/ID, warehouse filtering, and status-based filtering
4. **Smart Status Logic**: Correct implementation of Healthy/Low/Critical status rules

### Product Management
1. **Responsive Table**: Pagination, sorting, and critical item highlighting
2. **Product Drawer**: Detailed view with business context and action forms
3. **Update Demand**: Real-time demand modification with validation
4. **Stock Transfer**: Inter-warehouse stock movement with availability checks

### User Experience
- **Loading States**: Skeleton loading and spinners throughout
- **Error Handling**: User-friendly error messages and validation
- **Responsive Design**: Mobile-first approach with breakpoint considerations
- **Visual Feedback**: Status pills, critical row highlighting, and interactive hover states

## Business Logic Implementation

### Fill Rate Calculation
```javascript
fillRate = (sum(min(stock, demand)) / sum(demand)) * 100%
```
Correctly implements the "fulfilled demand" percentage as specified.

### Status Classification
- 🟢 **Healthy**: `stock > demand`
- 🟡 **Low**: `stock === demand`  
- 🔴 **Critical**: `stock < demand` (with red row tinting)

### Data Filtering
- **Search**: Case-insensitive matching across name, SKU, and product ID
- **Warehouse**: Exact match filtering
- **Status**: Computed status filtering with "All" option
- **Real-time Updates**: Filters apply immediately without page refresh

## Technical Trade-offs

### Mock Server Approach
**Decision**: Custom MockLink instead of standalone GraphQL server
**Pros**: 
- No additional server setup required
- Perfect for prototyping and development
- Maintains data between operations
**Cons**: 
- Not suitable for production
- Limited to client-side persistence

### State Management
**Decision**: Local component state + Apollo Cache instead of Redux/Zustand
**Pros**: 
- Simpler architecture for this scope
- Apollo Client handles server state excellently
- Reduces bundle size
**Cons**: 
- Might need refactoring for complex global state requirements

### Data Persistence
**Decision**: In-memory mock data that persists during session
**Pros**: 
- Demonstrates mutations working correctly
- Good for demo purposes
**Cons**: 
- Data resets on page refresh
- Not suitable for real-world usage

## What Would Be Improved With More Time

### Performance Optimizations
1. **Virtual Scrolling**: For large product lists (1000+ items)
2. **Query Optimization**: Implement field-level caching and query batching
3. **Code Splitting**: Route-based and component-based lazy loading
4. **Memoization**: React.memo and useMemo for expensive calculations

### Enhanced Features
1. **Advanced Search**: Fuzzy search, filters by date range, multi-select warehouses
2. **Bulk Operations**: Multi-select products for batch updates
3. **Export Functionality**: CSV/PDF export of filtered results
4. **Real-time Updates**: WebSocket integration for live data updates
5. **Audit Trail**: History of demand changes and stock transfers

### User Experience Improvements
1. **Keyboard Navigation**: Full keyboard accessibility support
2. **Advanced Charts**: Multiple chart types, drill-down capabilities
3. **Customizable Dashboard**: Draggable widgets, user preferences
4. **Dark Mode**: Theme switching capability
5. **Offline Support**: Service worker for offline functionality

### Technical Enhancements
1. **TypeScript**: Add type safety throughout the application
2. **Testing**: Unit tests (Jest), integration tests (React Testing Library), E2E tests (Cypress)
3. **Error Boundaries**: Better error isolation and recovery
4. **Internationalization**: Multi-language support
5. **Performance Monitoring**: Real user monitoring and analytics

### Backend Integration
1. **Real GraphQL Server**: Replace mock with actual backend
2. **Authentication**: User roles and permissions
3. **Data Validation**: Server-side validation and sanitization
4. **Caching Strategy**: Redis caching and CDN integration
5. **Database Optimization**: Proper indexing and query optimization

Github Repo : https://github.com/samokpe2/supplysight-dashboard