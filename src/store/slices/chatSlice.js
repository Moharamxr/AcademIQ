import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: {},
};

const chatSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      const { chat } = action.payload;
      state.selectedChat = chat;
    },
  },
});

export const { setSelectedChat } = chatSlice.actions;
export default chatSlice.reducer;
