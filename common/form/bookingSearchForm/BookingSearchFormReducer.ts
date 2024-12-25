import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  bookingSearchData: [],
};
const BookSearchSlice = createSlice({
  name: "bookingSearch",
  initialState,
  reducers: {
    getBookingSearchData: (state, action) => {
      state.bookingSearchData = action.payload;
    },
  },
});
export const { getBookingSearchData } = BookSearchSlice.actions;
export default BookSearchSlice.reducer;
