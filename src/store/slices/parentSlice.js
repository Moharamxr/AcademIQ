import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChild: "",
};

const parentSlice = createSlice({
  name: "parentData",
  initialState,
  reducers: {
    setChild: (state, action) => {
      const { childId } = action.payload;
      state.selectedChild = childId;
    },
  },
});

export const { setChild } = parentSlice.actions;
export default parentSlice.reducer;
