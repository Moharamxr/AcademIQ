import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTimePeriod: false,
};

const timetableSlice = createSlice({
  name: "timetableData",
  initialState,
  reducers: {
    setCurrentTimePeriod: (state, action) => {
      const { period } = action.payload;
      state.currentTimePeriod = period;
    },
  },
});

export const { setCurrentTimePeriod } = timetableSlice.actions;
export default timetableSlice.reducer;
