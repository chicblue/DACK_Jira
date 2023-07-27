import React from "react";
import { Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { useFormik } from "formik";
import { DispatchType } from "../../Redux/configStore";
import { useDispatch } from "react-redux";
import { loginAsynAction } from "../../Redux/Reducers/userReducer";
import * as Yup from "yup";

type Props = {};

export interface UserLoginFrm {
  email: string;
  password: string;
}

export default function Login({}: Props) {
  const dispatch: DispatchType = useDispatch();

  const loginFrm = useFormik<UserLoginFrm>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("password is required"),
    }),
    onSubmit: (values: UserLoginFrm) => {
      console.log(values);
      const actionApi = loginAsynAction(values);
      dispatch(actionApi);
    },
  });
  return (
    <form className="container" onSubmit={loginFrm.handleSubmit}>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h3 className="text-center ">LogIn</h3>
        <div className="d-flex" style={{ flexDirection: "column" }}>
          <Input
            style={{ width: "100%", minWidth: 300 }}
            name="email"
            id="email"
            size="large"
            placeholder="email"
            prefix={<UserOutlined />}
            onInput={loginFrm.handleChange}
            onBlur={loginFrm.handleBlur}
          />
          {loginFrm.errors.email && (
            <p
              className="text-danger text-center "
              style={{ marginBottom: "0" }}
            >
              {loginFrm.errors.email}
            </p>
          )}
        </div>
        <div className="d-flex mt-3" style={{ flexDirection: "column" }}>
          <Input
            style={{ width: "100%", minWidth: 300 }}
            name="password"
            id="password"
            type="password"
            size="large"
            placeholder="password"
            prefix={<LockOutlined />}
            onInput={loginFrm.handleChange}
            onBlur={loginFrm.handleBlur}
          />
          {loginFrm.errors.password && (
            <p
              className="text-danger text-center "
              style={{ marginBottom: "0" }}
            >
              {loginFrm.errors.password}
            </p>
          )}
        </div>
        <button
          type="submit"
          style={{
            minWidth: 300,
            backgroundColor: "rgb(102,117,223",
            color: "#fff",
          }}
          className=" btn mt-3"
        >
          Login
        </button>
        <p>
          Don't have an account yet?
          <a
            className="text-blue-500"
            style={{ textDecoration: "none" }}
            href="/register"
          >
            {" "}
            Register now
          </a>
        </p>

        <div className="social mt-3 d-flex">
          <Button
            className="mx-2"
            // style={{ backgroundColor: "rgb(59,89,152)" }}
            shape="circle"
            size={"large"}
          >
            <i className="fab fa-facebook-f"></i>
          </Button>
          <Button
            typeof="primary ml-3"
            shape="circle"
            size={"large"}
            className="mx-2"
          >
            <i className="fab fa-twitter"></i>
          </Button>
        </div>
      </div>
    </form>
  );
}
