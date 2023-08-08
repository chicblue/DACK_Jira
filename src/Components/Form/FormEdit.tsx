import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../Redux/configStore";
import { categoryAsynAction } from "../../Redux/Reducers/categoryReducer";
import { drawerCallBackSubmit } from "../../Redux/Reducers/drawerReducers";
import { actionEditProject } from "../../Redux/Reducers/projectChangeReducers";
import {
  TypeProject,
  resetError,
  resetIsUpdateSuccess,
  updateAsynAction,
} from "../../Redux/Reducers/projectReducer";
import { notification } from "antd";

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
  console.log("detail", projectDetail);
  const { isUpdateSuccess, updateSuccessMessage, error, projectUpdate } =
    useSelector((state: RootState) => state.projectReducer);
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
      editProjectFrm.setValues((prevValues) => ({
        ...prevValues,
        id: projectDetail.id,
        projectName: projectDetail.projectName,
        description: projectDetail.description,
        categoryId: projectDetail.projectCategory.id,
        // ... other fields
      }));
    }
  }, [projectDetail]);
  useEffect(() => {
    const action = drawerCallBackSubmit(editProjectFrm.handleSubmit);
    dispatch(action);
    getDataCategory();
  }, []);

  const editProjectFrm = useFormik<any>({
    initialValues: {
      id: 1,
      projectName: "",
      description: "",
      projectCategory: {
        id: 0,
        name: "",
      },
    },
    onSubmit: async (values: TypeProject) => {
      try {
        const projectUpdate: any = {
          id: values.id,
          projectName: values.projectName,
          creator: 0,
          description: values.description,
          categoryId: values.categoryId,
        };

        const actionUpdateApi = updateAsynAction(projectUpdate);
        const updatedProject: any = await dispatch(actionUpdateApi);

        dispatch(actionEditProject(updatedProject.payload));
        console.log("proUp", projectUpdate);
        setSubmittedSuccessfully(true);
      } catch (err) {
        console.log(err);
        if (err?.response?.status === 403) {
          alert("Error updating project: " + err.response.data.content);
        } else {
          alert("Failed to update project. Please try again later.");
        }
      }
      console.log("cateID", projectUpdate.categoryId);
    },
  });

  useEffect(() => {
    if (isUpdateSuccess && updateSuccessMessage) {
      notification.success({
        message: "Update success",
        description: updateSuccessMessage,
      });

      dispatch(resetIsUpdateSuccess());
    }
  }, [isUpdateSuccess, updateSuccessMessage]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Update failed",
        description: error,
      });
      dispatch(resetError());
    }
  }, [error]);

  const getDataCategory = async () => {
    const actionApi = categoryAsynAction();
    dispatch(actionApi);
  };
  const handleEditorChange = (content: string) => {
    editProjectFrm.setFieldValue("description", content);
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = parseInt(event.target.value, 10);
    editProjectFrm.setFieldValue("categoryId", selectedCategoryId);
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
              onChange={editProjectFrm.handleChange}
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
              onChange={handleSelectChange}
            >
              <option value={1}>Dự án web</option>
              <option value={2}>Dự án phần mềm</option>
              <option value={3}>Dự án di động</option>
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              value={editProjectFrm.values.description}
              id="description1"
              init={{
                plugins: "link image code",
                toolbar:
                  "undo redo | bold italic | alignleft aligncenter alignright | code",
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
