import { Form, message, Collapse, Card, Modal, Button, Input } from 'antd';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from '../components/Form&Table/DataTable';
import { useAppSelector, useAppDispatch } from '../app/stores/hooks';
import { UserOrderList } from '../app/stores/thunks/orderThunk';
import { UpdateUser } from '../app/stores/thunks/userThunk';
import UserForm from "../components/Form&Table/UserForm";
import ClientOrder from '../components/cilent/ClientOrder';
import { RiLockPasswordLine } from 'react-icons/ri';
const { Panel } = Collapse;
type Props = {}

const Profile = (props: Props) => {
  document.title = "Profile";
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [fileList, setFileList] = React.useState<any[]>([]);
  const { userInfo } = useAppSelector(state => state.authReducer);
  const [isModalVisible, setIsModalVisible] = React.useState(false);


  const { userOrder, userOrderDel } = useAppSelector((state) => state.orderSlice);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    message.success("Change Password success");
    setTimeout(() => {
      setIsModalVisible(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  React.useEffect(() => {
    if (userInfo) {
      dispatch(UserOrderList(userInfo?._id));
      setFileList(userInfo?.image as any[]);
      form.setFieldsValue({
        ...userInfo,
      });
    }
  }, [dispatch])


  const onFinish = (data: any) => {

    data.image = fileList;
    data._id = userInfo?._id;
    dispatch(UpdateUser(data)).unwrap()
      .then(() => { message.success("Update users success") })
      .catch((error) => message.error(error));
  };
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  const handleChangePW = (data: any) => {
    console.log('data', data);
    dispatch(UpdateUser(data))
  };

  return (
    <div className='grid '>
      <div className="col-8">
        <Collapse defaultActiveKey={['1']} onChange={onChange} >
          <Panel header="Lịch sử mua hàng" key="userOrder">
            <ClientOrder data={userOrder} restoreBtn />
          </Panel>
          <Panel header="Các đơn đã hủy" key="deletedOrder">
            <ClientOrder data={userOrderDel} restoreBtn={false} />
          </Panel>
          <Panel header="Đổi mật khẩu" key="pwChange">
            <Link to="" onClick={showModal} ><RiLockPasswordLine />Click here</Link>
            <Modal title="Change password" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <Form form={form} onFinish={handleChangePW} >
                <Form.Item name="newPassword" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                  <Input.Password placeholder="Nhập vào" />
                </Form.Item>
                <Form.Item name="re_password" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                  <Input.Password placeholder="Nhập lại mật khẩu" />
                </Form.Item>
              </Form>
            </Modal>
          </Panel>
        </Collapse>

      </div>
      <div className="col-4">
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