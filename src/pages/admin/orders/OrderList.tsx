import React from "react";
import { Button, Form, message, Popconfirm, Select, Space, Tag } from "antd";
import { BiPlusMedical } from "react-icons/bi";
import { Link } from "react-router-dom";
import TableCustom from "../../../components/Form&Table/DataTable";
import { useAppDispatch, useAppSelector } from "../../../app/stores/hooks";
import { currencyFm } from "../../../ultils";
import { ChangeStatusOrder, SoftDel } from "../../../app/stores/thunks/orderThunk";
interface OrdersListProps { }

const OrdersList = (props: OrdersListProps) => {
  const { orders, isErr, errorMessage, isFetching, isSucess } = useAppSelector(state => state.orderSlice);
  const dispatch = useAppDispatch();
  const changeStatus = (status: any, record:any) => {
    console.log({_id:record, status:status});
    ChangeStatusOrder({_id:record, status:status})
  };

  const handleDeleteOrder = (orderId: string) => {
    dispatch(SoftDel(orderId))
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
      width: 120,
    },
    {
      title: "userId",
      dataIndex: "users",
      render: (users: any) => <Link to={`/admin/users/${users?._id}/edit`} >{users?._id ?? ''}</Link>
    },
    {
      title: "Detail",
      dataIndex: "_id",
      width: 170,
      render: (orderId: string) => (
        <Link to={`/admin/orders/${orderId}/detail`}>View</Link>
      ),
    },
    {
      title: "Trang thái",
      dataIndex: "status",
      width: 150,
      render: (status: any, record: any) => (
        <Select value={status}  onChange={(status:string) => changeStatus(status, record._id)}>
          <Select.Option value="pending">Chưa xử lí</Select.Option>
          <Select.Option value="confirm">Xác nhận</Select.Option>
          <Select.Option value="shipping">Đang giao</Select.Option>
          <Select.Option value="done">Hoàn thành</Select.Option>
        </Select>
      ),
    },
    {
      title: "Người đặt hàng",
      dataIndex: "shippingInfo",
      render: (shippingInfo: any) => shippingInfo?.username,
    },
    {
      title: "Số điện thoại",
      dataIndex: "shippingInfo",
      render: (shippingInfo: any) => shippingInfo?.phoneNumber,
    },
    {
      title: "Ghi chú",
      dataIndex: "shippingInfo",
      render: (shippingInfo: any) => shippingInfo?.note,
    },
    
    {
      title: "Tổng tiền đơn hàng",
      dataIndex: "totalPrice",
      render: (totalPrice: number) => currencyFm.format(totalPrice)
    },
    {
      title: "",
      dataIndex: "_id",
      fixed: "right",
      width: 90,
      render: (orderId: string, record: any) => (
        <Space size="small">
          {record.status === "pending" && (
            <Popconfirm title="Bạn có chắc muốn hủy không?" onConfirm={() => handleDeleteOrder(orderId)} okText="Xoá" cancelText="Huỷ">
              <Button>Hủy đơn</Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-content-between">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          <Link to="create">Thêm đơn hàng</Link>
        </Button>
        <Button type="dashed" danger style={{ marginBottom: "20px" }}>
          <Link to="deleted">Đơn đã hủy</Link>
        </Button>
      </div>
      <TableCustom column={columns} data={orders} loading={isFetching} scrollWidth={1500} />
    </>
  );
};

export default OrdersList;