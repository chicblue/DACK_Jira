import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import React from 'react'
export interface DrawerState{
    visible:boolean,
    componentCotent:string
}
const initialState :DrawerState= {
    visible:false,
    componentCotent:'Default'
}

const drawerReducers = createSlice({
  name: 'drawerReducers',
  initialState,
  reducers: {
    drawerOpenClose:(state:DrawerState,action:PayloadAction<boolean>)=>{
        state.visible =action.payload
    },
    drawerComponentContent:(state:DrawerState,action:PayloadAction<string>)=>{
        state.componentCotent=action.payload
    }
  }
});

export const {drawerOpenClose,drawerComponentContent} = drawerReducers.actions

export default drawerReducers.reducer
