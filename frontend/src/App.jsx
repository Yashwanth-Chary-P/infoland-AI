import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPlots } from './features/plots/plotsSlice.js';
import { fetchDetailedPlots } from './features/detailedPlots/detailedPlotsSlice.js';
import AppRouter from './routers/router.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import './lib/chart.js'; // Initialize global ChartJS configurations

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlots());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Toaster />
        <AppRouter />
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
