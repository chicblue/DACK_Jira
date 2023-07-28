import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { http } from '../../Util/Config';
import { TypeProject } from './projectReducer';


export interface ProjectUpdate {
    id: number;
    projectName: string;
    creator: number;
    description: string;
    categoryId: string;
}



export interface projectChangeState {
    projectEdit: TypeProject
}
const initialState: projectChangeState = {
    projectEdit:
    {
        members: [],
        creator: { id: 1, name: '' },
        id: 0,
        projectName: 'string',
        description: 'string',
        categoryId: 0,
        categoryName: 'string',
        alias: 'string',
        deleted: false,

    }


}

const projectChangeReducers = createSlice({
    name: 'projectChangeReducers',
    initialState,
    reducers: {
        actionEditProject: (state: projectChangeState, action: PayloadAction<TypeProject>) => {
            state.projectEdit = action.payload
        }
    },

});

export const { actionEditProject } = projectChangeReducers.actions

export default projectChangeReducers.reducer
// action asyn-----------------
export const updateAsynAction = createAsyncThunk(
    "loginAsynAction",
    async (EditFrm: TypeProject) => {
        try {
            const res = await http.put(`api/Project/updateProject?projectId=${EditFrm.id}`, EditFrm);

            alert(res.data.message);

            return res.data.content;
        } catch (err) {
            console.log(err)
            alert('fail');
        }
    }
);