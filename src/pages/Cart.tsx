import React from "react";
import { Popconfirm, InputNumber, message, Table, Empty, Form, Input, Card } from "antd";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { ImCross, ImArrowLeft2 } from "react-icons/im";
import { useAppDispatch, useAppSelector } from "../app/stores/hooks";
import { currencyFm, calSalePercent } from "../ultils"
import { changeCartQuantity, removeCartItem } from "../app/stores/slices/cartSlice";
import * as CS from "../components/styles/customer/CartStyle";
interface CartProps { }

const Cart = (props: CartProps) => {
  const dispatch = useAppDispatch();
  const { carts } = useAppSelector((state) => state.cartSlice);
  const { userInfo } = useAppSelector((state) => state.authReducer);
  document.title = `Cart`;
  const changeQuantity = (quantity: number, index: number) => {
    dispatch(changeCartQuantity({ quantity, index }));
    message.success("Thay đổi số lượng thành công");
  };
  return (
    <CS.Container>
      <CS.Header>
        <Link to="/">
          <ImArrowLeft2 />
          Trở về
        </Link>
        <span>Giỏ hàng</span>
      </CS.Header>
      {carts.products.length ? (
        carts.products.map((item: any, index: any) => (
          <CS.BoxItem key={index}>
            <CS.BoxImage src={item.productImage} />
            <CS.BoxContent>
              <div className="close-btn">
                <Popconfirm title={`delte ${item.productName}`} okText="OK" onConfirm={() => { dispatch(removeCartItem(index)); message.success('Xóa thành công ') }}>
                  <span>
                    <ImCross width={12} height={12} />
                  </span>
                </Popconfirm>
              </div>
              <div className="title">{item.productName}</div>
              <div className="price">
                {item.price ? (
                  <>
                     <div className="price-old">
                      {currencyFm.format(item.cost)}
                    </div>
                    <div className="price-sale">
                      {currencyFm.format(item.price)}
                    </div>
                    <div className="price-percent">
                      Giảm {calSalePercent(item.cost, item.price)}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="price-old">
                      {currencyFm.format(item.productCost)}
                    </div>
                    <div className="price-sale">
                      {currencyFm.format(item.cost)}
                    </div>
                  </>
                )}
              </div>
              <div className="amount">
                <span>Chọn số lượng:</span>
                <InputNumber min={1} max={item.stock} value={item.quantity} onChange={(value: number) => changeQuantity(value, index)} />
              </div>
              <CS.Description>Thu cũ đổi mới - Trợ giá đến 300.000đ</CS.Description>
            </CS.BoxContent>
          </CS.BoxItem>
        ))
      ) : (
        <Empty description={false} />
      )}
      <CS.TotalPrice>
        <span>Tổng tiền tạm tính:</span>
        <h2>{currencyFm.format(carts.totalPrice)}</h2>
      </CS.TotalPrice>
      <CS.ButtonGroup>
        <Button className="p-button-danger p-button-outlined" disabled={carts.products.length ? false : true} >
          <Link to={`/checkout/${userInfo?._id}`} className="text-color">Tiến hành đặt hàng</Link>
        </Button>
        <Button className="p-button-danger">
          <Link to="/" className="text-white">Chọn thêm sản phẩm khác</Link>
        </Button>
      </CS.ButtonGroup>
    </CS.Container>
  );
};

export default Cart;
