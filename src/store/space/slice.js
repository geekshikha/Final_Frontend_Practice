import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  spaces: [],
  spaceDetails: {},
};
//! qus - when use "User model - backend- router/endpoints"
//! Link button not working
//! how manage initialState - [] || null

export const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {
    spaceList: (state, action) => {
      state.spaces = [...action.payload];
    },
    spaceDetails: (state, action) => {
      state.spaceDetails = { ...action.payload };
    },
  },
});

export const { spaceList, spaceDetails } = spaceSlice.actions;

export default spaceSlice.reducer;
