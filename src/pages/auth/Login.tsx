import React from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Form, Input, message } from "antd";
import { useAppDispatch } from "../../app/stores/hooks";
import { authAsyncLogin } from "../../app/stores/thunks/authThunk";

interface Props { user: any; }

const Login = ({ user }: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    console.log('values', values);
    const { meta, payload } = await dispatch(authAsyncLogin(values));
    if (meta.requestStatus == "fulfilled") {
      message.success("Register success, waitt", 2, () => {
        setTimeout(() => {
          navigate("/");
        }, 3000);
      });
    } else {
      message.error(`${payload}`);
    }
  };

    document.title = "LOGIN";


  return (
    <>
        <div className="flex align-content-center justify-content-center  mt-7">
          <div className="surface-card p-4 shadow-4 border-round w-full lg:w-6 mb-5 ">
            <div className="text-900 text-3xl font-medium mb-3">Login</div>
            <Form
              layout="vertical"
              form={form}
              name="register"
              onFinish={onFinish}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}
                style={{ flex: 1 }}
              >
                <Input type="email" placeholder="Nhập vào" />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}
                style={{ flex: 1 }}
              >
                <Input.Password placeholder="Nhập vào" />
              </Form.Item>

              <div className="flex  justify-content-end mb-3">
                <p className="font-medium no-underline ml-2 text-black-500 text-right cursor-pointer">
                  Don't having account
                </p>
                <Link
                  to={"/register"}
                  className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
                >
                  Register today
                </Link>
              </div>

              <Button label="Sign In" className="w-full p-button-danger" />
              <div className="">
                <Divider align="center">
                  <div className="inline-flex align-items-center">
                    <b>OR</b>
                  </div>
                </Divider>
                
              </div>
            </Form>
          </div>
          <div className="">
            <img src="/src/assets/logo/fb.png" alt="" />
          </div>
        </div>

    </>
  );
};

export default Login;
