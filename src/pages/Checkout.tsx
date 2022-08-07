import { Button, Checkbox, Form, Input, Radio, Avatar, Badge, Divider } from 'antd';
import React from 'react'
import { useParams } from "react-router-dom"
import { useAppSelector } from '../app/stores/hooks';
import { currencyFm } from '../ultils';
type Props = {}

const Checkout = (props: Props) => {
   const { userId } = useParams();
   const { carts } = useAppSelector((state) => state.orderSlice);
   console.log(carts);

   const onFinish = (values: any) => {
      console.log('Success:', values);
   };

   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
   };

   return (
      <div className='flex border-900 justify-content-between w-full'>
         <div className="left bg-red-300">
            <Form
               name="basic"
               labelCol={{ span: 8 }}
               wrapperCol={{ span: 16 }}
               initialValues={{ remember: true }}
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
               autoComplete="off"
            >
               <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
               >
                  <Input />
               </Form.Item>

               <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
               >
                  <Input.Password />
               </Form.Item>

               <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                     Submit
                  </Button>
               </Form.Item>
            </Form>



         </div>
         <div className="right bg-green-600 ">
            {carts && carts.products.length > 0 ? (
               <>
                  {carts?.products.map((item: any, index: any) => (
                     <div className="flex justify-content-between" key={index}>
                        <Badge count={item?.quantity}>
                           <Avatar shape="square" size="large" src={item?.productImage} />
                        </Badge>
                        <div className="product_name">
                           <span>{item?.productName}</span>
                        </div>
                        <div className="product_price">
                           <span>{item?.cost}</span>
                        </div>
                     </div>

                  ))}
                  <Divider />
                  <div className="ms-cart-total">
                     <p className="ms-cart-total-normal">
                        <span>Tổng tiền:</span>
                        <span>{currencyFm.format(carts?.totalPrice)}</span>
                     </p>

                     <p className="ms-cart-total-lg">
                        <span>Cần thanh toán:</span>
                        <span>{currencyFm.format(carts?.totalPrice)}</span>
                     </p>

                  </div>
               </>
            ) : null}
         </div>


      </div>
   )
}

export default Checkout