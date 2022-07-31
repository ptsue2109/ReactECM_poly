import { AsyncAddToCart } from "../thunks/orderThunk";
import { createSlice } from "@reduxjs/toolkit";

type OrderState = {
  orders: any[];
  products: any[];
  isFetching: boolean;
  errorMessage: string | undefined;
};

const initialState: OrderState = {
  orders: [],
  products: [],
  isFetching: false,
  errorMessage: "",
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    userAddCart: (state:any, action: any) => {
      let itemIndex: any = state.carts.products.findIndex(
          (item:any) =>
              item.product === action.payload.products.product
      );
      console.log('chek',itemIndex);
      
      if (itemIndex! > -1) {
          let productItem = state.carts.products[itemIndex];
          productItem.quantity += action.payload.products.quantity;
          productItem.cost = productItem.quantity * productItem.cost;
          productItem.price = productItem.quantity * productItem.productPrice;
          state.carts.products[itemIndex] = productItem;
      } else {
          state.carts.products.push({ ...action.payload.products });
      }

      let cartTotal = 0;
      state.carts.products.forEach((item:any) => {
          if (item.cost > 0) {
              cartTotal += item.cost;
          } else {
              cartTotal += item.price;
          }
      });
      state.carts.totalPrice = cartTotal;
  },
  },
  extraReducers(builder) {
    //create
    // builder.addCase(AsyncAddToCart.pending, (state, action) => {
    //   state.isFetching = true;
    // });
    // builder.addCase(AsyncAddToCart.fulfilled, (state, action) => {
    //   state.isFetching = false;
    //   state.orders.push(action.payload);
    // });
    // builder.addCase(AsyncAddToCart.rejected, (state, action) => {
    //   state.isFetching = false;
    //   state.errorMessage = action.payload;
    // });
  },
});
export const {  userAddCart } = orderSlice.actions;
export default orderSlice.reducer;
