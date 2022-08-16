import { createSlice } from '@reduxjs/toolkit';
import { AsyncAddToCart, FetchOrderList, ChangeStatusOrder, FetchOrderDeletedList, SoftDel, Restore, UserOrderList } from "../thunks/orderThunk";


type OrderState = {
  orders: any[],
  userOrder: any[],
  userOrderDel: any[],
  orderDeleted: any[],
  isFetching: boolean;
  isSucess: boolean;
  isErr: boolean;
  errorMessage: string | undefined;
}
const initialState: OrderState = {
  orders: [],
  orderDeleted: [],
  userOrder: [],
  userOrderDel: [],
  isFetching: false,
  isSucess: false,
  isErr: false,
  errorMessage: "",
}
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    //list all orders
    builder.addCase(FetchOrderList.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(FetchOrderList.fulfilled, (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
    });

    //list all deleted ordẻ
    builder.addCase(FetchOrderDeletedList.fulfilled, (state, action) => {
      state.isFetching = false;
      state.orderDeleted = action.payload;
    });

    //softDelete
    builder.addCase(SoftDel.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(SoftDel.fulfilled, (state, action) => {
      state.isFetching = false;
      state.orders = state.orders.filter(p => p._id !== action.meta.arg);
      state.userOrder = state.userOrder.filter(p => p._id !== action.meta.arg);
      state.orderDeleted.push(...action.payload);

      //user-delete
      state.userOrderDel.push(...action.payload)
      state.userOrderDel = state.userOrderDel.filter(p => p._id !== action.meta.arg);
      state.userOrderDel.push(...action.payload)
    });

    //create
    builder.addCase(AsyncAddToCart.pending, (state, action) => {
      state.isFetching = true;
      state.isSucess = false;
      state.isErr = false;
    });
    builder.addCase(AsyncAddToCart.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSucess = true;
      state.isErr = false;
      state.orders.push(action.payload);
    });
    builder.addCase(AsyncAddToCart.rejected, (state, action) => {
      state.isFetching = false;
      state.isSucess = false;
      state.isErr = true;
      state.errorMessage = action.payload;
    });

    //changeStatus
    builder.addCase(ChangeStatusOrder.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(ChangeStatusOrder.fulfilled, (state, action) => {
      state.isFetching = false;
      state.orders = action.payload
    });

    //restore
    builder.addCase(Restore.fulfilled, (state, action) => {
      state.isFetching = false;
      state.orderDeleted = state.orderDeleted.filter(p => p._id !== action.meta.arg);
      state.orders.push(...action.payload);

    });

    //userOrdeList
    builder.addCase(UserOrderList.fulfilled, (state, action) => {
      state.isFetching = false;
      state.userOrder = action.payload.orders;
      state.userOrderDel = action.payload.orderDeleted
    });
  }

});

export default orderSlice.reducer;
