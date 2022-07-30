import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Space, Table, Tag, Popconfirm, message } from "antd";
import { currencyFm, pageTitle } from "../../../ultils";
import TableCustom from "../../../components/admin/DataTable";
import { useAppSelector, useAppDispatch } from "../../../app/stores/hooks";
import {
  AsyncDeleteProduct,
  FetchProductList,
} from "../../../app/stores/thunks/productThunk";

interface DataType {}

const ProductList = (props: DataType) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    document.title = "Admin | Products";
    pageTitle("Danh sách sản phẩm");
    dispatch(FetchProductList());
  }, [dispatch]);
  const { errorMessage,products ,isFetching,isErr} = useAppSelector((state) => state.productReducer);
 
  const columnsProList: any = [
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
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}/edit`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.name}
          </Link>
        </div>
      ),
    },
    {
      title: "COST",
      dataIndex: "cost",
      key: "cost",
      render: (_: any, record: any) => <>{currencyFm.format(record?.cost)}</>,
    },
    {
      title: "FEATURE",
      dataIndex: "isFeature",
      key: "isFeature",
      render: (_: any, { isFeature }: any) => (
        <Tag
          color={isFeature == true ? "green" : "red"}
          key={isFeature == true ? "geekblue" : "blue"}
        >
          {isFeature == true ? "Nổi bật" : "sản phẩm thường"}
        </Tag>
      ),
    },
    {
      title: "STOCK",
      key: "stock",
      dataIndex: "stock",
      render: (_: any, { stock }: any) => (
        <Tag
          color={stock == 0 ? "red" : stock > 5 ? "green" : "warning"}
          key={stock >= 5 ? "geekblue" : "blue"}
        >
          {stock == 0
            ? `hết hàng (${stock})`
            : stock > 5
            ? `còn hàg(${stock}) `
            : `sắp hết (${stock}) `}
        </Tag>
      ),
    },
    {
      title: "CATEGORY",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "BRANDS",
      dataIndex: "brandId",
      key: "brandId",
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
            title={`Delete ${record.name}?`}
            okText="OK"
            cancelText="Cancel"
            onConfirm={() => {
              confirmDelete(record._id);
            }}
          >
            <Button type="dashed" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: DataType[] = products?.map((item, index) => {
    return {
      key: index + 1,
      _id: item?._id,
      name: item?.name,
      isFeature: item?.isFeature,
      cost: item?.cost,
      image: item?.image[0]?.url,
      categoryId: item?.categoryId?.cateName,
      brandId: item?.brandId?.brandName,
      stock: item?.stock,
    };
  });

  const confirmDelete = (_id: string ) => {
    dispatch(AsyncDeleteProduct(_id)).unwrap()
      .then(() => {
        message.success("Delete product success");
      })
      .catch((error) => {message.error(errorMessage);
      });
  };

  return (
    <>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="add">Add Product</Link>
      </Button>
      <TableCustom column={columnsProList} data={data}/>
    </>
  );
};
export default ProductList;
