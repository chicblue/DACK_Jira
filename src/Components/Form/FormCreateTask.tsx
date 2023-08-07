import { Editor } from "@tinymce/tinymce-react";
import React, { useState, useEffect } from "react";
import { Radio, Select, Space, Slider } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { SelectProps, RadioChangeEvent } from "antd";
import { DispatchType, RootState } from "../../Redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { TypeProject } from "../../Redux/Reducers/projectReducer";
import {
  createTaskAsynAction,
  getPriorityApi,
  getStatusIdApi,
  getTaskTypeApi,
  getUserApi,
  Priority,
  Status,
  TaskType,
} from "../../Redux/Reducers/createTaskReducer";
import { useFormik } from "formik";
import { http } from "../../Util/Config";
import { string } from "yup";
import { drawerCallBackSubmit } from "../../Redux/Reducers/drawerReducers";

type Props = {};

interface TypeTracking {
  timeTrackingSpent: Number;
  timeTrackingRemaining: Number;
}
export interface TypeCreateTask {
  listUserAsign: [];
  taskName: string;
  description: string;
  statusId: string;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  projectId: number;
  typeId: number;
  priotityId: number;
}
export default function FormCreateTask({}: Props) {
  const [timeTracking, settimeTracking] = useState<TypeTracking>({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  const dispatch: DispatchType = useDispatch();
  const { arrProject } = useSelector(
    (state: RootState) => state.projectReducer
  );
  const { arrTaskType, arrPriority, arrUser,arrStatus } = useSelector(
    (state: RootState) => state.createTaskReducer
  );
  const userOptions = arrUser.map((item, index) => {
    return { value: item.userId, label: item.name };
  });

  const handleChange = (value: string | string[]) => {
    createTaskFrm.setFieldValue("listUserAsign", value);
    console.log(value);
  };

  const handleEditorChange = (e: any) => {
    createTaskFrm.setFieldValue("description", e.target.getContent());
    console.log(e.target.getContent());
  };
  const getDataTaskType = async () => {
    const action: any = await getTaskTypeApi();
    dispatch(action);
  };
  const getDataPriority = async () => {
    const action: any = await getPriorityApi();
    dispatch(action);
  };
  const getDataUser = async () => {
    const action: any = await getUserApi();
    dispatch(action);
  };
  const getDataStatus = async () => {
    const action: any = await getStatusIdApi();
    dispatch(action);
  };

  useEffect(() => {
    getDataTaskType();
    getDataPriority();
    getDataUser();
    getDataStatus();
    const action = drawerCallBackSubmit(createTaskFrm.handleSubmit);
    dispatch(action);
  }, []);

  const createTaskFrm = useFormik<TypeCreateTask>({
    initialValues: {
      listUserAsign: [],
      taskName: "",
      description: "",
  
      statusId: "",
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: 0,
      typeId: 0,
      priotityId:0,
    },
    onSubmit: async (values: TypeCreateTask) => {
      console.log("giatri", values);
      const actionApi = createTaskAsynAction(values);
      dispatch(actionApi);
    },
  });

  return (
    <form className="container" onSubmit={createTaskFrm.handleSubmit}>
      <div className="form-group">
        <p>Project</p>
        <select
          name="projectId"
          className="form-control"
          onChange={createTaskFrm.handleChange}
        >
          {arrProject.map((project: TypeProject, index) => {
            const projectId = project.id as number;
            return (
              <option key={index} value={projectId}>
                {project.projectName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <p>Task Name</p>
        <input
          name="taskName"
          className="form-control"
          onChange={createTaskFrm.handleChange}
        />
      </div>
      <div className="form-group">
        <p>Status</p>
        <select name="statusId"
          className="form-control"
          onChange={createTaskFrm.handleChange}>
            {arrStatus.map((item: Status, index) => {
                return (
                  <option key={index} value={item.statusId}>
                    {item.statusName}
                  </option>
                );
              })}
          </select>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Priotity</p>
            <select
              name="priorityId"
              className="form-control"
              onChange={createTaskFrm.handleChange}
            >
              {arrPriority.map((item: Priority, index) => {
                return (
                  <option key={index} value={item.priorityId}>
                    {item.priority}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-6">
            <p>Task Type</p>
            <select
              name="typeId"
              className="form-control"
              onChange={createTaskFrm.handleChange}
            >
              {arrTaskType.map((task: TaskType, index) => {
                return (
                  <option key={index} value={task.id}>
                    {task.taskType}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p className="font-weight-bold">Assignees</p>
            <Select
              id="listUserAsign"
              mode="multiple"
              placeholder="Please select"
              defaultValue={[]}
              onChange={handleChange}
              onSelect={(value) => {
                console.log(value);
              }}
              style={{ width: "100%" }}
              options={userOptions}
              optionFilterProp="label"
            />
            <div className="row">
              <div className="col-12 mt-3">
                <p className="font-weight-bold">Original Estimate</p>
                <input
                  type="number"
                  defaultValue={0}
                  min={0}
                  className="form-control"
                  name="originalEstimate"
                  onChange={createTaskFrm.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <p className="font-weight-bold">Time Tracking</p>
            <Slider
              defaultValue={30}
              value={Number(timeTracking.timeTrackingSpent)}
              tooltip={{ open: true }}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
            />
            <div className="row">
              <div className="col-6 text-left font-weight-bold">
                {Number(timeTracking.timeTrackingSpent)} logged
              </div>
              <div className="col-6 text-right font-weight-bold">
                {Number(timeTracking.timeTrackingRemaining)} remaining
              </div>
            </div>
            <div className="row ">
              <div className="col-6">
                <p>Time spent</p>
                <input
                  type="number"
                  defaultValue={0}
                  min={0}
                  className="form-control"
                  name="timeTrackingSpent"
                  onChange={(e) => {
                    settimeTracking({
                      ...timeTracking,
                      timeTrackingSpent: Number(e.target.value),
                    });
                    createTaskFrm.setFieldValue(
                      "timeTrackingSpent",
                      e.target.value
                    );
                  }}
                />
              </div>
              <div className="col-6">
                <p>Time remaining</p>
                <input
                  type="number"
                  min={0}
                  defaultValue={0}
                  className="form-control"
                  name="timeTrackingRemaining"
                  onChange={(e) => {
                    settimeTracking({
                      ...timeTracking,
                      timeTrackingRemaining: Number(e.target.value),
                    });
                    createTaskFrm.setFieldValue(
                      "timeTrackingRemaining",
                      e.target.value
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <p>Description</p>
        <Editor
          tagName="description"
          initialValue=""
          init={{
            plugins: "link image code",
            toolbar:
              "undo redo | bold italic | alignleft aligncenter alignright | code",
          }}
          onChange={handleEditorChange}
        />
      </div>
     
    </form>
  );
}
