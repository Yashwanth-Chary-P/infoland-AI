import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProperties, fetchPropertyDetails } from "../../services/data/PropertyService";

export const fetchDetailedPlots = createAsyncThunk(
  "detailedPlots/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const data = await fetchAllProperties(params);
      return data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch detailed plots');
    }
  }
);

// Load more plots for progressive loading
export const loadMoreDetailedPlots = createAsyncThunk(
  "detailedPlots/loadMore",
  async (params, { rejectWithValue }) => {
    try {
      const data = await fetchAllProperties(params);
      return data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load more plots');
    }
  }
);

// Fetch one plot by ID
export const fetchDetailedPlotById = createAsyncThunk(
  "detailedPlots/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchPropertyDetails(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch property details');
    }
  }
);

const detailedPlotsSlice = createSlice({
  name: "detailedPlots",
  initialState: {
    list: [],
    selected: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearSelectedPlot: (state) => {
      state.selected = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchDetailedPlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDetailedPlots.fulfilled, (state, action) => {
        state.loading = false;
        
        const existingIds = new Set();
        const uniquePlots = [];
        
        for (const p of (action.payload.data || [])) {
          if (p.property_id && !existingIds.has(p.property_id)) {
            existingIds.add(p.property_id);
            uniquePlots.push(p);
          }
        }
        
        state.list = uniquePlots;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchDetailedPlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Load more
      .addCase(loadMoreDetailedPlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMoreDetailedPlots.fulfilled, (state, action) => {
        state.loading = false;
        
        if (!action.payload.data || action.payload.data.length === 0) {
           if (state.pagination) state.pagination.hasNextPage = false;
           return;
        }

        const existingIds = new Set(state.list.map(p => p.property_id));
        const newPlots = [];
        
        for (const p of action.payload.data) {
           if (p.property_id && !existingIds.has(p.property_id)) {
               existingIds.add(p.property_id);
               newPlots.push(p);
           }
        }
        
        state.list = [...state.list, ...newPlots];
        state.pagination = action.payload.pagination;
      })
      .addCase(loadMoreDetailedPlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch single
      .addCase(fetchDetailedPlotById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDetailedPlotById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchDetailedPlotById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedPlot } = detailedPlotsSlice.actions;
export default detailedPlotsSlice.reducer;
