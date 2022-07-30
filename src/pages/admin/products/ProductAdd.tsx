import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, message } from "antd";
import ProductForm from "../../../components/admin/ProductForm";
import { pageTitle } from "../../../ultils";
import { useAppDispatch, useAppSelector } from "./../../../app/stores/hooks";
import { AsyncCreateProduct } from "../../../app/stores/thunks/productThunk";
interface Props { }

const ProductAdd = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [fileList, setFileList] = React.useState<any[]>([]);
  const { errorMessage } = useAppSelector((state) => state.productReducer);
  React.useEffect(() => {
    document.title = "Admin | Add Product";
    pageTitle("Thêm sản phẩm");
  }, []);

  const onFinish = (data: any) => {
    data.image = fileList;
    dispatch(AsyncCreateProduct(data)).unwrap()
      .then(() => {
        message.success("Add product success", 2, () => {
          navigate("/admin/products");
        });
      })
      .catch(() => message.error(errorMessage));
  };

  const onReset = () => {
    form.resetFields();
    setFileList([]);
  };

  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="/admin/products">List products</Link>
      </Button>
      <ProductForm
        onFinish={onFinish}
        form={form}
        fileList={fileList}
        setFileList={setFileList}
        onReset={onReset}
      />
    </div>
  );
};

export default ProductAdd;
