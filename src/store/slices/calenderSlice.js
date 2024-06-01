import { createSlice } from "@reduxjs/toolkit";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); 
const currentDay = String(currentDate.getDate()).padStart(2, '0');
const date = `${currentYear}-${currentMonth}-${currentDay}`;

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