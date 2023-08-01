import { notification } from "antd";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../../Util/Config";
import { AxiosResponse } from "axios";
export type NotificationType = "success" | "info" | "warning" | "error";
const initialState: ProjectState = {
  arrProject: [],
  isDeletedSuccess: false,
  isUpdateSuccess: false,
  error: null,
  currentUser: null,
  notificationType: null,
  deleteSuccessMessage: "",
  updateSuccessMessage: "",
};
export interface ProjectUpdate {
  id: number;
  projectName: string;
  creator: number;
  description: string;
  categoryId: string;
}
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
  isDeletedSuccess: boolean;
  isUpdateSuccess: boolean;
  error: string | null;
  currentUser: null;
  notificationType: NotificationType | null;
  deleteSuccessMessage: string | null;
  updateSuccessMessage: string | null;
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
interface ProjectResponse {
  statusCode: number;
  message: string;
  content: string;
  dateTime: string;
}

const projectReducer = createSlice({
  name: "projectReducer",
  initialState,
  reducers: {
    resetIsDeletedSuccess: (state) => {
      state.isDeletedSuccess = false;
    },
    resetIsUpdateSuccess: (state) => {
      state.isUpdateSuccess = false;
    },
    resetError: (state) => {
      state.error = null;
    },
    setNotificationType: (state, action: PayloadAction<NotificationType>) => {
      state.notificationType = action.payload;
    },
    setDeleteSuccessMessage: (state, action: PayloadAction<string>) => {
      state.deleteSuccessMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllProjectApi.fulfilled,
      (state: ProjectState, action: PayloadAction<TypeProject[]>) => {
        state.arrProject = action.payload;
        state.error = null;
      }
    );
    builder.addCase(
      getAllProjectApi.rejected,
      (state: ProjectState, action) => {
        state.error = action.error.message;
      }
    );
    builder.addCase(deleteProjectFromApi.fulfilled, (state, action) => {
      state.isDeletedSuccess = true;
      state.deleteSuccessMessage = action.payload.message;
      state.error = null;
      state.notificationType = "success";
    });

    builder.addCase(deleteProjectFromApi.rejected, (state, action) => {
      state.error = action.payload ?? action.error.message;
      state.isDeletedSuccess = false;
      state.notificationType = "error";
      notification.error({
        message: "Delete failed",
        description: action.payload ?? action.error.message,
      });
    });
    builder.addCase(updateAsynAction.fulfilled, (state, action) => {
      state.isUpdateSuccess = true;
      state.updateSuccessMessage = action.payload.message;
      state.error = null;
      state.notificationType = "success";
    });

    builder.addCase(updateAsynAction.rejected, (state, action) => {
      state.error = action.payload ?? action.error.message;
      state.isDeletedSuccess = false;
      state.notificationType = "error";
      // notification.error({
      //   message: "Delete failed",
      //   description: action.payload ?? action.error.message,
      // });
    });
  },
});
export const {
  resetIsDeletedSuccess,
  resetError,
  setNotificationType,
  setDeleteSuccessMessage,
  resetIsUpdateSuccess,
} = projectReducer.actions;

export default projectReducer.reducer;

export const getAllProjectApi = createAsyncThunk(
  "project/getAllProjectApi",
  async () => {
    try {
      const res = await http.get("api/Project/getAllProject");
      return res.data.content;
    } catch (error) {
      console.error("Error fetching projects: " + error.message);
      throw new Error(error.message);
    }
  }
);

export const deleteProjectFromApi = createAsyncThunk<
  ProjectResponse,
  number,
  { rejectValue: string }
>("project/deleteProject", async (projectId, thunkAPI) => {
  try {
    const response = await http.delete(
      `/api/Project/deleteProject?projectId=${projectId}`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      return thunkAPI.rejectWithValue(error.response.data.content);
    } else {
      return thunkAPI.rejectWithValue(
        "Error deleting project: " + error.message
      );
    }
  }
});
export const updateAsynAction = createAsyncThunk<
  ProjectResponse,
  number,
  { rejectValue: string }
>("updateAsynAction", async (values: any, thunkAPI) => {
  try {
    const res = await http.put(
      `/api/Project/updateProject?projectId=${values.id}`,
      values
    );
    alert(res.data.message);
    window.location.reload();
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      return thunkAPI.rejectWithValue(error.response.data.content);
    } else {
      return thunkAPI.rejectWithValue(
        "Error updating project: " + error.message
      );
    }
  }
});
