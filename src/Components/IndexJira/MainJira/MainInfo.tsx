import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/configStore';
import { Parser } from "html-to-react";

type Props = {}

export default function MainInfo({}: Props) {

  const htmlParser =  Parser();
  const {ProjectDetail}=useSelector((state:RootState)=>state.projectReducer);
  const projectMember = ProjectDetail.members
  const renderMember =()=>{
    return projectMember?.map((user,index)=>{
      return <div className='avatar'>
        <img style={{height:'25px',width:'25px'}}src={user.avatar} alt={user.avatar} key={index}/>
      </div>
    })
  }

  return (
    <div className='main'>
      <h3>{ProjectDetail.projectName}</h3>
      <section>
        {htmlParser.parse(ProjectDetail.description)}
      </section>
    <div className="info" style={{display: 'flex'}}>
    <div className="search-block">
      <input className="search" />
      <i className="fa fa-search" />
    </div>
    <div className="avatar-group" style={{display: 'flex'}}>
      {renderMember()}
    </div>
    <div style={{marginLeft: 20}} className="text">Only My Issues</div>
    <div style={{marginLeft: 20}} className="text">Recently Updated</div>
  </div>
  </div>
  )
}