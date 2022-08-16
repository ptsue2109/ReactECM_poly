import React from "react";
import { Button, message, Popconfirm, Select, Space } from "antd";
import { Link } from "react-router-dom";
import TableCustom from "../../../components/Form&Table/DataTable";
import { useAppSelector, useAppDispatch } from "../../../app/stores/hooks";
import { currencyFm, pageTitle } from "../../../ultils";
import { Restore } from "../../../app/stores/thunks/orderThunk";
interface OrderDeletedProps { }

const OrderDeleted = (props: OrderDeletedProps) => {
  const { orderDeleted, isFetching } = useAppSelector((state) => state.orderSlice);
  pageTitle("Đơn đã xóa");
  const dispatch = useAppDispatch();
  const restore = (orderId: string) => {
    dispatch(Restore(orderId));
    message.success("Khôi phục đơn hàng thành công");
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
      width: 120,
    },
    {
      title: "Chi tiết đơn hàng",
      dataIndex: "_id",
      width: 170,
      render: (orderId: string) => (
        <Link to={`/admin/orders/${orderId}/detail`}>Chi tiết đơn hàng</Link>
      ),
    },
    {
      title: "Trang thái",
      dataIndex: "status",
      width: 150,
      render: (_: any) => (
        <Select value="Đã hủy">
          <Select.Option value="cancel">Đã hủy</Select.Option>
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
      title: "userId",
      dataIndex: "users",
      render: (users: any) => (
        <Link to={`/admin/users/${users}/edit`}>{users ?? ""}</Link>
      ),
    },
    {
      title: "Tổng tiền đơn hàng",
      dataIndex: "totalPrice",
      render: (totalPrice: number) => currencyFm.format(totalPrice),
    },
    {
      title: "",
      dataIndex: "_id",
      fixed: "right",
      width: 90,
      render: (orderId: string, record: any) => (
        <Space size="small">
          {record.status === "pending" && (
            <Popconfirm
              title="Bạn có chắc muốn khôi phục không?"
              onConfirm={() => restore(orderId)}
              okText="Restore"
              cancelText="Huỷ"
            >
              <Button>Restore</Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="/admin/orders/">Danh sách orders</Link>
      </Button>
      <TableCustom
        column={columns}
        data={orderDeleted}
        scrollWidth={1500}
        loading={isFetching}
      />
    </>
  );
};

export default OrderDeleted;
