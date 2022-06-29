import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rol: "",
  token: "",
  vacunatorio: "",
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
  },
});

export const { setUser, logout, setVacunatorio } = userSlice.actions;
export default userSlice.reducer;
