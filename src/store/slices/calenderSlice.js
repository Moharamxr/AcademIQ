import { createSlice } from "@reduxjs/toolkit";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentDay = currentDate.getDate();
const date = `${currentYear}-${currentMonth + 1}-${currentDay}`;
const initialState = {
  date: date,
};

const calenderSlice = createSlice({
  name: "calenderData",
  initialState,
  reducers: {
    setDate: (state, action) => {
      const { date } = action.payload;
      state.date = date;
    },
  },
});

export const { setDate } = calenderSlice.actions;
export default calenderSlice.reducer;