import React from 'react'

type Props = {}

export default function MainInfo({}: Props) {
  return (
    <div className='main'>
      <h3>Cyber Board</h3>
    <div className="info" style={{display: 'flex'}}>
    <div className="search-block">
      <input className="search" />
      <i className="fa fa-search" />
    </div>
    <div className="avatar-group" style={{display: 'flex'}}>
      <div className="avatar">
        <img src={require("../../../assets/img/img/download (1).jfif")} />
      </div>
      <div className="avatar">
        <img src={require("../../../assets/img/img/download (2).jfif")} />
      </div>
      <div className="avatar">
        <img src={require("../../../assets/img/img/download (3).jfif")}/>
      </div>
    </div>
    <div style={{marginLeft: 20}} className="text">Only My Issues</div>
    <div style={{marginLeft: 20}} className="text">Recently Updated</div>
  </div>
  </div>
  )
}