import { Button, Popconfirm, Space, Table, Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { pageTitle } from "../../../ultils";
import { useAppSelector, useAppDispatch } from '../../../app/stores/hooks';
import DataTable from './../../../components/admin/DataTable';
type Props = {};

const BrandsList: any = [
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
      dataIndex: "brandName",
      key: "brandName",
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}/edit`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.brandName}
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
            title={`Delete ${record.brandName}?`}
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
const BrandList = (props: Props) => {
  const {brands} = useAppSelector(state => state.homeReducer);
  const data: Props[] = brands.map((item, index) => {
    return {
      key: index + 1,
      _id: item._id,
      brandName: item?.brandName,
      image: item?.image[0]?.url!,
      status: item?.status
    }
  });
  React.useEffect(() => {
    document.title = "Admin | Brands";
    pageTitle("Danh sách thương hiệu");
  }, []);
  return <>
    <Button type="primary" style={{ marginBottom: "20px" }}>
      <Link to="add">Add Brands</Link>
    </Button>
    <DataTable column={BrandsList} data={data} />
  </>;
};

export default BrandList;
