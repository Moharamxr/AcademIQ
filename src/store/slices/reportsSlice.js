import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserReport } from "../../services/report.service";

const initialState = {
  selectedReport: {},
  toggleNewMessage: false,
  isSent: false,
  receivedReports: [],
  sentReports: [],
  loading: false,
};

export const fetchReports = createAsyncThunk(
  "reportsData/fetchReports",
  async (_, { rejectWithValue }) => {
    try {
      const receivedReports = await getUserReport(false);
      const sentReports = await getUserReport(true);
      return {
        receivedReports: receivedReports?.reports?.reverse() || [],
        sentReports: sentReports?.reports?.reverse() || [],
      };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || error.message);
    }
  }
);

const reportsSlice = createSlice({
  name: "reportsData",
  initialState,
  reducers: {
    setSelectedReport: (state, action) => {
      state.selectedReport = action.payload;
    },
    setToggleNewMessage: (state, action) => {
      state.toggleNewMessage = action.payload;
    },
    setIsSent: (state, action) => {
      state.isSent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false;
        state.receivedReports = action.payload.receivedReports;
        state.sentReports = action.payload.sentReports;
      })
      .addCase(fetchReports.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSelectedReport, setToggleNewMessage, setIsSent } = reportsSlice.actions;
export default reportsSlice.reducer;
