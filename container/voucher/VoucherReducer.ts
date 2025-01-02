import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  ledgerData: [],
};
const VoucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    getLedgerData: (state, action) => {
      state.ledgerData = action.payload;
    },
  },
});
export const { getLedgerData } = VoucherSlice.actions;
export default VoucherSlice.reducer;
