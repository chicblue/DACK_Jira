import { notification } from "antd";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../../Util/Config";
import { AxiosResponse } from "axios";
import { DispatchType } from "../configStore";
export type NotificationType = "success" | "info" | "warning" | "error";
const initialState: ProjectState = {
  arrProject: [],
  isDeletedSuccess: false,
  isUpdateSuccess: false,
  error: null,
  projectUpdate: null,
  currentUser: null,
  notificationType: null,
  deleteSuccessMessage: "",
  updateSuccessMessage: "",
  isLoading: false,
  ProjectDetail:{
    members:[],
    creator:{
      id: 0,
      name:'',
    },
    id:0,
    projectName:'',
    description:'',
    alias:'',
    projectCategory:{
      id:0,
      name:''
    },
    lstTask:[]
  },
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
export interface ProjectDetail extends Omit<TypeProject,'deleted'|'categoryId'|'categoryName'>{
  projectCategory:Catagory,
  lstTask: LstTask[],

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
  projectUpdate: ProjectUpdate | null;
  isLoading: boolean;
  ProjectDetail: ProjectDetail
}
export interface LstTask {
  alias: string
  lstTaskDeTail: []
  statusId: number
  statusName: string
}
export interface Catagory{
  id:number,
  name:string
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
    setIsLoading: (state: ProjectState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    getProjectDetail: (
      state: ProjectState,
      action: PayloadAction<ProjectDetail>
    ) => {
      state.ProjectDetail = action.payload;

    },

  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllProjectApi.pending,
      (state: ProjectState, action: PayloadAction<TypeProject[]>) => {
        state.isLoading = true;
        state.error = null;
      }
    );
    builder.addCase(
      getAllProjectApi.fulfilled,
      (state: ProjectState, action: PayloadAction<TypeProject[]>) => {
        state.arrProject = action.payload;
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addCase(
      getAllProjectApi.rejected,
      (state: ProjectState, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      }
    );
    builder.addCase(deleteProjectFromApi.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProjectFromApi.fulfilled, (state, action) => {
      state.isDeletedSuccess = true;
      state.deleteSuccessMessage = action.payload.message;
      state.error = null;
      state.isLoading = false;
      state.notificationType = "success";
    });

    builder.addCase(deleteProjectFromApi.rejected, (state, action) => {
      state.error = action.payload ?? action.error.message;
      state.isDeletedSuccess = false;
      state.notificationType = "error";
      state.isLoading = false;

      notification.error({
        message: "Delete failed",
        description: action.payload ?? action.error.message,
      });
    });
    builder.addCase(updateAsynAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateAsynAction.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateAsynAction.rejected, (state, action) => {
      state.error = action.payload ?? action.error.message;
      state.isDeletedSuccess = false;
      state.isLoading = false;
      state.notificationType = "error";
    });
  },
});
export const {
  resetIsDeletedSuccess,
  resetError,
  setNotificationType,
  setDeleteSuccessMessage,
  resetIsUpdateSuccess,
  setIsLoading,
  getProjectDetail,
} = projectReducer.actions;

export default projectReducer.reducer;

export const getProjectDetailApi = (keyword: string) => {
  return async (dispatch: DispatchType) => {
    const res = await http.get(`api/Project/getProjectDetail?id=${keyword}`);
    console.log(res.data.content);
    const action = getProjectDetail(res.data.content);
    dispatch(action);

  };
};
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
