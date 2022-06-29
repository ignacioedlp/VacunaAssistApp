import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gripe: true,
  fiebre: true,
  covid: true,
  fiebreCompletado: true,
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
        covid: action.payload.covid,
        fiebreCompletado: action.payload.fiebreCompletado,
      };
    },
    desactivateFiebreCompletado: (state = initialState, action) => {
      return {
        ...state, //
        fiebreCompletado: true,
      };
    },
    desactivateGripe: (state = initialState, action) => {
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
    activateGripe: (state = initialState, action) => {
      return {
        ...state, //
        gripe: false,
      };
    },
    activateFiebre: (state = initialState, action) => {
      return {
        ...state, //
        fiebre: false,
      };
    },
    activateCovid: (state = initialState, action) => {
      return {
        ...state, //
        covid: false,
      };
    },
  },
});

export const {
  desactivateCovid,
  desactivateFiebre,
  desactivateGripe,
  activateCovid,
  activateFiebre,
  activateGripe,
  desactivateFiebreCompletado,
  initCampania,
} = campaniasSlice.actions;
export default campaniasSlice.reducer;
