import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, message } from "antd";
import UserForm from "../../../components/admin/UserForm";
import { pageTitle } from "../../../ultils";
import { useAppDispatch, useAppSelector } from "./../../../app/stores/hooks";
import { CreateUsers } from "../../../app/stores/thunks/userThunk";

interface Props {}

const UserAdd = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [fileList, setFileList] = React.useState<any[]>([]);
  const { errorMessage ,isSucess,isFetching,isErr} = useAppSelector((state) => state.userReducer);
  React.useEffect(() => {
    document.title = "Admin | Add Users";
    pageTitle("Thêm người dùng ");
    if(isFetching){
      message.loading({ content: "Đang tải", duration: 1000, key: "handling" });
    }
    if(isSucess){
      navigate("/admin/users");
      message.success({ content: "Thêm thành công", key: "handling" });
    }
    if(isErr){
      message.error({ content:`Failed: ${errorMessage} `, key: "handling" });
    }
  }, [isSucess,isFetching,isErr]);

  const onFinish = (data: any) => {
    data.image = fileList;
    dispatch(CreateUsers(data))
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
      />
    </div>
  );
};

export default UserAdd;
