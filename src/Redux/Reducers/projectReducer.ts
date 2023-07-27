import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DispatchType, RootState } from "../configStore";
import { http, httpNonAuth } from "../../Util/Config";

const initialState: ProjectState = {
  arrProject: [],
};
export interface TypeProject {
  members: Member[];
  creator: Creator;
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  categoryName: string;
  alias: string;
  deleted: boolean;
}
export interface ProjectState {
  arrProject: TypeProject[];
}
export interface Creator {
  id: number;
  name: string;
}

export interface Member {
  userId: number;
  name: string;
  avatar: string;
}
const projectReducer = createSlice({
  name: "projectReducer",
  initialState,
  reducers: {
    getAllProject: (
      state: ProjectState,
      action: PayloadAction<TypeProject[]>
    ) => {
      state.arrProject = action.payload;
    },
  },
});
export const { getAllProject } = projectReducer.actions;

export default projectReducer.reducer;

export const getAllProjectApi = () => {
  return async (dispatch: DispatchType) => {
    const res = await http.get("api/Project/getAllProject");
    const action = getAllProject(res.data.content);
    dispatch(action);
  };
};
