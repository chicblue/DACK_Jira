import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { http } from '../../Util/Config';

export interface Category {
    id: number;
    projectCategoryName: string;
}


export interface CategoryState {
    arrCategory:Category[]
}

const initialState :CategoryState = {
    arrCategory :[]
}

const categoryReducer = createSlice({
    name: 'categoryReducer',
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(categoryAsynAction.fulfilled,(state:CategoryState,action:PayloadAction<Category[]>)=>{
            state.arrCategory = action.payload
        })
      }
});

export const { } = categoryReducer.actions

export default categoryReducer.reducer
// -----------action async----------
// categoryAsynAction
export const categoryAsynAction = createAsyncThunk('categoryAsynAction',async()=>{
    const res = await http.get('/api/ProjectCategory')
    
    return res.data.content
})
// createProjectAction

