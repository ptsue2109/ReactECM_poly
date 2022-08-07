import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, message } from "antd";
import { pageTitle } from "../../../ultils";
import { useAppDispatch, useAppSelector } from './../../../app/stores/hooks';
import { UpdateUser } from "../../../app/stores/thunks/userThunk"
import UserForm from "../../../components/admin/UserForm";
interface Props { }

const UserEdit = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [fileList, setFileList] = React.useState<any[]>([]);

  const { users } = useAppSelector(state => state.userReducer);
  const { id } = useParams();
  const dataSelected = users.find((item) => item._id === id);
  React.useEffect(() => {
    document.title = `Admin | Edit ${dataSelected?.username}`;
    pageTitle(`Edit User`);
    if (dataSelected) {
      setFileList(dataSelected?.image as any[]);
      form.setFieldsValue({
        ...dataSelected,
      });
    }
  }, [dataSelected]);

  const onFinish = async (data: any) => {
    console.log('data',data);
    
    data.image = fileList;
    data._id = id;
    dispatch(UpdateUser(data)).unwrap()
      .then(() => { message.success("Update users success", 2, () => { navigate("/admin/users") }) })
      .catch((error) => message.error(error.message));
  };

  const onReset = () => {
    form.resetFields();
    setFileList([]);
  };

  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="/admin/users">List users</Link>
      </Button>
      <UserForm
        onFinish={onFinish}
        form={form}
        fileList={fileList}
        setFileList={setFileList}
        onReset={onReset}
        edit={true}
      />
    </div>
  );
};

export default UserEdit;
