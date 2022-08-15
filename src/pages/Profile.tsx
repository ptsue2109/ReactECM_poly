import { Form, message, Collapse, Card } from 'antd';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from '../components/Form&Table/DataTable';
import { useAppSelector, useAppDispatch } from '../app/stores/hooks';
import { UserOrderList } from '../app/stores/thunks/orderThunk';
import { UpdateUser } from '../app/stores/thunks/userThunk';
import UserForm from "../components/Form&Table/UserForm";
import ClientOrder from '../components/cilent/ClientOrder';
const { Panel } = Collapse;
type Props = {}

const Profile = (props: Props) => {
  document.title = "Profile";
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = React.useState<any[]>([]);
  const { userInfo } = useAppSelector(state => state.authReducer);
  const { userOrder } = useAppSelector(state => state.orderSlice);
  console.log('userOrder', userOrder);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (userInfo) {
      dispatch(UserOrderList(userInfo?._id));

      setFileList(userInfo?.image as any[]);
      form.setFieldsValue({
        ...userInfo,
      });
    }
  }, [dispatch])


  const onFinish = async (data: any) => {
    console.log('data', data);
    data.image = fileList;
    data._id = userInfo?._id;
    dispatch(UpdateUser(data)).unwrap()
      .then(() => { message.success("Update users success") })
      .catch((error) => message.error(error.message));
  };
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

 
  return (
    <div className='grid '>
      <div className="col-6">
        <Collapse defaultActiveKey={['1']} onChange={onChange} >
          <Panel header="Lịch sử mua hàng" key="userOrder">
          <ClientOrder />
          </Panel>
          <Panel header="Thay đổi mật khẩu" key="pwChange">
          </Panel>
        </Collapse>

      </div>
      <div className="col-6">
        <UserForm
          onFinish={onFinish}
          form={form}
          fileList={fileList}
          setFileList={setFileList}
          edit={true}
          editUser={false}
        />
      </div>
    </div>
  )
}

export default Profile