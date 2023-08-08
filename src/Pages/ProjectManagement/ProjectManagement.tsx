import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../Redux/configStore";

import {
  Button,
  Space,
  Table,
  notification,
  Popover,
  Avatar,
  AutoComplete,
  Select,
} from "antd";
import { TableProps, Alert } from "antd";

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
  ProjectDetail,
  drawerComponentContent,
  drawerOpenClose,
  drawerProjectDetail,
  drawerTitle,
} from "../../Redux/Reducers/drawerReducers";
import FormEdit from "../../Components/Form/FormEdit";
import { http } from "../../Util/Config";
import {
  getUserSearchApi,
  getUserApi,
} from "../../Redux/Reducers/createTaskReducer";

import { number } from "yup";
import {
  displayLoading,
  hideLoading,
} from "../../Redux/Reducers/loadingReducer";
// import { getUserApi, getUserSearchApi } from "../../Redux/Reducers/createTaskReducer";

interface DataType extends Omit<TypeProject, "creator"> {
  key: string;
  creator: string;
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
      key: "categoryName",
      ellipsis: true,
      filters: [
        {
          text: "Dự án web",
          value: "Dự án web",
        },
        {
          text: "Dự án di động",
          value: "Dự án di động",
        },
        {
          text: "Dự án phần mềm",
          value: "Dự án phần mềm",
        },
      ],
      filterMode: "menu",
      filterSearch: true,
      filteredValue: filteredInfo.categoryName || null,
      onFilter: (value: any, record) => record.categoryName.startsWith(value),
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      ellipsis: true,
      render: (text) => <Alert message={text} type="success" />,
    },
    {
      title: "Member",
      dataIndex: "members",
      key: "members",
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
  const { visible } = useSelector((state: RootState) => state.loadingReducer);

  const handleEditClick = async (projectId: number) => {
    try {
      dispatch(displayLoading());
      const response = await http.get(
        `/api/Project/getProjectDetail?id=${projectId}`
      );
      const projectDetail: ProjectDetail = response.data.content;
      if (projectDetail) {
        const actionDrawer = drawerOpenClose(true);
        const actionContent = drawerComponentContent(<FormEdit />);
        const actionTitle = drawerTitle("Edit Task");
        const actionProjectDetail = drawerProjectDetail(projectDetail);
        dispatch(actionContent);
        dispatch(actionTitle);
        dispatch(actionDrawer);
        dispatch(actionProjectDetail);
        dispatch(hideLoading());
      }
    } catch (error) {}
  };

  const handleGetProject = async () => {
    try {
      const action = await getAllProjectApi();
      dispatch(action);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    handleGetProject();
  }, [isDeletedSuccess]);
  const { userSearch, arrUser } = useSelector(
    (state: RootState) => state.createTaskReducer
  );

  const getDataUserSearch = async (value: string) => {
    const actionUserSearch = getUserSearchApi(value);
    dispatch(actionUserSearch);
  };

  useEffect(() => {
    getDataUser();
  }, []);
  const userOptions = arrUser.map((item, index) => {
    return { value: item.userId, label: item.name };
  });
  const getDataUser = async () => {
    const action: any = await getUserApi();
    dispatch(action);
  };
  useEffect(() => {
    getDataUser();
  }, []);
  console.log(userSearch);
  useEffect(() => {
    if (arrProject.length > 0) {
      const convertedData: any = arrProject.map((project, index) => ({
        key: index,
        id: project.id,
        projectName: project.projectName,
        categoryName: project.categoryName,
        creator: project.creator.name,
       
        members: project.members.slice(0, 3).map((member, index) =>{
          return <Popover placement="top" title={'member'} content={(()=>{
            return  <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Avatar</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {project.members?.map((item,index)=>{
                  return <tr>
                      <td>{item.userId}</td>
                      <td><Avatar key={index} src={item.avatar}/></td>
                      <td>{item.name}</td>
                      <td>
                        <button className="btn btn-danger" onClick={async()=>{
                            const removeMem={
                              projectId: project.id,
                              userId:item.userId
                            }
                          try {
                            const res = await http.post(
                              "/api/Project/removeUserFromProject",removeMem
                            );
                              console.log(res)
                            alert("Xóa Thành Công ");
                            window.location.reload();
                          } catch (err) {
                            alert("Xóa Thất Bại !!!!");
                            console.log(err)
                          }
                        }}>X</button>
                      </td>
                  </tr>
                })}
              </tbody>
            </table>
          })} trigger="hover">
          <Avatar key={index} src={member.avatar}/>
        </Popover>
        } 
          
        ),
        description: project.description,
      }));
      convertedData.forEach((data: any) => {
        data.members.push(
          <Popover
            placement="rightTop"
            title={"Add User"}
            content={() => {
              return (
                <Select
                  style={{ width: "100%" }}
                  defaultValue={[]}
                  mode="multiple"
                  options={userOptions}
                  onSelect={async (value, option) => {
                    const addMember = {
                      projectId: data.id,
                      userId: value,
                    };
                    console.log(addMember);
                    try {
                      const res = await http.post(
                        "/api/Project/assignUserProject",
                        addMember
                      );
                      console.log(res);
                      alert("Thêm Mới Thành Công ");
                      window.location.reload();
                    } catch (err) {
                      alert("Thất Bại !!!!");
                      console.log(err);
                    }
                  }}
                  optionFilterProp="label"
                />
              );
            }}
            trigger="click"
          >
            <button className="btn rounded-circle border">+</button>
          </Popover>
        );
      });
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
