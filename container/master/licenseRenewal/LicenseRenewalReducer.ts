import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  licenseRenewalData: [],
};
const LicenseRenewalSlice = createSlice({
  name: "licenseRenewal",
  initialState,
  reducers: {
    getLicenseRenewalData: (state, action) => {
      state.licenseRenewalData = action.payload;
    },
  },
});
export const { getLicenseRenewalData } = LicenseRenewalSlice.actions;
export default LicenseRenewalSlice.reducer;
