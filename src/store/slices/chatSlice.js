import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: {},
  activeTab: 'inbox',
};

const chatSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload.chat;
    },
    setActiveTab: (state, action) => {  // Renamed from setActiveTap to setActiveTab
      state.activeTab = action.payload.tab;
    },
  },
});

export const { setSelectedChat, setActiveTab } = chatSlice.actions;
export default chatSlice.reducer;
