import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/configStore';

type Props = {}

export default function MainContent({ }: Props) {

  const {ProjectDetail}=useSelector((state:RootState)=>state.projectReducer);

  const renderCardTaskList = ()=>{
    return ProjectDetail.lstTask?.map((task,index)=>{
      return <>
      <div key={index} className="card" style={{ width: '17rem', height: '25rem' }}>
        <div className="card-header">
         {task.statusName}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }}>
            <p>
              Each issue has a single reporter but can have multiple
              assignees
            </p>
            <div className="block" style={{ display: 'flex' }}>
              <div className="block-left">
                <i className="fa fa-bookmark" />
                <i className="fa fa-arrow-up" />
              </div>
              <div className="block-right">
                <div className="avatar-group" style={{ display: 'flex' }}>
                  <div className="avatar">
                    <img src={require("../../../assets/img/img/download (1).jfif")} />
                  </div>
                  <div className="avatar">
                    <img src={require("../../../assets/img/img/download (2).jfif")} />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <p>
              Each issue has a single reporter but can have multiple
              assignees
            </p>
            <div className="block" style={{ display: 'flex' }}>
              <div className="block-left">
                <i className="fa fa-check-square" />
                <i className="fa fa-arrow-up" />
              </div>
              <div className="block-right">
                <div className="avatar-group" style={{ display: 'flex' }}>
                  <div className="avatar">
                    <img src={require("../../../assets/img/img/download (1).jfif")}/>
                  </div>
                  <div className="avatar">
                    <img src={require("../../../assets/img/img/download (2).jfif")} />
                  </div>
                </div>
              </div>
            </div>
          </li>
          
        </ul>
      </div>
   
      </>
      
    })
  }



  return (
    <div className="content" style={{ display: 'flex' }}>
      {renderCardTaskList()}
    </div>
  )
}



