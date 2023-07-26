//rxslice
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserLoginFrm } from "../../Pages/Login/Login";
import { getStoreJson, http, setStoreJson, USERLOGIN } from "../../Util/Config";
import { history } from "../..";

export interface UserLoginApi {
  email: "";
  password: "";
}

export interface UsersState {
  userLogin: UserLoginApi | undefined;
}

const initialState = {
  userLogin: getStoreJson(USERLOGIN),
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      loginAsynAction.fulfilled,
      (state: UsersState, action: PayloadAction<UserLoginApi>) => {
        state.userLogin = action.payload;
      }
    );
  },
});

export const {} = userReducer.actions;

export default userReducer.reducer;

// ------------------action asyn--------------
export const loginAsynAction = createAsyncThunk(
  "loginAsynAction",

  async (userLogin: UserLoginFrm) => {
    try {
      const res = await http.post("/api/Users/signin", userLogin);
      setStoreJson(USERLOGIN, res.data.content);
      alert(res.data.message);
      history.push("/indexjira");
      return res.data.content;
    } catch (err) {
      alert(err.response?.data.message);
    }
  }
);
