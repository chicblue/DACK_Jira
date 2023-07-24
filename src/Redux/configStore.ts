import {configureStore} from '@reduxjs/toolkit'
import userReducer from './Reducers/userReducer';


export const store = configureStore({
    reducer:{
        userReducer:userReducer
    }
});



// lấy kiểu dữ liệu của store
export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch