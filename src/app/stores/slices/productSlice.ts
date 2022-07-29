import { FetchProductList, AsyncCreateProduct, AsyncDeleteProduct,AsyncUpdateProduct } from '../thunks/productThunk';
import { createSlice } from '@reduxjs/toolkit';

type ProductState = {
  products: any[],
  currentProduct: any | null,
  isFetching: boolean,
  isErr:boolean,
  errorMessage: string | undefined,
}
const initialState: ProductState = {
  products: [],
  currentProduct: null,
  isFetching: false,
  isErr: false,
  errorMessage: "",
}
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //list
    builder.addCase(FetchProductList.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(FetchProductList.fulfilled, (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    });
    builder.addCase(FetchProductList.rejected, (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    });
    //create
    builder.addCase(AsyncCreateProduct.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(AsyncCreateProduct.fulfilled, (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    });
    builder.addCase(AsyncCreateProduct.rejected, (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    });
    //delete

    builder.addCase(AsyncDeleteProduct.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(AsyncDeleteProduct.fulfilled, (state, action) => {
      state.isFetching = false;
      console.log('load',state.products);
      state.products = state.products.filter(item => item._id !== action.payload);
    });
    builder.addCase(AsyncDeleteProduct.rejected, (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    });

    //update
    builder.addCase(AsyncUpdateProduct.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(AsyncUpdateProduct.fulfilled, (state, action) => {
      state.isFetching = false;
      state.products = state.products.map(item => (item._id !== action.payload._id ? item : action.payload));
    });
    builder.addCase(AsyncUpdateProduct.rejected, (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    });
  }
 
});

export default productSlice.reducer;