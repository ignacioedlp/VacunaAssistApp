import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rol: "",
  nombre: "",
  apellido: "",
  dni: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state = initialState, action) => {
      console.log("desactivando gripe");
      return {
        ...state, //
        rol: action.payload.rol,
        nombre: action.payload.nombre,
        apellido: action.payload.apellido,
      };
    },
    logout: (state = initialState, action) => {
      return {
        ...state, //
        fiebre: true,
      };
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
