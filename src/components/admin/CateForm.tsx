import React from 'react'
import styled from "styled-components";
import { BsPlus } from "react-icons/bs";
import { Button, Card, Form, FormInstance, Input, InputNumber, message, Modal, Select, Tabs, Upload } from "antd";
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


interface CateFormProps {
    form: FormInstance<any>;
    onFinish: (values: any) => void;
    fileList: any[];
    setFileList: React.Dispatch<any>;
    onReset?: () => void;
    edit?: boolean;
    loading?: boolean;
}
type Props = {}

const CateForm = ({ fileList, form, onFinish, setFileList, onReset, edit = false, loading = false }: CateFormProps) => {
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

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewVisible(true);
        setPreviewImage(file.url || file.preview);
    };

    const handleChange = async (data: any) => {
        const accepts = ["image/gif", "image/jpeg", "image/png"];
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

    const setText = (data: any) => {
        console.log();

    }
    return (
        <Form layout="vertical" form={form} onFinish={onFinish}>
            <div className="grid">
                <Card style={{ marginBottom: 16, border: 'none' }} className="col-6">
                    <>
                        <Form.Item label="Ảnh chi tiết" style={{ alignItems: "left" }}>
                            <UploadCard beforeUpload={() => false} listType="picture-card"  fileList={fileList} onPreview={handlePreview} onChange={handleChange}>
                                {fileList.length >= 2 ? null : <BsPlus size={36} fill="#d9d9d9" />}
                            </UploadCard>
                            <Modal visible={previewVisible}  footer={null} onCancel={handleCancel}>
                                <img alt="example" style={{ width: "100%" }} src={previewImage} />
                            </Modal>
                        </Form.Item>
                        <Form.Item label="Tên danh mục" name="cateName" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                            <Input placeholder="Nhập vào" />
                        </Form.Item>
                        <Form.Item label="Trạng Thái" name="status">
                            <Select placeholder="Lựa chọn" allowClear showSearch optionFilterProp="children">
                                <Select.Option value='hidden'>Ẩn danh mục</Select.Option>
                                <Select.Option value='active'>Hiển thị danh mục</Select.Option>
                            </Select>
                        </Form.Item>
                    </>
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

export default CateForm