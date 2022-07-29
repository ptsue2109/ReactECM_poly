import { createAsyncThunk } from "@reduxjs/toolkit";
import {customAddToCart} from "../../services/orderService";

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

