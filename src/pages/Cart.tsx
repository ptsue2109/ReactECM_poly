import React from "react";
import { Button, Popconfirm, InputNumber, message, Table, Divider, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import { BsFillCartXFill, BsPlus, BsCloudMinus } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../app/stores/hooks";
import { currencyFm } from "../ultils"
import { changeCartQuantity, removeCartItem } from "../app/stores/slices/orderSlice";
interface CartProps { }

const Cart = (props: CartProps) => {
   const dispatch = useAppDispatch();
   const { carts } = useAppSelector((state) => state.orderSlice);
   const [quantity, setQuantity] = React.useState(0)
   console.log('carts', carts);

   const { userInfo } = useAppSelector((state) => state.authReducer)
   const changeQuantity = (quantity: number, index: number) => {
      dispatch(changeCartQuantity({ quantity, index }));
      message.success("Thay đổi số lượng thành công");
   };
   return (
      <div className="ms-wrapper mini">
         <div className="ms-card">
            <div className="ms-card-head">
               <div className="ms-card-title">Có {carts.products.length} sản phẩm trong giỏ hàng</div>
            </div>
            {carts.products.length > 0 ? (

               <div className="ms-card-body">
                  <div className="ms-cart__product">
                     {carts.products.map((item: any, index: any) => (
                        <div className="ms-cart__product-item" key={index}>
                           <div className="ms-cart__product-item-img">
                              <img src={item.productImage} />
                           </div>
                           <div className="ms-cart__product-item-info">
                              <div className="ms-cart__product-item-info-quantity">
                                 <InputNumber min={1} max={item.stock} value={item.quantity} onChange={(value: number) => changeQuantity(value, index)} />
                                 <Popconfirm title={`delte ${item.productName}`} okText="yes" cancelText="no" onConfirm={() => {
                                    dispatch(removeCartItem(index))
                                 }}>
                                    <Button size="small">
                                       <BiTrash /> Xoá
                                    </Button>

                                 </Popconfirm>
                              </div>
                              <div className="ms-cart__product-item-info-price">
                                 {item.productCost === undefined || item.productCost === null || item.cost === undefined || item.cost === null ? (
                                    <div className="cs-price--main">{currencyFm.format(item?.price)}</div>
                                 ) : (
                                    <>
                                       <div className="cs-price--main">{currencyFm.format(item?.cost)}</div>
                                       <div className="cs-price--sub">{item?.price ? currencyFm.format(item?.price) : ''}</div>
                                    </>
                                 )}
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="ms-card-info">

                     <div className="ms-cart-total">
                        <p className="ms-cart-total-normal">
                           <span>Tổng tiền:</span>
                           <span>{currencyFm.format(carts?.totalPrice)}</span>
                        </p>
                        <p className="ms-cart-total-lg">
                           <span>Cần thanh toán:</span>
                           <span>{currencyFm.format(carts?.totalPrice)}</span>
                        </p>
                        <div className="ms-cart-button">
                           <Link to={`/checkout/${userInfo?._id}`} type="primary">
                              Hoàn tất đặt hàng
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="ms-cart-empty">
                  <BsFillCartXFill />
                  <div className="text">Không có sản phẩm nào trong giỏ hàng</div>
                  <Link to="/">
                     <Button type="primary" size="large">
                        Về trang chủ
                     </Button>
                  </Link>
               </div>
            )}
         </div>
      </div>


   );
};

export default Cart;
