import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./Reducers/categoryReducer";
import createTaskReducer from "./Reducers/createTaskReducer";
import drawerReducers from "./Reducers/drawerReducers";
import projectChangeReducers from "./Reducers/projectChangeReducers";
import projectReducer from "./Reducers/projectReducer";
import userReducer from "./Reducers/userReducer";
import loadingReducer from "./Reducers/loadingReducer";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    categoryReducer: categoryReducer,
    drawerReducers: drawerReducers,
    projectReducer: projectReducer,
    projectChangeReducers: projectChangeReducers,
    createTaskReducer: createTaskReducer,
    loadingReducer: loadingReducer,
  },
});

// lấy kiểu dữ liệu của store
export type RootState = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;
