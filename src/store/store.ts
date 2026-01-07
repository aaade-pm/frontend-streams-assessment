import { configureStore } from "@reduxjs/toolkit";
import iconRailReducer from "./iconRailSlice";

export const store = configureStore({
  reducer: {
    iconRail: iconRailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
