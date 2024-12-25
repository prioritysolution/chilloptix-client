import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  bondSearchData: [],
};
const BondSearchSlice = createSlice({
  name: "bondSearch",
  initialState,
  reducers: {
    getBondSearchData: (state, action) => {
      state.bondSearchData = action.payload;
    },
  },
});
export const { getBondSearchData } = BondSearchSlice.actions;
export default BondSearchSlice.reducer;
