import React from 'react'
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../Redux/configStore';
import { drawerComponentContent, drawerOpenClose, drawerTitle } from '../../Redux/Reducers/drawerReducers'
import FormCreateTask from '../Form/FormCreateTask'

type Props = {}

export default function Sidebar({}: Props) {
  
  const dispatch: DispatchType = useDispatch();

  return (
    <div className="sideBar">
    <div className="sideBar-top">
      <div className="sideBar-icon">
        <i className="fab fa-jira" />
      </div>
      <div className="sideBar-icon" data-toggle="modal" data-target="#searchModal" style={{cursor: 'pointer'}}>
        <i className="fa fa-search" />
        <span className="title" >Search Issues</span>
      </div>
      <div className="sideBar-icon" style={{cursor: 'pointer'}}>
        <i className="fa fa-plus" />
        <span className="title" onClick={()=>{
            const actionDrawer = drawerOpenClose(true);
            const actionContent = drawerComponentContent(<FormCreateTask/>);
            const actionTitle = drawerTitle('Create Task');
            dispatch(actionContent);
            dispatch(actionTitle);
            dispatch(actionDrawer);
        }}>Create Task</span>
      </div>
    </div>
    <div className="sideBar-bottom">
      <div className="sideBar-icon">
        <i className="fa fa-question-circle" />
        <span className="title">ABOUT</span>
      </div>
    </div>
  </div>
  )
}