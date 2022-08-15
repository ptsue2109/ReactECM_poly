import React from 'react'
import { Card, Form, FormInstance, Input } from "antd";
import { Button } from 'primereact/button';

interface CheckoutFormProps {
   form: FormInstance<any>;
   onFinish: (values: any) => void;
   edit?: boolean;
}

const CheckoutForm = ({ form, onFinish, edit = false }: CheckoutFormProps) => {
   return (
      <Form layout="vertical" form={form} onFinish={onFinish}>
         <div className="grid">
            <Card className="col-6">
               <Form.Item label="" style={{ alignItems: "left" }}>
               </Form.Item>
               <Form.Item label="Tên nguoi dung" name="username" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                  <Input placeholder="Nhập vào" />
               </Form.Item>
               <Form.Item label="SDT" name="phoneNumber" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                  <Input placeholder="Nhập vào" />
               </Form.Item>
               <Form.Item label="email" name="email" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                  <Input placeholder="Nhập vào" />
               </Form.Item>
               <Form.Item label="address" name="address" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                  <Input placeholder="Nhập vào" />
               </Form.Item>
               <Form.Item label="note" name="note">
                  <Input.TextArea placeholder="Ghi chú " />
               </Form.Item>
            </Card>
            <div className="col-12">
               <Button label="Danger" className="p-button-raised p-button-danger p-button-text" />
            </div>
         </div>
      </Form>
   )
}

export default CheckoutForm