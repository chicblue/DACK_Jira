import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../Redux/configStore";
import { Button, Space, Table, notification } from "antd";
import type { TableProps } from "antd";
import parse from "html-react-parser";
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

interface DataType extends Omit<TypeProject, "members" | "creator"> {
  key: string;
  creator: string;
  member: JSX.Element[];
}

type Props = {};
type NotificationType = "success" | "info" | "warning" | "error";

export default function Home({}: Props) {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };
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
      // filters: [
      //   { text: "Joe", value: "Joe" },
      //   { text: "Jim", value: "Jim" },
      // ],
      // filteredValue: filteredInfo.projectName || null,
      // onFilter: (value, record) => record.projectName.includes(value),
      ellipsis: true,
      render: (text, record) => <div className="text-primary">{text}</div>,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "category",
      // sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
      // sortOrder: sortedInfo.columnKey === "category" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      // filters: [
      //   { text: "London", value: "London" },
      //   { text: "New York", value: "New York" },
      // ],
      // filteredValue: filteredInfo.creator || null,
      // onFilter: (value, record) => record.creator.includes(value),
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
          <button className="btn btn-primary mx-2">
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

  const { arrProject, isDeletedSuccess, error } = useSelector(
    (state: RootState) => state.projectReducer
  );

  console.log(arrProject);

  useEffect(() => {
    dispatch(getAllProjectApi());
  }, []);

  useEffect(() => {
    if (arrProject.length > 0) {
      // Chuyển đổi dữ liệu từ arrProject thành định dạng DataType[] phù hợp cho Table
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
    if (isDeletedSuccess) {
      alert("Xóa thành công");
      dispatch(resetIsDeletedSuccess()); // Reset isDeletedSuccess về false
    }
  }, [isDeletedSuccess]);
  useEffect(() => {
    if (error) {
      // alert(error);
      dispatch(resetError()); // Reset error về null
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
      <>
        {contextHolder}
        <Space>
          <Button onClick={() => openNotificationWithIcon("success")}>
            Success
          </Button>
          <Button onClick={() => openNotificationWithIcon("info")}>Info</Button>
          <Button onClick={() => openNotificationWithIcon("warning")}>
            Warning
          </Button>
          <Button onClick={() => openNotificationWithIcon("error")}>
            Error
          </Button>
        </Space>
      </>
    </div>
  );
}
