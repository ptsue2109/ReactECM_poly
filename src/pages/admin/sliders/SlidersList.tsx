import React from 'react'
import { useAppDispatch, useAppSelector } from "../../../app/stores/hooks"
import { Button, message, Popconfirm, Space, Tag } from "antd";
import { Link } from "react-router-dom";
import DataTable from '../../../components/Form&Table/DataTable';
import {RemoveSlider} from "../../../app/stores/thunks/sliderThunk"

type Props = {}

const SlidersList = (props: Props) => {
  const { sliders,errorMessage } = useAppSelector(state => state.sliderSlice);
  const dispatch = useAppDispatch();
  document.title = "Danh sách sliders";

  const columnSliderList: any = [
    {
      title: "IMAGE",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: any) => (
        <Link to={`${record?._id}/edit`}>
          <img width="140px" src={record?.image} alt="" />
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
          {status == "active" ? "Đang hiển thị" : "Đang ẩn"}
        </Tag>
      ),
    },
    {
      title: "URL",
      dataIndex: "URL",
      key: "URL"
    },
    {
      title: "NAME",
      dataIndex: "slideName",
      key: "slideName",
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}/edit`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.slideName}
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
            <Link to={`${record?._id}/edit`}>Edit</Link>
          </Button>
          <Popconfirm
            title={`Delete ${record?.slideName}?`}
            okText="OK"
            cancelText="Cancel"
            onConfirm={() => deleteSlider(record?._id)}
          >
            <Button type="dashed" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: Props[] = sliders?.map((item: any, index: any) => {
    return {
      key: index + 1,
      _id: item._id,
      slideName: item?.slideName,
      image: item?.image ? item?.image[0].url : "",
      status: item?.status,
      URL: item?.URL
    };
  });

  const deleteSlider = (_id: string | undefined) => {
    dispatch(RemoveSlider(_id)).unwrap()
      .then((data) => {
        message.success("Delete user success")
      }).catch(() => {
        message.error(errorMessage)
      });

  }
  return (
    <>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="add">Add Sliders</Link>
      </Button>
      <DataTable column={columnSliderList} data={data} />
    </>
  )
}

export default SlidersList