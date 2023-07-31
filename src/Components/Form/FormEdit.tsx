import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../Redux/configStore";
import {
  Category,
  categoryAsynAction,
} from "../../Redux/Reducers/categoryReducer";
import { drawerCallBackSubmit } from "../../Redux/Reducers/drawerReducers";
import {
  ProjectUpdate,
  actionEditProject,
  updateAsynAction,
} from "../../Redux/Reducers/projectChangeReducers";
import { TypeProject } from "../../Redux/Reducers/projectReducer";

type Props = {};

export default function FormEdit({}: Props) {
  const dispatch: DispatchType = useDispatch();
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const { projectEdit } = useSelector(
    (state: RootState) => state.projectChangeReducers
  );
  const { arrCategory } = useSelector(
    (state: RootState) => state.categoryReducer
  );
  const { projectDetail } = useSelector(
    (state: RootState) => state.drawerReducers
  );
  const initialProjectEdit: TypeProject = projectEdit || {
    members: [],
    creator: { id: 0, name: "" },
    id: 0,
    projectName: "",
    description: "",
    categoryId: 0,
    categoryName: "",
    alias: "",
    deleted: false,
  };
  useEffect(() => {
    if (projectDetail) {
      editProjectFrm.setValues(projectDetail);
    }
  }, [projectDetail]);
  useEffect(() => {
    const action = drawerCallBackSubmit(editProjectFrm.handleSubmit);
    dispatch(action);
    getDataCategory();
  }, []);

  const editProjectFrm = useFormik<TypeProject>({
    initialValues: {
      ...initialProjectEdit,
    },
    onSubmit: async (values: TypeProject) => {
      try {
        const updatedValues: ProjectUpdate = {
          id: values.id,
          projectName: values.projectName,
          creator: 0,
          description: values.description,
          categoryId: String(values.categoryId),
        };

        const actionUpdateApi = updateAsynAction(updatedValues);
        const updatedProject = await dispatch(actionUpdateApi);

        dispatch(actionEditProject(updatedProject.payload));
        console.log("proUp", updatedValues);
        setSubmittedSuccessfully(true);
      } catch (err) {
        console.log(err);
        if (err?.response?.status === 403) {
          alert("Error updating project: " + err.response.data.content);
        } else {
          alert("Failed to update project. Please try again later.");
        }
      }
    },
  });
  const renderCategory = (): JSX.Element[] => {
    return arrCategory.map((item: Category, index) => {
      return (
        <option value={item.id} key={index}>
          {item.projectCategoryName}
        </option>
      );
    });
  };
  const getDataCategory = async () => {
    const actionApi = categoryAsynAction();
    dispatch(actionApi);
  };
  const handleEditorChange = (e: any) => {
    editProjectFrm.setFieldValue("description", e.target.getContent());
  };

  return (
    <form className="container-fuild" onSubmit={editProjectFrm.handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project id</p>
            <input
              value={editProjectFrm.values.id}
              disabled
              className="form-control"
              name="id"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project name</p>
            <input
              value={editProjectFrm.values.projectName}
              className="form-control"
              name="projectName"
              onInput={editProjectFrm.handleChange}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <select
              value={editProjectFrm.values.categoryId}
              className="form-control"
              name="categoryId"
              onChange={editProjectFrm.handleChange}
            >
              {renderCategory()}
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              id="description1"
              initialValue={editProjectFrm.values.description}
              init={{
                plugins: "link image code",
                toolbar:
                  "undo redo | bold italic | alignleft aligncenter alignright | code",
              }}
              onChange={handleEditorChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
