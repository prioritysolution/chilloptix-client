import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  rackData: [],
};
const RackSlice = createSlice({
  name: "rack",
  initialState,
  reducers: {
    getRackData: (state, action) => {
      state.rackData = action.payload;
    },
  },
});
export const { getRackData } = RackSlice.actions;
export default RackSlice.reducer;
