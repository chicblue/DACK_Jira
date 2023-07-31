import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import FormEdit from "../../Components/Form/FormEdit";

export interface DrawerState {
  visible: boolean;
  componentCotent: any;
  callBackSubmit: any;
  title: string;
  projectDetail: ProjectDetail | null;
}
const initialState: DrawerState = {
  visible: false,
  componentCotent: "",
  callBackSubmit: (): void => {
    alert("demo");
  },
  title: "",
  projectDetail: null,
};
interface ProjectDetail {
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  categoryName: string;
  alias: string;
  // Các thuộc tính khác liên quan đến ProjectDetail
}
const drawerReducers = createSlice({
  name: "drawerReducers",
  initialState,
  reducers: {
    drawerOpenClose: (state: DrawerState, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    drawerComponentContent: (
      state: DrawerState,
      action: PayloadAction<JSX.Element>
    ) => {
      state.componentCotent = action.payload;
    },
    drawerCallBackSubmit: (state: DrawerState, action: PayloadAction<any>) => {
      state.callBackSubmit = action.payload;
    },
    drawerTitle: (state: DrawerState, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    drawerProjectDetail: (
      state: DrawerState,
      action: PayloadAction<ProjectDetail>
    ) => {
      state.projectDetail = action.payload;
    },
  },
});

export const {
  drawerOpenClose,
  drawerComponentContent,
  drawerCallBackSubmit,
  drawerTitle,
  drawerProjectDetail,
} = drawerReducers.actions;

export default drawerReducers.reducer;
