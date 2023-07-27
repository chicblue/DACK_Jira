import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/userReducer";
import projectReducer from "./Reducers/projectReducer";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    projectReducer: projectReducer,
  },
});

// lấy kiểu dữ liệu của store
export type RootState = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;
