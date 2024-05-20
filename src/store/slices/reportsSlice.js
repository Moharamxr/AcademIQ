import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedContact: {},
  toggleNewMessage: false,

};

const reportsSlice = createSlice({
  name: "reportsData",
  initialState,
  reducers: {
    setSelectedContact: (state, action) => {
      const { contact } = action.payload;
      state.selectedContact = contact;
    },
    setToggleNewMessage: (state,action) => {
      const { toggleNewMessage } = action.payload;
      state.toggleNewMessage = toggleNewMessage;
    },
  },
});

export const { setSelectedContact ,setToggleNewMessage  } = reportsSlice.actions;
export default reportsSlice.reducer;
