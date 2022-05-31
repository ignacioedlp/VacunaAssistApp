

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gripe: false,
  fiebre: false,
  covid: false,
};

export const campaniasSlice = createSlice({
  name: "campanias",
  initialState: initialState,
  reducers: {
    desactivateGripe: (state = initialState, action) => {
      console.log("desactivando gripe");
      return {
        ...state, //
        gripe: true,
      };
    },
    desactivateFiebre: (state = initialState, action) => {
      return {
        ...state, //
        fiebre: true,
      };
    },
    desactivateCovid: (state = initialState, action) => {
      return {
        ...state, //
        covid: true,
      };
    },
  },
});

export const { desactivateCovid, desactivateFiebre, desactivateGripe } =
  campaniasSlice.actions;
export default campaniasSlice.reducer;
