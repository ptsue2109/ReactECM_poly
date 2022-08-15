import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "antd";
import { pageTitle } from '../../../ultils';
import BrandForm from "../../../components/Form&Table/BrandForm";
import { useAppSelector } from "../../../app/stores/hooks";
interface Props { }

const BrandEdit = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = React.useState<any>();

  const { id } = useParams();
  const {brands} = useAppSelector(state => state?.homeReducer)
  const brand = brands.find(item => item?._id === id);
  console.log(brand);

  React.useEffect(() => {
    document.title = `Admin | Edit ${brand?.brandName}`;
    pageTitle(`Edit Categories`);
    setFileList(brand?.image as any[]);
    form.setFieldsValue({ ...brand });
  }, []);

  const onFinish = async (values: any) => {
    console.log("values", values);
  };

  const onReset = () => {
    form.resetFields();
    setFileList([]);
  };

  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="/admin/brands">List Brands</Link>
      </Button>
      <BrandForm
        onFinish={onFinish}
        form={form}
        fileList={fileList}
        setFileList={setFileList}
        onReset={onReset}
      />
    </div>
  );
};

export default BrandEdit;
