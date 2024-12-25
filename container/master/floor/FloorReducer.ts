import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  floorData: [],
};
const FloorSlice = createSlice({
  name: "floor",
  initialState,
  reducers: {
    getFloorData: (state, action) => {
      state.floorData = action.payload;
    },
  },
});
export const { getFloorData } = FloorSlice.actions;
export default FloorSlice.reducer;
