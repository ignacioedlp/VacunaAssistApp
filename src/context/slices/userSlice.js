import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rol: "",
  token: "",
  vacunatorio: "",
  vacunatorio_personal: "",
  riesgo: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state = initialState, action) => {
      return {
        ...state, //
        rol: action.payload.rol,
        token: action.payload.token,
        vacunatorio: action.payload.vacunatorio,
        vacunatorio_personal: action.payload.vacunatorio_personal,
      };
    },
    logout: (state = initialState, action) => {
      return {
        ...state, //
        rol: "",
        token: "",
      };
    },
    setVacunatorio: (state = initialState, action) => {
      return {
        ...state, //
        vacunatorio: action.payload.vacunatorio,
      };
    },
    setVacunatorio_personal: (state = initialState, action) => {
      return {
        ...state, //
        vacunatorio_personal: action.payload.vacunatorio_personal,
      };
    },
  },
});

export const { setUser, logout, setVacunatorio, setVacunatorio_personal } = userSlice.actions;
export default userSlice.reducer;
