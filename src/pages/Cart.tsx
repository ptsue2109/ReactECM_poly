import React from "react";
import { Button, Popconfirm, InputNumber, message, Table, Empty, Form, Input, Card } from "antd";
import { Link } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import { BsFillCartXFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { useAppDispatch, useAppSelector } from "../app/stores/hooks";
import { currencyFm } from "../ultils"
import { changeCartQuantity, removeCartItem } from "../app/stores/slices/orderSlice";
import * as S from "../components/styles/customer/CartStyle";

import { useDispatch, useSelector } from "react-redux";

interface CartProps { }

const Cart = (props: CartProps) => {
   const dispatch = useAppDispatch();
   const { carts } = useAppSelector((state) => state.orderSlice);
   const { userInfo } = useAppSelector((state) => state.authReducer);
   const changeQuantity = (quantity: number, index: number) => {
      dispatch(changeCartQuantity({ quantity, index }));
      message.success("Thay đổi số lượng thành công");
   };
   return (
      // <S.Container>
      //    <S.Header>
      //       <Link to="/">
      //          Trở về
      //       </Link>
      //       <span>Giỏ hàng</span>
      //    </S.Header>
      //    {carts?.products.length > 0 ? (

      //       <div className="cart-body">
      //          <div className="cart__product">
      //             {carts.products.map((item: any, index: any) => (
      //                <S.BoxItem key={index}>
      //                   <S.BoxImage src={item.productImage} />
      //                   <S.BoxContent>
      //                      <div className="close-btn">
      //                         <Popconfirm title={`delte ${item.productName}`} okText="OK" onConfirm={() => { dispatch(removeCartItem(index)) }}>
      //                         <span>
      //                            <ImCross width={12} height={12} />
      //                            </span>
      //                         </Popconfirm>
      //                      </div>
      //                      <div className="">
      //                         <InputNumber min={1} max={item.stock} value={item.quantity} onChange={(value: number) => changeQuantity(value, index)} />
                              
      //                      </div>
      //                      <div className="">
      //                         {item.productCost === undefined || item.productCost === null || item.cost === undefined || item.cost === null ? (
      //                            <div className="cs-price--main">{currencyFm.format(item?.price)}</div>
      //                         ) : (
      //                            <>
      //                               <div className="cs-price--main">{currencyFm.format(item?.cost)}</div>
      //                               <div className="cs-price--sub">{item?.price ? currencyFm.format(item?.price) : ''}</div>
      //                            </>
      //                         )}
      //                      </div>
      //                   </S.BoxContent>
      //                </S.BoxItem>
      //             ))}
      //          </div>
      //       </div>
      //    ) : (
      //       <Empty description={false} />
      //    )}
      //    <S.TotalPrice>
      //       <span>Tổng tiền tạm tính:</span>
      //       <h2>{currencyFm.format(carts.totalPrice)}</h2>
      //    </S.TotalPrice>
      //    <S.ButtonGroup>
      //       <Button type="primary" danger>
      //          Tiến hành đặt hàng
      //       </Button>
      //       <Button danger>
      //          <Link to="/">Chọn thêm sản phẩm khác</Link>
      //       </Button>
      //    </S.ButtonGroup>
      // </S.Container>
      <S.Container>
      <S.Header>
        <Link to="/">
          <BsFillCartXFill />
          Trở về
        </Link>
        <span>Giỏ hàng</span>
      </S.Header>
      {carts.products.length ? (
        carts.products.map((item:any, index:any) => (
          <S.BoxItem key={index}>
            <S.BoxImage src={item.productImage} />
            <S.BoxContent>
              <div className="close-btn">
                <Popconfirm
                  title="Bạn có đồng ý xóa sản phẩm?"
                  
                  okText="Đồng ý"
                  cancelText="Hủy"
                  placement="bottom"
                >
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
                      {currencyFm.format(item.price)}
                    </div>
                    <div className="price-sale">
                      {currencyFm.format(item.price)}
                    </div>
                    <div className="price-percent">
                      {/* Giảm {utils.salePercent(product.price, product.new_price)} */}
                    </div>
                  </>
                ) : (
                  <div className="price-old">
                    {currencyFm.format(item.cost)}
                  </div>
                )}
              </div>
              <div className="amount">
                <span>Chọn số lượng:</span>
                <InputNumber min={1} max={item.stock} value={item.quantity} onChange={(value: number) => changeQuantity(value, index)} />
              </div>
              <S.Description>[HOT] Thu cũ lên đời giá cao - Thủ tục nhanh - Trợ giá lên tới 1.000.000đ</S.Description>
            </S.BoxContent>
          </S.BoxItem>
        ))
      ) : (
        <Empty description={false} />
      )}
      <S.TotalPrice>
        <span>Tổng tiền tạm tính:</span>
        <h2>{currencyFm.format(carts.totalPrice)}</h2>
      </S.TotalPrice>
      <S.ButtonGroup>
        <Button type="primary" danger>
          Tiến hành đặt hàng
        </Button>
        <Button danger>
          <Link to="/">Chọn thêm sản phẩm khác</Link>
        </Button>
      </S.ButtonGroup>
    </S.Container>
   );
};

export default Cart;
