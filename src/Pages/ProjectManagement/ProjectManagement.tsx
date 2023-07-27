//
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../Redux/configStore";

import { Button, Space } from "antd";
import {
  Member,
  TypeProject,
  getAllProjectApi,
} from "../../Redux/Reducers/projectReducer";

type Props = {};

export default function Home({}: Props) {
  const { arrProject } = useSelector(
    (state: RootState) => state.projectReducer
  );
  console.log(arrProject);
  const handleGetProject = async () => {
    const action: any = await getAllProjectApi();
    dispatch(action);
  };
  useEffect(() => {
    handleGetProject();
  }, []);
  const dispatch: DispatchType = useDispatch();
  const renderProject = (): JSX.Element[] => {
    return arrProject.map((project: TypeProject, index) => {
      return (
        <tr key={index}>
          <td>{project.id}</td>
          <td className="text-primary">{project.projectName}</td>
          <td>{project.categoryName}</td>
          <td>
            <Button type="primary" ghost className="text-success">
              {project.creator.name}
            </Button>
          </td>
          <td className="d-flex">
            {project.members.map((member: Member, index) => {
              return (
                <div key={index}>
                  <img
                    src={member.avatar}
                    alt=""
                    width={30}
                    height={30}
                    className="rounded-circle"
                  />
                </div>
              );
            })}
          </td>
          <td>
            <button
              className="btn btn-primary"
              style={{ width: 40, height: 40 }}
            >
              <i className="fa fa-edit"></i>
            </button>
            <button
              className="btn btn-danger"
              style={{ width: 40, height: 40 }}
            >
              <i className="fa fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="container home">
      <div className="home__title">
        <h1>Project management</h1>
        <div className="home__title-button">
          <button className="btn">Sort age</button>
          <button className="btn">Clear fillters</button>
          <button className="btn">Clear fillters and sorters</button>
        </div>
        <div className="home__projects">
          <table className="home__projects-list table">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Project name</th>
                <th>Category</th>
                <th>Creator</th>
                <th>Members</th>
                <th>Actions</th>
              </tr>
              {renderProject()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
