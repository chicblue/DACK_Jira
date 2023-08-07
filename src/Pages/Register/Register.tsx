import { Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

import { useFormik } from "formik";
import { http } from "../../Util/Config";
import { history } from "../../index";
import * as yup from "yup";
type Props = {};

export interface UserRegisterFrm {
  email: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
  name: string;
}

export default function Register({}: Props) {
  const registerFrm = useFormik<UserRegisterFrm>({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      phoneNumber: "",
      name: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("email is required")
        .email("Email is invalid !"),
      password: yup
        .string()
        .required("password is required!")
        .min(6, "6 - 32 characters")
        .max(32, "6 - 32 characters"),
      passwordConfirm: yup
        .string()
        .required("password is required")
        .min(6, "6 - 32 characters")
        .max(32, "6 - 32 characters")
        .oneOf([yup.ref("password")], "Passwords do not match"),
      name: yup.string().required("Name is required"),
      phoneNumber: yup
        .string()
        .required("Name cannot be blank !")
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Phone is a number !"),
    }),
    onSubmit: async (values: UserRegisterFrm) => {
      try {
        const res = await http.post("/api/Users/signup", values);
        alert(res.data?.message);
        history.push("/login");
      } catch (err) {
        alert(err.response.data.message);
      }
    },
  });

  return (
    <form className="container" onSubmit={registerFrm.handleSubmit}>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h3 className="text-center ">Register</h3>
        <div className="d-flex" style={{ flexDirection: "column" }}>
          <Input
            style={{ width: "100%", minWidth: 300 }}
            name="name"
            id="name"
            size="large"
            placeholder="Name"
            prefix={<UserOutlined />}
            onInput={registerFrm.handleChange}
            onBlur={registerFrm.handleBlur}
          />
          {registerFrm.errors.name && (
            <p
              className="text-danger text-center "
              style={{ marginBottom: "0" }}
            >
              {registerFrm.errors.name}
            </p>
          )}
        </div>
        <div className="d-flex mt-2" style={{ flexDirection: "column" }}>
          <Input
            style={{ width: "100%", minWidth: 300 }}
            name="email"
            id="email"
            size="large"
            placeholder="Email"
            prefix={<MailOutlined />}
            onInput={registerFrm.handleChange}
            onBlur={registerFrm.handleBlur}
          />
          {registerFrm.errors.email && (
            <p
              className="text-danger text-center "
              style={{ marginBottom: "0" }}
            >
              {registerFrm.errors.email}
            </p>
          )}
        </div>
        <div className="d-flex mt-2" style={{ flexDirection: "column" }}>
          <Input
            style={{ width: "100%", minWidth: 300 }}
            name="phoneNumber"
            id="phoneNumber"
            size="large"
            placeholder="Phone Number"
            prefix={<PhoneOutlined />}
            onInput={registerFrm.handleChange}
            onBlur={registerFrm.handleBlur}
          />
          {registerFrm.errors.phoneNumber && (
            <p
              className="text-danger text-center "
              style={{ marginBottom: "0" }}
            >
              {registerFrm.errors.phoneNumber}
            </p>
          )}
        </div>
        <div className="d-flex mt-2" style={{ flexDirection: "column" }}>
          <Input
            style={{ width: "100%", minWidth: 300 }}
            name="password"
            id="password"
            type="password"
            size="large"
            placeholder="Password"
            prefix={<LockOutlined />}
            onInput={registerFrm.handleChange}
            onBlur={registerFrm.handleBlur}
          />
          {registerFrm.errors.password && (
            <p
              className="text-danger text-center "
              style={{ marginBottom: "0" }}
            >
              {registerFrm.errors.password}
            </p>
          )}
        </div>
        <div className="d-flex mt-2" style={{ flexDirection: "column" }}>
          <Input
            style={{ width: "100%", minWidth: 300 }}
            name="passwordConfirm"
            id="passwordConfirm"
            type="password"
            size="large"
            placeholder="Password Confirm"
            prefix={<LockOutlined />}
            onInput={registerFrm.handleChange}
            onBlur={registerFrm.handleBlur}
          />
          {registerFrm.errors.passwordConfirm && (
            <p
              className="text-danger text-center "
              style={{ marginBottom: "0" }}
            >
              {registerFrm.errors.passwordConfirm}
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
          Register
        </button>
        <p>
          Already have an account?
          <a
            className="text-blue-500"
            style={{ textDecoration: "none" }}
            href="/login"
          >
            {" "}
            Login now
          </a>
        </p>
      </div>
    </form>
  );
}
