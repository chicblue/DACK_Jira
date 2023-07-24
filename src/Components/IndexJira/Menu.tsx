import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {}

export default function Menu({}: Props) {
  return (
    <div className="menu">
    <div className="account">
      <div className="avatar">
        <img src={require("../../assets/img/img/download.jfif")}  />
      </div>
      <div className="account-info">
        <p>CyberLearn.vn</p>
        <p>Report bugs</p>
      </div>
    </div>
    <div className="control">
      <div>
        <i className="fa fa-credit-card" />
        <span>   <NavLink className="text-dark" style={{textDecoration:'none'}} to="/indexjira" > Cyber Board</NavLink></span>
      </div>
      <div>
        <i className="fa fa-cog" />
        <span><NavLink className="text-dark" style={{textDecoration:'none'}} to="/createproject"> Create Project </NavLink></span>
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
    </div>
  </div>
  )
}