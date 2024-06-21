import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMyChats } from "../../services/connect.service";

const initialState = {
  selectedChat: {},
  activeTab: 'inbox',
  chats: [],
  loading: false,
  error: null,
};

export const fetchChats = createAsyncThunk(
  "chatData/fetchChats",
  async (_, { rejectWithValue }) => {
    try {
      const chatsData = await getMyChats();
      const sortedChats = chatsData?.chats.sort((a, b) => {
        const dateA = new Date(a.lastMessage[0]?.updatedAt || a.createdAt);
        const dateB = new Date(b.lastMessage[0]?.updatedAt || b.createdAt);
        return dateB - dateA;
      });
      return sortedChats;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || error.message);
    }
  }
);

const moveItemToStart = (array, fromIndex) => {
  const item = array[fromIndex];
  const newArray = array.filter((_, index) => index !== fromIndex);
  newArray.unshift(item);
  return newArray;
};


const chatSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload.chat;
    },
    setActiveTab: (state, action) => {  
      state.activeTab = action.payload.tab;
    },
    moveSelectedChatToStart: (state) => {
      const fromIndex = state.chats.findIndex(chat => chat._id === state.selectedChat._id);
      if (fromIndex !== -1) {
        state.chats = moveItemToStart(state.chats, fromIndex);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedChat, setActiveTab ,moveSelectedChatToStart } = chatSlice.actions;
export default chatSlice.reducer;
