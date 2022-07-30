import React from 'react'
import styled from "styled-components";
import { BsPlus } from "react-icons/bs";
import { Button, Card, Form, FormInstance, Input, InputNumber, message, Modal, Select, Tabs, Upload } from "antd";
import { useAppSelector } from '../../app/stores/hooks';
const { TextArea } = Input;
const { TabPane } = Tabs;

const UploadCard = styled(Upload)`
    & .ant-upload-select-picture-card:hover {
        border-color: var(--ant-primary-color);
    }
    svg {
        fill: #d9d9d9;
        transition: fill 200ms ease;
    }
    & span:hover svg {
        fill: var(--ant-primary-color);
    }
`;


interface UserFormProps {
    form: FormInstance<any>;
    onFinish: (values: any) => void;
    fileList: any[];
    setFileList: React.Dispatch<any>;
    onReset?: () => void;
    edit?: boolean;
    loading?: boolean;
}

const UserForm = ({ fileList, form, onFinish, setFileList, onReset, edit = false, loading = false }: UserFormProps) => {
    const [previewImage, setPreviewImage] = React.useState<string>("");
    const [previewVisible, setPreviewVisible] = React.useState<boolean>(false);

    const getBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleCancel = () => setPreviewVisible(true);

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewVisible(true);
        setPreviewImage(file.url || file.preview);
    };

    const handleChange = async (data: any) => {
        const accepts = ["image/gif", "image/jpeg", "image/png", "image/webp"];
        const extensionFile = accepts.map((item) => item.split("image/")[1]);
        if (data.file.size / 1024 / 1024 > 2) {
            message.error("Kích thước ảnh tối đa 2MB");
            return;
        } else if (!accepts.includes(data.file.type)) {
            message.error(`Hình ảnh phải thuộc một trong các định dạng sau: ${extensionFile.join(", ")}`);
            return;
        }

        const files = data.fileList.map((item: any) => {
            if (item.originFileObj) {
                getBase64(item.originFileObj).then((result) => (item.base64 = result));
            }
            return item;
        });
        setFileList(files);
    };

    return (
        <Form layout="vertical" form={form} onFinish={onFinish}>
            <div className="grid">
                <Card className="col-6">
                        <Form.Item label="" style={{ alignItems: "left" }}>
                            <UploadCard beforeUpload={() => false} listType="picture-card" fileList={fileList}
                                onChange={handleChange} onPreview={handlePreview} >
                                {fileList.length >= 1 ? null : <BsPlus size={36} fill="#d9d9d9" />}
                            </UploadCard>
                            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                                <img alt="example" style={{ width: "100%" }} src={previewImage} />
                            </Modal>
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
                </Card>

                <Card className="col-6 ">
                   
                    <Form.Item label="New Password" name="password" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                        <Input.Password placeholder="Nhập vào" />
                    </Form.Item>
                    <Form.Item label="Confirm Password" name="re-password" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                        <Input.Password placeholder="Nhập vào" />
                    </Form.Item>
                    <Form.Item label="Status" name="status">
                        <Select>
                            <Select.Option value="active">Active</Select.Option>
                            <Select.Option value="inactive">inactive</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Chức vụ" name="role">
                        <Select>
                            <Select.Option value="admin">Quản trị viên</Select.Option>
                            <Select.Option value="user">Khach hang</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="address" name="address" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                        <Input placeholder="Nhập vào" />
                    </Form.Item>
                 
                </Card>
                <div className="col-12">
                    <Card style={{ position: "sticky", bottom: "0", left: "0", width: "100%", border: 'none' }}>
                        <div style={{ display: "flex", justifyContent: "start", gap: "5px" }}>
                            {onReset && (
                                <Button htmlType="button" onClick={onReset}>
                                    Nhập lại
                                </Button>
                            )}
                            <Button
                                htmlType={fileList.length > 0 ? "submit" : "button"}
                                onClick={() => fileList.length === 0 && message.error("Vui lòng tải lên ít nhất 1 ảnh")}
                                type="primary"
                                style={{ minWidth: 150 }}
                            >
                                Lưu
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </Form>
    )
}

export default UserForm