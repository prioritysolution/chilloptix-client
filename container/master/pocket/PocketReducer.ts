import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  pocketData: [],
};
const PocketSlice = createSlice({
  name: "pocket",
  initialState,
  reducers: {
    getPocketData: (state, action) => {
      state.pocketData = action.payload;
    },
  },
});
export const { getPocketData } = PocketSlice.actions;
export default PocketSlice.reducer;
