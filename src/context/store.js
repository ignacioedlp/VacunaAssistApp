import { configureStore } from "@reduxjs/toolkit";
import campaniasSlice from "./slices/campaniasSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    campanias: campaniasSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});
