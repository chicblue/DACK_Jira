import React from "react";
import { NavLink } from "react-router-dom";
import { clearStore, getStore, USERLOGIN } from "../../Util/Config";
import { history } from "../..";

type Props = {};

export default function Menu({}: Props) {
  const profile = JSON.parse(getStore(USERLOGIN));
  console.log("profile", profile);
  if (!profile) {
    alert("Bạn phải đăng nhập để vào trang này");
    history.push("/login");
  }
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={require("../../assets/img/img/download.jfif")} />
        </div>
        <div className="account-info">
          <p>{profile.name}</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card" />
          <span>
            {" "}
            <NavLink
              className="text-dark"
              style={{ textDecoration: "none" }}
              to="/projectmanagement"
            >
              {" "}
              Project management
            </NavLink>
          </span>
        </div>
        <div>
          <i className="fa fa-credit-card" />
          <span>
            {" "}
            <NavLink
              className="text-dark"
              style={{ textDecoration: "none" }}
              to="/indexjira"
            >
              {" "}
              Cyber Board
            </NavLink>
          </span>
        </div>

        <div>
          <i className="fa fa-cog" />
          <span>
            <NavLink
              className="text-dark"
              style={{ textDecoration: "none" }}
              to="/createproject"
            >
              {" "}
              Create Project{" "}
            </NavLink>
          </span>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box" />
          <span>Components</span>
        </div>
        <div>
          <a
            className="btn btn-outline-secondary"
            onClick={() => {
              clearStore(USERLOGIN);
              window.location.reload(); //F5
            }}
          >
            <i className="fa fa-sign-in"></i> Logout
          </a>
        </div>
      </div>
    </div>
  );
}
