import { Button, message, Popconfirm, Space, Table, Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { pageTitle } from "../../../ultils";
import {  AsyncDeleteUser } from "../../../app/stores/thunks/userThunk";
import { useAppDispatch, useAppSelector } from './../../../app/stores/hooks';
import TableCustom from "../../../components/admin/DataTable";
type Props = {};

const UserList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { users, errorMessage } = useAppSelector(state => state.userReducer);
  console.log('userList',users);
  
  React.useEffect(() => {
    document.title = "Admin | Users";
    pageTitle("Danh sách người dùng")

  }, []);
  const columnUserList: any = [
    {
      title: "IMAGE",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: any) => (
        <Link to={`${record?._id}/edit`}>
          <img width="40px" src={record?.image } alt="" />
        </Link>
      ),
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}/edit`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.email}
          </Link>
        </div>
      ),
    },
    {
      title: "DISPLAY",
      dataIndex: "status",
      key: "status",
      render: (_: any, { status }: any) => (
        <Tag
          color={status == "active" ? "red" : "blue"}
          key={status >= "active" ? "red" : "blue"}
        >
          {status == "active" ?  "inactive": "active" }
        </Tag>
      ),
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
      render: (_: any, { role }: any) => (
        <p>{role == "admin" ? 'admin' : 'user'}</p>
      )

    },
    {
      title: "NAME",
      dataIndex: "username",
      key: "username",
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}/edit`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.username}
          </Link>
        </div>
      ),
     
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "ACTION",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="primary">
            <Link to={`${record._id}/edit`}>Edit</Link>
          </Button>
          <Popconfirm
            title={`Delete ${record.brandName}?`}
            okText="OK"
            cancelText="Cancel"
            onConfirm={() => deleteUser(record._id)}
          >
            <Button type="dashed" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: Props[] = users?.map((item, index) => {
    return {
      key: index + 1,
      _id: item?._id,
      username: item?.username,
      email: item?.email,
      image: item?.image ? item?.image[0].url : ""  ,
      phoneNumber: item?.phoneNumber,
      address: item?.address,
      role: item?.role
    }
  });


  const deleteUser = (_id: string | undefined) => {
    dispatch(AsyncDeleteUser(_id)).unwrap()
      .then((data) => {
        message.success("Delete user success")
      }).catch(() => {
        message.error(errorMessage)
      });
  };


  return (
    <>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="add">Add Users</Link>
      </Button>
      <TableCustom column={columnUserList} data={data} />

    </>
  )

};
export default UserList;
