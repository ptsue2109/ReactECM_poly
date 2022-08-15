import { Form, message } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderForm from "../../../components/Form&Table/OrderForm";
import { useAppSelector, useAppDispatch } from "../../../app/stores/hooks";
import { pageTitle } from "../../../ultils";

interface OrderDetailProps { }

const OrderDetail = (props: OrderDetailProps) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { orderId } = useParams<{ orderId: string }>();
    const { orders, orderDeleted } = useAppSelector(state => state.orderSlice);

    const orderSelect = orders.find((item) => item._id === orderId) || orderDeleted.find((item) => item._id === orderId);
    React.useEffect(() => {
        document.title = `Admin | Edit ${orderSelect?.orderCode}`;
        pageTitle(`Edit Order`);
        if (orderSelect) {
            form.setFieldsValue({ ...orderSelect, ...orderSelect.shippingInfo });
        }
    }, [orderSelect]);
    const onFinish = (data: any) => {
    };

    return (
        <>

            <OrderForm form={form} onFinish={onFinish} />
        </>
    );
};

export default OrderDetail;