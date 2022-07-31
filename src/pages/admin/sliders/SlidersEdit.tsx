import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, message } from "antd";
import { pageTitle } from "../../../ultils";
import { useAppDispatch, useAppSelector } from './../../../app/stores/hooks';
import { UpdateSlider } from "../../../app/stores/thunks/sliderThunk"
import SliderForm from "../../../components/admin/SliderForm";

type Props = {}

const SlidersEdit = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [fileList, setFileList] = React.useState<any[]>([]);

  const { sliders,isFetching,isSucess,isErr,errorMessage } = useAppSelector(state => state.sliderSlice);
  const { id } = useParams();
  const dataSelected = sliders.find((item) => item._id === id);

  React.useEffect(() => {
    document.title = `Admin | Edit ${dataSelected?.slideName}`;
    pageTitle(`Edit Sliders`);
    if (dataSelected) {
      setFileList(dataSelected?.image as any[]);
      form.setFieldsValue({
        ...dataSelected,
      });
    }
  }, [dataSelected]);
React.useEffect(() =>{
  if (isFetching) {
    message.loading({ content: "Đang tải", duration: 1000, key: "handling" });
  }
  if (isSucess) {
    navigate("/admin/sliders");
    message.success({ content: "Edit thành công", key: "handling" });
  }
  if (isErr) {
    message.error({ content: `Failed: ${errorMessage} `, key: "handling" });
  }
},[isFetching,isErr,isSucess])

  const onFinish = async (data: any) => {
    data.image = fileList;
    data._id = id;
    dispatch(UpdateSlider(data))
  };

  const onReset = () => {
    form.resetFields();
    setFileList([]);
  };
  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="/admin/sliders">List Sliders</Link>
      </Button>
      <SliderForm
        onFinish={onFinish}
        form={form}
        fileList={fileList}
        setFileList={setFileList}
        onReset={onReset}
        edit={true}
      />
    </div>
  )
}

export default SlidersEdit