import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  agentData: [],
};
const AgentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    getAgentData: (state, action) => {
      state.agentData = action.payload;
    },
  },
});
export const { getAgentData } = AgentSlice.actions;
export default AgentSlice.reducer;
