import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchDetailedPlots, loadMoreDetailedPlots, setExploreUI } from '../../features/detailedPlots/detailedPlotsSlice';
import ExploreSidebar from './components/ExploreSidebar';
import ExploreMap from './components/ExploreMap';

const Explore = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const { list: plots, loading, pagination, exploreUI } = useSelector((state) => state.detailedPlots);
  const { lastParams, page, selectedId: selectedPropertyId, hoveredId: hoveredPropertyId } = exploreUI;
  
  const [isFetchingPage, setIsFetchingPage] = useState(false);

  useEffect(() => {
    const currentParamsString = searchParams.toString();
    
    // State Preservation: if URL params match what we already loaded, keep the existing Redux state
    if (lastParams === currentParamsString && plots.length > 0) {
      return;
    }

    const params = Object.fromEntries(searchParams.entries());
    if (params.region) params.region = params.region.toLowerCase().trim();
    if (params.search) { params.q = params.search; delete params.search; }

    dispatch(setExploreUI({ lastParams: currentParamsString, page: 1 }));
    dispatch(fetchDetailedPlots({ ...params, limit: 100, page: 1 }));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (key === 'region' && value !== searchParams.get('region')) {
      dispatch(setExploreUI({ selectedId: null, hoveredId: null }));
    }
    
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handleSearch = (query) => {
    handleFilterChange('search', query);
  };
  
  const handleLoadMore = async () => {
    if (isFetchingPage || loading || !pagination?.hasNextPage) return;
    
    setIsFetchingPage(true);
    const nextPage = page + 1;
    const params = Object.fromEntries(searchParams.entries());
    if (params.region) params.region = params.region.toLowerCase().trim();
    if (params.search) { params.q = params.search; delete params.search; }
    
    dispatch(setExploreUI({ page: nextPage }));
    await dispatch(loadMoreDetailedPlots({ ...params, limit: 100, page: nextPage }));
    setIsFetchingPage(false);
  };

  return (
    <>
      <Helmet>
        <title>Explore Properties | InfoLand AI</title>
        <meta name="description" content="Explore property datasets, view parcels on the map, and filter real estate records." />
      </Helmet>
      <div className="w-full h-[calc(100vh-4rem)] bg-slate-50 overflow-hidden py-6">
        <div className="max-w-[1800px] mx-auto w-full px-6 xl:px-8 2xl:px-10 h-full">
          <div className="flex h-full border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
          {/* Left Sidebar: List & Filters */}
          <div className="w-full md:w-[450px] lg:w-[500px] flex-shrink-0 border-r border-slate-200 bg-slate-50 flex flex-col h-full z-10 shadow-sm relative">
            <ExploreSidebar
              plots={plots}
              loading={loading}
              isFetchingPage={isFetchingPage}
              pagination={pagination}
              searchParams={searchParams}
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              onLoadMore={handleLoadMore}
              selectedPropertyId={selectedPropertyId}
              onSelectProperty={(id) => dispatch(setExploreUI({ selectedId: id }))}
              onHoverProperty={(id) => dispatch(setExploreUI({ hoveredId: id }))}
            />
          </div>

          {/* Right Workspace: Interactive Map */}
          <div className="flex-1 relative h-full bg-slate-100 z-0 hidden md:block">
            <ExploreMap
              plots={plots}
              selectedPropertyId={selectedPropertyId}
              hoveredPropertyId={hoveredPropertyId}
              onSelectProperty={(id) => dispatch(setExploreUI({ selectedId: id }))}
              selectedRegion={searchParams.get('region')}
            />
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
