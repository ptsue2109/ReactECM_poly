import { createAsyncThunk } from "@reduxjs/toolkit";
import { customAddToCart, getAllOrder, changeOrderStatus, getAllOrderDeleteted, softDeleteOrder, restore, usersOrderList } from "../../services/orderService";

export const AsyncAddToCart = createAsyncThunk<any, any, { rejectValue: string }>("orders/AsyncAddToCart",
  async (dataOrder, { rejectWithValue }) => {
    try {
      const { data } = await customAddToCart(dataOrder);
      console.log(data);

      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });

export const FetchOrderList = createAsyncThunk<any, void, { rejectValue: string }>("orders/FetchOrderList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getAllOrder();
      return data.orders;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  });

export const FetchOrderDeletedList = createAsyncThunk<any, void, { rejectValue: string }>("orders/FetchOrderDeletedList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getAllOrderDeleteted();
      console.log('getAllOrderDeleteted',data);
      return data.orders;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  });



export const ChangeStatusOrder = createAsyncThunk<any, any, { rejectValue: string }>("orders/ChangeStatusOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const data = await changeOrderStatus(orderId);
      console.log('dataStatus', data)
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });


export const SoftDel = createAsyncThunk<any, any, { rejectValue: string }>("orders/SoftDel",
  async (_id, { rejectWithValue }) => {
    try {
      const { data } = await softDeleteOrder(_id);
      console.log('data SoftDel',data);
      
      return data.orderDel;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  });

export const Restore = createAsyncThunk<any, any, { rejectValue: string }>("orders/Restore",
  async (_id, { rejectWithValue }) => {
    try {
      const { data } = await restore(_id);
      return data.orderTarget;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  });

  export const UserOrderList = createAsyncThunk<any, any, { rejectValue: string }>("orders/UserOrderList",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await usersOrderList(userId);
      console.log('all user order', data);
      
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  });