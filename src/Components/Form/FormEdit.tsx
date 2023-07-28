import { Editor } from '@tinymce/tinymce-react'
import { useFormik } from 'formik'
import React ,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../Redux/configStore'
import { Category, categoryAsynAction } from '../../Redux/Reducers/categoryReducer'
import { drawerCallBackSubmit } from '../../Redux/Reducers/drawerReducers'
import { ProjectUpdate, updateAsynAction } from '../../Redux/Reducers/projectChangeReducers'
import { TypeProject } from '../../Redux/Reducers/projectReducer'


type Props = {}

export default function FormEdit({ }: Props) {

    const dispatch:DispatchType = useDispatch();


    const { projectEdit } = useSelector((state: RootState) => state.projectChangeReducers);
    const { arrCategory } = useSelector((state: RootState) => state.categoryReducer);
    
   

    useEffect(()=>{
        const action = drawerCallBackSubmit(editProjectFrm.handleSubmit)
        dispatch(action);
        getDataCategory();
    },[])

    const editProjectFrm  = useFormik<TypeProject>({
        initialValues:projectEdit,
        onSubmit:async(values:TypeProject)=>{
          console.log('giatri',values)
          const actionUpdateApi =updateAsynAction(values)
          dispatch(actionUpdateApi);
        },
        
        
    })


    const renderCategory = (): JSX.Element[] => {
        return arrCategory.map((item: Category, index) => {
          return <option value={item.id} key={index}>{item.projectCategoryName}</option>
        })
      }
      const getDataCategory = async () => {
        const actionApi = categoryAsynAction();
        dispatch(actionApi);
      }
    const handleEditorChange = (e: any) => {

        editProjectFrm.setFieldValue('description',e.target.getContent())

    }

    return (
        <form className='container-fuild' >
            <div className='row'>
                <div className="col-4">
                    <div className="form-group">
                        <p className='font-weight-bold'>Project id</p>
                        <input  value={editProjectFrm.values.id} disabled className='form-control' name='id' />
                    </div>

                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className='font-weight-bold'>Project name</p>
                        <input value={editProjectFrm.values.projectName}className='form-control' name='projectName' onInput={editProjectFrm.handleChange}/>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className='font-weight-bold'>Project Category</p>
                        <select value={editProjectFrm.values.categoryId} className='form-control' name='categoryId'  onChange={editProjectFrm.handleChange}>
                        {renderCategory()}
                        </select>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className='font-weight-bold'>Description</p>
                        <Editor
                            
                            id="description1"
                            initialValue={projectEdit.description}
                            init={{
                                plugins: 'link image code',
                                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                            }}
                            onChange={handleEditorChange}

                        />
                    </div>
                </div>
            </div>
        </form>
    )
}