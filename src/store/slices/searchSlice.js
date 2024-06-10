import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchData: [],
  loading : false,
};

const searchSlice = createSlice({
  name: "searchData",
  initialState,
  reducers: {
    setSearchData: (state, action) => {
      const { data } = action.payload;
      state.searchData = data;
    },
    setLoading : (state, action) => {
      const { loading } = action.payload;
      state.loading = loading;
    }
  },
});

export const { setSearchData,setLoading } = searchSlice.actions;
export default searchSlice.reducer;
