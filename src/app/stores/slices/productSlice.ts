import { FetchProductList, AsyncCreateProduct, AsyncDeleteProduct,AsyncUpdateProduct,SearchProduct } from '../thunks/productThunk';
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
      state.products =  state.products.filter(p => p._id !== action.payload._id);
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

    //search
    builder.addCase(SearchProduct.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(SearchProduct.fulfilled, (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    });
    builder.addCase(SearchProduct.rejected, (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    });
  }
 
});

export default productSlice.reducer;