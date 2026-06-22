import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all detailed plots
export const fetchDetailedPlots = createAsyncThunk(
  "detailedPlots/fetchAll",
  async () => {
    const res = await axios.get("http://localhost:5000/api/plots/detailed");
    return res.data;
  }
);

// Fetch one plot by ID
export const fetchDetailedPlotById = createAsyncThunk(
  "detailedPlots/fetchById",
  async (id) => {
    const res = await axios.get(`http://localhost:5000/api/plots/detailed/${id}`);
    return res.data;
  }
);

const detailedPlotsSlice = createSlice({
  name: "detailedPlots",
  initialState: {
    list: [],              // all detailed plots
    selected: null,        // selected from map or details
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
      })
      .addCase(fetchDetailedPlots.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDetailedPlots.rejected, (state) => {
        state.loading = false;
      })

      // Fetch single
      .addCase(fetchDetailedPlotById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDetailedPlotById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchDetailedPlotById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearSelectedPlot } = detailedPlotsSlice.actions;
export default detailedPlotsSlice.reducer;
