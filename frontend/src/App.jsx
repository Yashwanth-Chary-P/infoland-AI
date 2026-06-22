import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPlots } from './features/plots/plotsSlice.js';
import { fetchDetailedPlots } from './features/detailedPlots/detailedPlotsSlice.js';
import AppRouter from './routers/router.jsx';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlots());
    dispatch(fetchDetailedPlots());
  }, [dispatch]);

  return <AppRouter />;
}

export default App;
