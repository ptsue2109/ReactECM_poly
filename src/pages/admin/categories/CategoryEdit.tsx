import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "antd";
import { pageTitle } from '../../../ultils';
import { categories } from "../../../../db.json"
import CateForm from "../../../components/admin/CateForm";
interface Props { }

const CateEdit = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = React.useState<any>();

  const { id } = useParams();
  const category = categories.find(item => item._id === id);
  console.log(category);

  React.useEffect(() => {
    document.title = `Admin | Edit ${category?.cateName}`;
    pageTitle(`Edit Categories`);
    form.setFieldsValue({ ...category });
    fileList(category?.image)
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
        <Link to="/admin/categories">List Categories</Link>
      </Button>
      <CateForm
        onFinish={onFinish}
        form={form}
        fileList={fileList}
        setFileList={setFileList}
        onReset={onReset}
      />
    </div>
  );
};

export default CateEdit;
