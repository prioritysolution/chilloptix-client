import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  chamberData: [],
};
const ChamberSlice = createSlice({
  name: "chamber",
  initialState,
  reducers: {
    getChamberData: (state, action) => {
      state.chamberData = action.payload;
    },
  },
});
export const { getChamberData } = ChamberSlice.actions;
export default ChamberSlice.reducer;
