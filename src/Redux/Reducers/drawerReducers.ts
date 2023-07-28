import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import React from 'react'
import FormEdit from '../../Components/Form/FormEdit';

export interface DrawerState{
    visible:boolean,
    componentCotent: any,
    callBackSubmit:any
}
const initialState :DrawerState= {
    visible:false,
    componentCotent: '',
    callBackSubmit:():void=>{alert('demo')

    }
}

const drawerReducers = createSlice({
  name: 'drawerReducers',
  initialState,
  reducers: {
    drawerOpenClose:(state:DrawerState,action:PayloadAction<boolean>)=>{
        state.visible =action.payload
    },
    drawerComponentContent:(state:DrawerState,action:PayloadAction<JSX.Element>)=>{
        state.componentCotent=action.payload
    },
    drawerCallBackSubmit:(state:DrawerState,action:PayloadAction<any>)=>{
      state.callBackSubmit=action.payload
  }
  }
});

export const {drawerOpenClose,drawerComponentContent,drawerCallBackSubmit} = drawerReducers.actions

export default drawerReducers.reducer
