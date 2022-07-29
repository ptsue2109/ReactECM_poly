import { Button, message, Popconfirm, Space, Table, Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../components/admin/DataTable";
import { pageTitle } from "../../../ultils";
import { AsyncFetchUserList, AsyncDeleteUser } from "../../../app/stores/thunks/userThunk";
import { useAppDispatch, useAppSelector } from './../../../app/stores/hooks';

type Props = {};

const UserList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { users, errorMessage, isFetching } = useAppSelector(state => state.userReducer);
  React.useEffect(() => {
    document.title = "Admin | Users";
    pageTitle("Danh sách người dùng");
    dispatch(AsyncFetchUserList());
   
  }, [dispatch]);
  const columnUserList: any = [
    {
      title: "IMAGE",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: any) => (
        <Link to={`${record?._id}/edit`}>
          <img width="40px" src={record.image ?? "https://banner2.cleanpng.com/20180428/sue/kisspng-pittman-animal-hospital-user-computer-icons-avatar-5ae4937a25a0b7.9399757315249294021541.jpg"} alt="" />
        </Link>
      ),
    },
    {
      title: "DISPLAY",
      dataIndex: "status",
      key: "status",
      render: (_: any, { status }: any) => (
        <Tag
          color={status == "active" ? "green" : "red"}
          key={status >= "active" ? "geekblue" : "blue"}
        >
          {status == "active" ? "active" : "hidden"}
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

  const data: Props[] = users.map((item, index) => {
    return {
      key: index + 1,
      _id: item._id,
      username: item.username,
      image: item.image,
      phoneNumber: item.phoneNumber,
      address: item.address,
      role: item.role
    }
  });


  const deleteUser = (id: string | undefined) => {
    dispatch(AsyncDeleteUser(id)).unwrap().then((data) => {
      message.success("Delete user success")
    }).catch((error) => {
      errorMessage ? message.error(errorMessage) : message.error(error.message)
    });
  };


return (
  <>
  <Button type="primary" style={{ marginBottom: "20px" }}>
    <Link to="add">Add Users</Link>
  </Button>
  <Table columns={columnUserList} dataSource={data} />

</>
)

};
export default UserList;
