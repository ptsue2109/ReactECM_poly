import { Button, Popconfirm, Space, Table, Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../components/admin/DataTable";
import { pageTitle } from "../../../ultils";
import { useAppDispatch, useAppSelector } from "./../../../app/stores/hooks";
import {FetchCateList} from "../../../app/stores/thunks/cateThunk"
interface Props {}
const columnCateList: any = [
  {
    title: "IMAGE",
    dataIndex: "image",
    key: "image",
    render: (_: any, record: any) => (
      <Link to={`${record?._id}/edit`}>
        <img width="140px" src={record.image ?? ""} alt="" />
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
        {status == "active" ? "Đang hiển thị" : "sản phẩm đang được ẩn"}
      </Tag>
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
    title: "ACTION",
    key: "action",
    render: (_: any, record: any) => (
      <Space size="middle">
        <Button type="primary">
          <Link to={`${record._id}/edit`}>Edit</Link>
        </Button>
        <Popconfirm
          title={`Delete ${record.catename}?`}
          okText="OK"
          cancelText="Cancel"
        >
          <Button type="dashed" danger>
            Delete
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];

const CategoryList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.homeReducer);


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
    dispatch(FetchCateList());
  }, [dispatch]);
  return (
    <>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="add">Add Category</Link>
      </Button>
      <DataTable column={columnCateList} data={data} />
    </>
  );
};

export default CategoryList;
