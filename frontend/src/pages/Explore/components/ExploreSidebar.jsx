import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, SlidersHorizontal, MapPin, CheckCircle2, AlertTriangle, FileText, ChevronDown } from 'lucide-react';
import PropertyCard from './PropertyCard';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import { REGIONS } from '../../../utils/mapUtils';
import { setExploreUI } from '../../../features/detailedPlots/detailedPlotsSlice';

const ExploreSidebar = ({ 
  plots, 
  loading, 
  isFetchingPage,
  pagination,
  searchParams, 
  onSearch, 
  onFilterChange,
  onLoadMore,
  selectedPropertyId,
  onSelectProperty,
  onHoverProperty
}) => {
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || searchParams.get('q') || '');
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const { exploreUI } = useSelector(state => state.detailedPlots);
  const scrollPosition = exploreUI?.scrollPosition || 0;

  // Restore scroll on mount
  useEffect(() => {
    if (scrollRef.current && scrollPosition > 0) {
      scrollRef.current.scrollTop = scrollPosition;
    }
  }, []); // Run once on mount

  // Save scroll on unmount
  useEffect(() => {
    const el = scrollRef.current;
    return () => {
      if (el) {
        dispatch(setExploreUI({ scrollPosition: el.scrollTop }));
      }
    };
  }, [dispatch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const toTitleCase = (str) => {
    if (!str) return '';
    return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  };

  const regionOptions = useMemo(() => {
    return REGIONS.map(region => ({
      label: region.name,
      value: region.name.toLowerCase()
    }));
  }, []);
  const filters = [
    { key: 'region', label: 'Region', options: regionOptions },
    { key: 'status', label: 'Status', options: [
      { label: 'VERIFIED', value: 'VERIFIED' },
      { label: 'PENDING', value: 'PENDING' },
      { label: 'REJECTED', value: 'REJECTED' }
    ]},
    { key: 'risk', label: 'Risk Level', options: [
      { label: 'LOW', value: 'LOW' },
      { label: 'MEDIUM', value: 'MEDIUM' },
      { label: 'HIGH', value: 'HIGH' }
    ]},
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header & Search */}
      <div className="bg-white p-4 border-b border-slate-200 shadow-sm z-10 relative">
        <h1 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">Intelligence Workspace</h1>
        
        <form onSubmit={handleSearchSubmit} className="relative mb-3 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm text-slate-900"
            placeholder="Search by Property ID, owner, or location..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <button 
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs font-semibold text-slate-400 hover:text-slate-600"
              onClick={() => { setSearchInput(''); onSearch(''); }}
            >
              CLEAR
            </button>
          )}
        </form>

        {/* Quick Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <Button variant="ghost" size="sm" className="flex-shrink-0 text-slate-600 bg-slate-100 hover:bg-slate-200 border-transparent px-3 py-1.5 h-auto text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 mr-2" /> Filters
          </Button>
          
          {filters.map(filter => (
            <select
              key={filter.key}
              value={searchParams.get(filter.key) || ''}
              onChange={(e) => onFilterChange(filter.key, e.target.value)}
              className="text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-sm flex-shrink-0 appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em', paddingRight: '2rem' }}
            >
              <option value="">{filter.label}</option>
              {filter.options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ))}
        </div>
      </div>

      {/* Property List */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
      `}</style>
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar pb-6"
      >
        {loading && !plots?.length ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        ) : plots?.length > 0 ? (
          <>
            {plots.map(plot => (
              <PropertyCard
                key={plot.property_id || plot.id || plot._id}
                plot={plot}
                isSelected={selectedPropertyId === (plot.property_id || plot.id || plot._id)}
                onSelect={() => onSelectProperty(plot.property_id || plot.id || plot._id)}
                onHover={() => onHoverProperty(plot.property_id || plot.id || plot._id)}
                onLeave={() => onHoverProperty(null)}
              />
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-center px-4">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 mb-1">No intelligence found</h3>
            <p className="text-xs text-slate-500 max-w-[200px]">Adjust your filters or search query to find properties.</p>
          </div>
        )}
      </div>

      {/* Sticky Pagination Footer */}
      {plots?.length > 0 && (
        <div className="bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 relative">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-widest">
              <span>Showing</span>
              <span className="text-slate-900 font-bold">{plots.length} of {pagination?.total || plots.length} Properties</span>
            </div>
            {pagination?.hasNextPage && (
              <Button 
                variant="primary" 
                className="w-full h-10 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 shadow-sm transition-all flex items-center justify-center"
                onClick={onLoadMore}
                disabled={isFetchingPage}
              >
                {isFetchingPage ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-400 border-t-white mr-2"></div>
                    Loading more properties...
                  </>
                ) : 'Load More'}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreSidebar;
