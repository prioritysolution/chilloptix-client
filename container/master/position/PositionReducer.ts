import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  positionData: [],
};
const PositionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    getPositionData: (state, action) => {
      state.positionData = action.payload;
    },
  },
});
export const { getPositionData } = PositionSlice.actions;
export default PositionSlice.reducer;
