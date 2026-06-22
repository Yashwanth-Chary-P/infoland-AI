import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all plots
export const fetchPlots = createAsyncThunk(
  'plots/fetchPlots',
  async () => {
    const res = await axios.get('http://localhost:5000/api/plots/basic');
    return res.data;                 // array of plot objects
  }
);

const plotsSlice = createSlice({
  name: 'plots',
  initialState: {
    plots: [],                       // Will be replaced with backend data
    selectedPlotId: null,            // DO NOT CHANGE (your UI uses this)
  },
  reducers: {
    selectPlot: (state, action) => { // DO NOT CHANGE
      state.selectedPlotId = action.payload;
    },
    clearSelection: (state) => {
      state.selectedPlotId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlots.fulfilled, (state, action) => {
        state.plots = action.payload;
      });
  }
});

export const { selectPlot, clearSelection } = plotsSlice.actions;
export default plotsSlice.reducer;
