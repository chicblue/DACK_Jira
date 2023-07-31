import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { http } from "../../Util/Config";
import { TypeProject } from "./projectReducer";

export interface ProjectUpdate {
  id: number;
  projectName: string;
  creator: number;
  description: string;
  categoryId: string;
}

export interface projectChangeState {
  projectEdit: TypeProject;
}
const initialState: projectChangeState = {
  projectEdit: {
    members: [],
    creator: { id: 1, name: "" },
    id: 0,
    projectName: "string",
    description: "string",
    categoryId: 0,
    categoryName: "string",
    alias: "string",
    deleted: false,
  },
};

const projectChangeReducers = createSlice({
  name: "projectChangeReducers",
  initialState,
  reducers: {
    actionEditProject: (
      state: projectChangeState,
      action: PayloadAction<TypeProject>
    ) => {
      state.projectEdit = action.payload;
    },
  },
});

export const { actionEditProject } = projectChangeReducers.actions;

export default projectChangeReducers.reducer;
// action asyn-----------------
export const updateAsynAction = createAsyncThunk(
  "updateAsynAction",
  async (values: ProjectUpdate, thunkAPI) => {
    try {
      const res = await http.put(
        `/api/Project/updateProject?projectId=${values.id}`,
        values
      );
      alert(res.data.message);

      return res.data.content;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert(error.response.data.content);
        return thunkAPI.rejectWithValue(error.response.data.content);
      } else {
        alert(error.message);
        return thunkAPI.rejectWithValue(
          "Error updating project: " + error.message
        );
      }
    }
  }
);
