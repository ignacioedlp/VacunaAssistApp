

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gripe: true,
  fiebre: true,
  covid: true,
};


export const campaniasSlice = createSlice({
  name: "campanias",
  initialState: initialState,
  reducers: {

    initCampania: (state = initialState, action) => {
      return {
        ...state, //
        gripe: action.payload.gripe,
        fiebre: action.payload.fiebre,
        covid: action.payload.covid
      };
    },
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

export const { desactivateCovid, desactivateFiebre, desactivateGripe, initCampania } =
  campaniasSlice.actions;
export default campaniasSlice.reducer;
