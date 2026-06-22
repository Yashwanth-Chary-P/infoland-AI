import { configureStore } from '@reduxjs/toolkit';
import plotsReducer from '../features/plots/plotsSlice.js';
import detailedPlotsReducer from '../features/detailedPlots/detailedPlotsSlice.js';


export const store = configureStore({
  reducer: {
    plots: plotsReducer,
    detailedPlots: detailedPlotsReducer,
  },
});

