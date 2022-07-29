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
  reducers: {},
  extraReducers(builder) {
    //create
    builder.addCase(AsyncAddToCart.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(AsyncAddToCart.fulfilled, (state, action) => {
      state.isFetching = false;
      state.orders.push(action.payload);
    });
    builder.addCase(AsyncAddToCart.rejected, (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    });
  },
});

export default orderSlice.reducer;
