import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, message } from "antd";
import { pageTitle } from '../../../ultils'
import SliderForm from './../../../components/admin/SliderForm';
import { useAppDispatch, useAppSelector } from './../../../app/stores/hooks';
import { CreateSliders } from "../../../app/stores/thunks/sliderThunk"
type Props = {}

const SlidersAdd = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [fileList, setFileList] = React.useState<any[]>([]);

  const { errorMessage, isSucess, isFetching, isErr } = useAppSelector((state) => state.sliderSlice);
  React.useEffect(() => {
    document.title = "Admin | Add Slider"
    pageTitle('Add Slider')

    if (isFetching) {
      message.loading({ content: "Đang tải", duration: 1000, key: "handling" });
    }
    if (isSucess) {
      navigate("/admin/sliders");
      message.success({ content: "Thêm thành công", key: "handling" });
    }
    if (isErr) {
      message.error({ content: `Failed: ${errorMessage} `, key: "handling" });
    }
  }, [isSucess, isFetching, isErr]);

  const onFinish = async (data: any) => {
    data.image = fileList;
    dispatch(CreateSliders(data))
  };

  const onReset = () => {
    form.resetFields();
    setFileList([]);
  };
  return (
    <>

      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="/admin/sliders">List Sliders</Link>
      </Button>
      <SliderForm
        onFinish={onFinish}
        form={form}
        fileList={fileList}
        setFileList={setFileList}
        onReset={onReset}
      />
    </>
  )
}

export default SlidersAdd