import React from "react";
import ReactDOM from "react-dom/client";

import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";

import { createBrowserHistory } from "history";
import HomeTemplate from "./Templates/HomeTemplate";

import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import SignUpInTemplate from "./Templates/SignUpInTemplate";

import { Provider } from "react-redux";
import { store } from "./Redux/configStore";
import JiRaTemplate from "./Templates/JiRaTemplate";
import IndexJira from "./Pages/Index/IndexJira";
import CreateProject from "./Pages/CreateProject/CreateProject";
import ProjectManagement from "./Pages/ProjectManagement/ProjectManagement";

import ModalDrawer from "./HOC/Modal/ModalDrawer";
import Loading from "./Components/Loading/Loading";

export const history: any = createBrowserHistory();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Loading></Loading>
    <ModalDrawer />
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<SignUpInTemplate />}>
          <Route path="" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/register" element={<Register />}></Route>
        </Route>
        <Route path="" element={<JiRaTemplate />}>
          <Route path="/indexjira" element={<IndexJira />}></Route>
          <Route path="/createproject" element={<CreateProject />}></Route>
          <Route
            path="/projectmanagement"
            element={<ProjectManagement />}
          ></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);
