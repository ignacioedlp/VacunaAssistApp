import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rol: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state = initialState, action) => {
      console.log("Inicializando usuario");
      return {
        ...state, //
        rol: action.payload.rol,
        token: action.payload.token
      };
    },
    logout: (state = initialState, action) => {
      return {
        ...state, //
        rol: "",
        token: ""
      };
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
