import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  rentData: [],
};
const RentSlice = createSlice({
  name: "rent",
  initialState,
  reducers: {
    getRentData: (state, action) => {
      state.rentData = action.payload;
    },
  },
});
export const { getRentData } = RentSlice.actions;
export default RentSlice.reducer;
