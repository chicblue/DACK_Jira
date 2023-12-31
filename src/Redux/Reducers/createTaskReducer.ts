import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { history } from "../..";
import { TypeCreateTask } from "../../Components/Form/FormCreateTask";
import { http } from "../../Util/Config";
import { DispatchType } from "../configStore";

export interface TaskType {
  id: number,
  taskType: string

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
export interface Status {
  statusId: number,
  statusName: string,
  alias: string,
  deleted: boolean
}
export interface CreateTaskState {
  arrTaskType: TaskType[],
  arrPriority: Priority[],
  arrUser: User[],
  userProject: User[]|null,
  arrStatus:Status[]
  
}

const initialState: CreateTaskState = {
  arrTaskType: [],
  arrPriority: [],
  arrUser: [],
  arrStatus:[],
  userProject: [
    {userId: 0,
      name:'',
      avatar:'',
      email:'',
      phoneNumber:''
    }],
}


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
    getUser: (
      state: CreateTaskState,
      action: PayloadAction<User[]>
    ) => {
      state.arrUser = action.payload;
    },
    getUserProject: (
      state: CreateTaskState,
      action: PayloadAction<User[]>
    ) => {
      state.userProject = action.payload;
     
    },
    getStatus:(
      state:CreateTaskState,
      action:PayloadAction<Status[]>
    )=>{
      state.arrStatus=action.payload
     
    },
   
  },

});

export const { getTaskType, getPriority,getUser, getStatus ,getUserProject} = createTaskReducer.actions

export default createTaskReducer.reducer



// -------------action Api---------------
export const getTaskTypeApi = () => {
  return async (dispatch: DispatchType) => {
    const res = await http.get("api/TaskType/getAll");
   
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
   
    const res = await http.get("api/Users/getUser");
    const action = getUser(res.data.content);
    dispatch(action);
  };
};
// ----------------
export const getUserProjectApi = (keyword) => {
  return async (dispatch: DispatchType) => {
    try{
    const res = await http.get(`api/Users/getUserByProjectId?idProject=${keyword}`);
    const action = getUserProject(res.data.content);
    dispatch(action);
    }catch(err){
      alert('Dự Án Chưa Có Thành Viên')
    }
  };
};
// ----------

export const getStatusIdApi = () => {
  return async (dispatch: DispatchType) => {
    const res = await http.get("api/Status/getAll");
    const action = getStatus(res.data.content);
    dispatch(action);
  };
};
//--------------

//   ----------------create task action-------
export const createTaskAsynAction = createAsyncThunk(
  "createTaskAsynAction",
  async (task: TypeCreateTask) => {
    try {
      const res = await http.post("api/Project/createTask", task);

      alert('Tạo Task Thành Công');
      history.push("/projectmanagement");
      window.location.reload();
      return res.data.content;
    } catch (err) {
      console.log(err)
      alert('Tạo Task Thất Bại');
    }
  }
);

