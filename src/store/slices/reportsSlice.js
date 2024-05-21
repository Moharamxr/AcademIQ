import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedReport: {},
  toggleNewMessage: false,
  isSent : false,

};

const reportsSlice = createSlice({
  name: "reportsData",
  initialState,
  reducers: {
    setSelectedReport: (state, action) => {
      const { report } = action.payload;
      state.selectedReport = report;
    },
    setToggleNewMessage: (state,action) => {
      const { toggleNewMessage } = action.payload;
      state.toggleNewMessage = toggleNewMessage;
    },
    setIsSent : (state,action) => {
      const { isSent } = action.payload;
      state.isSent = isSent;
    }
  },
});

export const { setSelectedReport ,setToggleNewMessage ,setIsSent  } = reportsSlice.actions;
export default reportsSlice.reducer;
