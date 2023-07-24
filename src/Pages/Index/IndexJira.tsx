import React from 'react'
import MainContent from '../../Components/IndexJira/MainJira/MainContent'
import MainHeader from '../../Components/IndexJira/MainJira/MainHeader'
import MainInfo from '../../Components/IndexJira/MainJira/MainInfo'

type Props = {}

export default function IndexJira({}: Props) {
  return (
    <div className='main'>
    <MainHeader/>
    <MainInfo/>
    <MainContent/>
    
    </div>
  )
}