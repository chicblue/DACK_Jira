import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/configStore';

type Props = {}

export default function MainHeader({}: Props) {

  const {ProjectDetail}=useSelector((state:RootState)=>state.projectReducer);
  const projectName = ProjectDetail.projectName

  return (
    <div className="header">
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb" style={{backgroundColor: 'white'}}>
        <li className="breadcrumb-item">Project</li>
        <li className="breadcrumb-item">CyberLearn</li>
        <li className="breadcrumb-item active" aria-current="page">
     { projectName}
        </li>
      </ol>
    </nav>
  </div>
  )
}