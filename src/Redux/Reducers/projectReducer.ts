import { notification } from "antd";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../../Util/Config";
import { AxiosResponse } from "axios";
export type NotificationType = "success" | "info" | "warning" | "error";
const initialState: ProjectState = {
  arrProject: [],
  isDeletedSuccess: false,
  error: null,
  currentUser: null,
  notificationType: null,
  deleteSuccessMessage: "", // Thêm trạng thái lưu thông báo thành công
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
  isDeletedSuccess: boolean;
  error: string | null;
  currentUser: null;
  notificationType: NotificationType | null;
  deleteSuccessMessage: string | null;
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
interface DeleteProjectResponse {
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
        state.error = null; // Reset lỗi nếu có
      }
    );
    builder.addCase(
      getAllProjectApi.rejected,
      (state: ProjectState, action) => {
        state.error = action.error.message; // Ghi nhận lỗi vào state
      }
    );
    builder.addCase(deleteProjectFromApi.fulfilled, (state, action) => {
      state.isDeletedSuccess = true;
      state.deleteSuccessMessage = action.payload.message; // Lưu thông báo thành công
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
  },
});
export const {
  resetIsDeletedSuccess,
  resetError,
  setNotificationType,
  setDeleteSuccessMessage,
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
      throw new Error(error.message); // Ghi nhận lỗi để xử lý ở component
    }
  }
);

export const deleteProjectFromApi = createAsyncThunk<
  DeleteProjectResponse,
  number,
  { rejectValue: string }
>("project/deleteProject", async (projectId, thunkAPI) => {
  const apiUrl = `https://jiranew.cybersoft.edu.vn/api/Project/deleteProject?projectId=${projectId}`;

  try {
    const response: AxiosResponse<DeleteProjectResponse> = await http.delete(
      apiUrl
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // Xử lý lỗi khi dự án không thuộc quyền sở hữu của người dùng
      return thunkAPI.rejectWithValue(error.response.data.content);
    } else {
      return thunkAPI.rejectWithValue(
        "Error deleting project: " + error.message
      );
    }
  }
});
