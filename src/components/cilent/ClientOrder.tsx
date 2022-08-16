import React from "react";
import { Button, Popconfirm, Select, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/stores/hooks";
import { currencyFm } from "../../ultils";
import { useDispatch } from "react-redux";
import { SoftDel } from "../../app/stores/thunks/orderThunk";

type Props = {
  data:any[],
  restoreBtn: boolean
};

const ClientOrder = ({data,restoreBtn}: Props) => {
  const dispatch = useAppDispatch();

  const columns = [
    {
      title: "#",
      key: "#",
      dataIndex: "key",
      width: 10,
    },

    {
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
      width: 120,
      render: (record: any) => (
        <Link to={`/orders/${record}/detail`} className="text-color hover:text-red-400">{record}</Link>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      render: (totalPrice: number) => currencyFm.format(totalPrice),
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
    },
    {
      title: "Ngày hủy",
      dataIndex: "deleteAt",
      render: (record:any) => (
      <Space>
        {!restoreBtn ? (
          <p>{record}</p>
        ) : "đừng bom hàng"}
      </Space>
      )
    },
    {
      title: "Trang thái",
      dataIndex: "status",
      width: 100,
    },
    {
      title: "",
      dataIndex: "_id",
      render: (orderId: string, record: any) => (
        <Space size="small">
          {record.status === "pending"  && restoreBtn && (
            <Popconfirm
              title="Bạn có chắc muốn hủy không?"
              onConfirm={() => handleDeleteOrder(orderId)}
              okText="Xoá"
              cancelText="Huỷ"
            >
              <Button>Hủy đơn</Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const dataS = data.map((item: any, index: any) => {
    return {
      key: index + 1,
      _id: item?._id,
      totalPrice: item?.totalPrice,
      status: item?.status,
      orderCode: item?.orderCode,
      createdAt: item?.createdAt,
      deleteAt: item?.deletedAt
    };
  });

  const handleDeleteOrder = (orderId: string) => {
    dispatch(SoftDel(orderId))
  };

  return (
    <div>
      <Table columns={columns} dataSource={dataS} pagination={false} />
    </div>
  );
};

export default ClientOrder;
