import React from 'react'
import { Outlet } from 'react-router-dom'
import '../assets/css/index.css'
import MainContent from '../Components/IndexJira/MainJira/MainContent'
import MainHeader from '../Components/IndexJira/MainJira/MainHeader'
import MainInfo from '../Components/IndexJira/MainJira/MainInfo'
import Menu from '../Components/IndexJira/Menu'
import ModalJR from '../Components/IndexJira/Modal/ModalJR'
import Sidebar from '../Components/IndexJira/Sidebar'
type Props = {}

export default function JiRaTemplate({}: Props) {
  return (
   <>
    <div className="jira">
        <Sidebar/>
        <Menu/>
        <Outlet></Outlet>
        <ModalJR/>
        
       


</div>

    
   </>
  )
}