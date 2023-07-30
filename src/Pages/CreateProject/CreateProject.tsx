import React, { useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../Redux/configStore';
import { Category, categoryAsynAction } from '../../Redux/Reducers/categoryReducer';
import {  Formik, useFormik } from 'formik';
import { http } from '../../Util/Config';
type Props = {
  
}

export interface createProjectFrm {
  projectName: string;
  description: string;
  categoryId: number;
  alias: string;
}
export default function CreateProject({}: Props) {

  
  
 
  const { arrCategory } = useSelector((state: RootState) => state.categoryReducer);

  const dispatch: DispatchType = useDispatch();


  const getDataCategory = async () => {
    const actionApi = categoryAsynAction();
    dispatch(actionApi);
  }
  const handleEditorChange = (e:any) => {
    
    createProjectFrm.setFieldValue('description',e.target.getContent())
    
  }
  useEffect(() => {
    getDataCategory();
  }, [])

    const renderCategory = (): JSX.Element[] => {
    return arrCategory.map((item: Category, index) => {
      return <option value={item.id} key={index}>{item.projectCategoryName}</option>
    })
  }
  



 

  const createProjectFrm  = useFormik<createProjectFrm>({
      initialValues:{
        projectName: '',
        description:'' ,
        categoryId:0,
        alias:'',
      },
      onSubmit:async(values:createProjectFrm)=>{
        console.log('giatri',values)
        try{
          const res = await http.post("api/Project/createProjectAuthorize", values);
          alert('Khởi Tạo Dự Án Thành Công ');
         
          
  
        }catch(err){
          alert('Tên dự án đã được sử dụng');
        }
      },
      
      
  })



  return (
    <div className='container mt-5'>
      <h3>CreateProject</h3>
      <form className='container' onSubmit={createProjectFrm.handleSubmit}  >
        <div className='form-group'>
          <p>Name</p>
          <input className='form-control' name='projectName' id='projectName' onChange={createProjectFrm.handleChange}/>
        </div>
        <div className='form-group'>
          <p>Description</p>
          <Editor
           
            id="description"
            initialValue=""
            init={{
              plugins: 'link image code',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            }}
            onChange={handleEditorChange}
            
          />
        </div>
        <div className='form-group'>
          <select className='form-control' name='categoryId' onChange={createProjectFrm.handleChange}>
            {renderCategory()}
          </select>
        </div>
        <button className='btn btn-outline-primary' type='submit' >Create Project</button>
      </form>
    </div>
  )
}


