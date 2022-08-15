import { Form, Avatar, Badge, message } from "antd";
import React from "react";
import { useAppSelector } from "../app/stores/hooks";
import { currencyFm } from "../ultils";
import { Divider } from "primereact/divider";
import CheckoutForm from "../components/Form&Table/CheckoutForm";
import * as CS from "../components/styles/customer/CartStyle";
import { useParams } from "react-router-dom";
import { AsyncAddToCart } from "../app/stores/thunks/orderThunk";
import { useAppDispatch } from "../app/stores/hooks"
import { clearCart } from "../app/stores/slices/cartSlice"
import { Link, useNavigate, useSearchParams } from "react-router-dom";
type Props = {};

const Checkout = (props: Props) => {
  const { userId } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { carts } = useAppSelector((state) => state.cartSlice);
  const { userInfo } = useAppSelector((state) => state.authReducer);
  const { errorMessage, isSucess, isFetching, isErr } = useAppSelector((state) => state.orderSlice)
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    document.title = `Checkout`;
    if (userInfo) { form.setFieldsValue({ ...userInfo }) }
  }, [userInfo]);
  const onFinish = async (data: any) => {
    data.products = carts.products;
    data.totalPrice = carts.totalPrice;
    data.users = userId
    dispatch(AsyncAddToCart(data))

    setTimeout(() => {
      message.success("Order thành công")
      navigate("/")
      dispatch(clearCart())
    }, 3000);
   
    ;
  };
  return (
    <>
    {carts.products.length ? (
       <CS.Container>
        <div className="flex border-900 justify-content-between w-full ">
          <div className=" flex-auto">
            <CheckoutForm onFinish={onFinish} form={form} edit={true} />
          </div>
          <div className="flex-1">
            {carts && carts.products.length > 0 ? (
              <>
                {carts?.products.map((item: any, index: any) => (
                  <div className="flex justify-content-between" key={index}>
                    <Badge count={item?.quantity}>
                      <Avatar
                        shape="square"
                        size="large"
                        src={item?.productImage}
                      />
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
      </CS.Container>
    ) : ''}
     
    </>
  );
};

export default Checkout;
