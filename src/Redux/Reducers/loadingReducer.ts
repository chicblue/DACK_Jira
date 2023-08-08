import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
};

const loadingReducer = createSlice({
  name: "loadingReducer",
  initialState,
  reducers: {
    displayLoading: (state) => {
      state.visible = true;
    },
    hideLoading: (state) => {
      state.visible = false;
    },
  },
});

export const { displayLoading, hideLoading } = loadingReducer.actions;

export default loadingReducer.reducer;
