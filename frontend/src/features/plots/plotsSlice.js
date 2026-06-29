import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllProperties } from '../../services/data/PropertyService';

// Fetch all plots
export const fetchPlots = createAsyncThunk(
  'plots/fetchPlots',
  async (params, { rejectWithValue }) => {
    try {
      const data = await fetchAllProperties(params);
      return data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch properties');
    }
  }
);

const plotsSlice = createSlice({
  name: 'plots',
  initialState: {
    plots: [],
    selectedPlotId: null,
    loading: false,
    error: null,
  },
  reducers: {
    selectPlot: (state, action) => {
      state.selectedPlotId = action.payload;
    },
    clearSelection: (state) => {
      state.selectedPlotId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlots.fulfilled, (state, action) => {
        state.loading = false;
        state.plots = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { selectPlot, clearSelection } = plotsSlice.actions;
export default plotsSlice.reducer;
