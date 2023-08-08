import React, {useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import MainContent from '../../Components/IndexJira/MainJira/MainContent'
import MainHeader from '../../Components/IndexJira/MainJira/MainHeader'
import MainInfo from '../../Components/IndexJira/MainJira/MainInfo'
import { DispatchType, RootState } from '../../Redux/configStore'
import { getProjectDetailApi } from '../../Redux/Reducers/projectReducer'

type Props = {}

export default function IndexJira( {}:Props) {

  const dispatch: DispatchType = useDispatch();
  const {projectId}=useParams();
 

  useEffect(()=>{
    
    const actionGetDetail =getProjectDetailApi(projectId);
    dispatch(actionGetDetail);
  },[])
  return (
    <div className='main'>
    <MainHeader/>
    <MainInfo />
    <MainContent/>
    
    </div>
  )
}