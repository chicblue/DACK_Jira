import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../Redux/configStore";

import { Button, Space, Table, notification } from "antd";
import type { TableProps } from "antd";

import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import {
  TypeProject,
  deleteProjectFromApi,
  getAllProjectApi,
  resetError,
  resetIsDeletedSuccess,
} from "../../Redux/Reducers/projectReducer";
import {
  drawerComponentContent,
  drawerOpenClose,
  drawerProjectDetail,
  drawerTitle,
} from "../../Redux/Reducers/drawerReducers";
import FormEdit from "../../Components/Form/FormEdit";
import { http } from "../../Util/Config";

interface DataType extends Omit<TypeProject, "members" | "creator"> {
  key: string;
  creator: string;
  member: JSX.Element[];
}

type Props = {};

export default function Home({}: Props) {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const [tableData, setTableData] = useState<DataType[]>([]);

  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<DataType>);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "id",
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",

      ellipsis: true,
      render: (text, record) => <div className="text-primary">{text}</div>,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "category",
      ellipsis: true,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      ellipsis: true,
      render: (text) => <div className=" btn btn-outline-success">{text}</div>,
    },
    {
      title: "Member",
      dataIndex: "member",
      key: "member",
      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <div>
          <button
            className="btn btn-primary mx-2"
            onClick={() => {
              handleEditClick(record.id);
              console.log(record.id);
            }}
          >
            <i className="fa fa-edit"></i>
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              handleDeleteProject(record.id);
            }}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  const dispatch: DispatchType = useDispatch();

  const { arrProject, isDeletedSuccess, error, deleteSuccessMessage } =
    useSelector((state: RootState) => state.projectReducer);
  const handleEditClick = async (projectId: number) => {
    try {
      const response = await http.get(
        `/api/Project/getProjectDetail?id=${projectId}`
      );
      const projectDetail = response.data.content;
      console.log(projectDetail);
      if (projectDetail) {
        const actionDrawer = drawerOpenClose(true);
        const actionContent = drawerComponentContent(<FormEdit />);
        const actionTitle = drawerTitle("Edit Task");
        const actionProjectDetail = drawerProjectDetail(projectDetail);
        dispatch(actionContent);
        dispatch(actionTitle);
        dispatch(actionDrawer);
        dispatch(actionProjectDetail);
      }
    } catch (error) {}
  };

  const handleGetProject = async () => {
    const action: any = await getAllProjectApi();
    dispatch(action);
  };

  useEffect(() => {
    handleGetProject();
  }, [isDeletedSuccess]);

  useEffect(() => {
    if (arrProject.length > 0) {
      const convertedData: any = arrProject.map((project) => ({
        key: project.id.toString(),
        id: project.id,
        projectName: project.projectName,
        categoryName: project.categoryName,
        creator: project.creator.name,
        member: project.members.map((member) => (
          <img
            key={member.userId.toString()}
            src={member.avatar}
            alt=""
            width={30}
            height={30}
            className="rounded-circle"
          />
        )),
        description: project.description,
      }));
      setTableData(convertedData);
    }
  }, [arrProject]);
  const handleDeleteProject = (projectId: number) => {
    dispatch(deleteProjectFromApi(projectId));
  };

  useEffect(() => {
    if (isDeletedSuccess && deleteSuccessMessage) {
      notification.success({
        message: "Delete success",
        description: deleteSuccessMessage,
      });

      dispatch(resetIsDeletedSuccess());
    }
  }, [isDeletedSuccess, deleteSuccessMessage]);
  useEffect(() => {
    if (error) {
      dispatch(resetError());
    }
  }, [error]);
  return (
    <div className="container">
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort by ID</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={tableData} onChange={handleChange} />
    </div>
  );
}
