import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { history } from "../..";
import { TypeCreateTask } from "../../Components/Form/FormCreateTask";
import { http } from "../../Util/Config";
import { DispatchType } from "../configStore";

export interface TaskType {
  id: number;
  taskType: string;
}
export interface Priority {
  priorityId: number;
  priority: string;
  description: string;
  deleted: boolean;
  alias: string;
}
export interface User {
  userId: number;
  name: string;
  avatar: string;
  email: string;
  phoneNumber: string;
}
export interface CreateTaskState {
  arrTaskType: TaskType[];
  arrPriority: Priority[];
  arrUser: User[];
}

const initialState: CreateTaskState = {
  arrTaskType: [],
  arrPriority: [],
  arrUser: [],
};

const createTaskReducer = createSlice({
  name: "createTaskReducer",
  initialState,
  reducers: {
    getTaskType: (
      state: CreateTaskState,
      action: PayloadAction<TaskType[]>
    ) => {
      state.arrTaskType = action.payload;
    },
    getPriority: (
      state: CreateTaskState,
      action: PayloadAction<Priority[]>
    ) => {
      state.arrPriority = action.payload;
    },
    getUser: (state: CreateTaskState, action: PayloadAction<User[]>) => {
      state.arrUser = action.payload;
    },
  },
});

export const { getTaskType, getPriority, getUser } = createTaskReducer.actions;

export default createTaskReducer.reducer;

// -------------action Apip---------------
export const getTaskTypeApi = () => {
  return async (dispatch: DispatchType) => {
    const res = await http.get("/api/TaskType/getAll");
    const action = getTaskType(res.data.content);
    dispatch(action);
  };
};

//   -----------
export const getPriorityApi = () => {
  return async (dispatch: DispatchType) => {
    const res = await http.get("/api/Priority/getAll");
    const action = getPriority(res.data.content);
    dispatch(action);
  };
};
//   ---------
export const getUserApi = () => {
  return async (dispatch: DispatchType) => {
    const res = await http.get("/api/Users/getUser");
    const action = getUser(res.data.content);
    dispatch(action);
  };
};
//   ----------------create task action-------
export const createTaskAsynAction = createAsyncThunk(
  "loginAsynAction",
  async (task: TypeCreateTask) => {
    try {
      const res = await http.post("/api/Project/createTask", task);

      alert(res.data.message);
      history.push("/projectmanagement");
      return res.data.content;
    } catch (err) {
      console.log(err);
      alert(err.response?.data.message);
    }
  }
);
