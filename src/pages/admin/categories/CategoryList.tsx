import { Button, message, Popconfirm, Space, Table, Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import TableCustom from "../../../components/Form&Table/DataTable";
import { pageTitle } from "../../../ultils";
import { useAppDispatch, useAppSelector } from "./../../../app/stores/hooks";
import { RemoveCate} from "../../../app/stores/thunks/cateThunk"
interface Props {}


const CategoryList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { categories ,errorMessage} = useAppSelector(state => state.cateReducer);
  const data: Props[] = categories.map((item, index) => {
    return {
      key: index + 1,
      _id: item._id,
      cateName: item?.cateName,
      image: item?.image[0]?.url,
      status: item?.status,
    };
  });
  React.useEffect(() => {
    document.title = "Admin | Categories";
    pageTitle("Danh sách danh mục");
  }, []);

  const columnCateList: any = [
    {
      title: "IMAGE",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: any) => (
        <Link to={`${record?._id}/edit`}>
          <img width="40px" src={record.image ?? ""} alt="" />
        </Link>
      ),
    },
    {
      title: "NAME",
      dataIndex: "cateName",
      key: "cateName",
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}/edit`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.cateName}
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
          color={status == "active" ? "green" : "red"}
          key={status >= "active" ? "geekblue" : "blue"}
        >
          {status == "active" ? "Đang hiển thị" : "danh mục đang được ẩn"}
        </Tag>
      ),
    },
   
    {
      title: "ACTION",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="primary">
            <Link to={`${record?._id}/edit`}>Edit</Link>
          </Button>
          <Popconfirm
            title={`Delete ${record?.catename}?`}
            okText="OK"
            cancelText="Cancel"
            onConfirm={() => deleteCate(record?._id)}
          >
            <Button type="dashed" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const deleteCate = (_id: string | undefined) => {
    dispatch(RemoveCate(_id)).unwrap()
      .then(() => {
        message.success("Delete user success")
      }).catch(() => {
        message.error(errorMessage)
      });
  };
  return (
    <>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="add">Add Category</Link>
      </Button>
      <TableCustom column={columnCateList} data={data} />
    </>
  );
};

export default CategoryList;
