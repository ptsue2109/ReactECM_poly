import {
    AsyncCreateBrand,
    fetchProductByBrand,
    ListBrands
  } from "../thunks/brandThunk";
  import { createSlice } from "@reduxjs/toolkit";
  
  type brandState = {
    brands: any[];
    brand: any | null;
    products: any[];
    isFetching: boolean;
    errorMessage: string | undefined;
  };
  const initialState: brandState = {
    brands: [],
    brand: null,
    products: [],
    isFetching: false,
    errorMessage: "",
  };
  
  const brandSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
  
      // get product by brandSlug
      builder.addCase(fetchProductByBrand.pending, (state) => {
        state.isFetching = true;
      });
      builder.addCase(fetchProductByBrand.fulfilled, (state, action) => {
        state.isFetching = false;
        state.brand = action.payload.brand;
        state.products = action.payload.products;
      });
      builder.addCase(fetchProductByBrand.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });

      //createBrand
      builder.addCase(AsyncCreateBrand.pending, (state,action) => {
        state.isFetching = true;
      });
      builder.addCase(AsyncCreateBrand.fulfilled, (state, action) => {
        state.isFetching = false;
        state.brands.push(action.payload);
      });
      builder.addCase(AsyncCreateBrand.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });
      //list
      builder.addCase(ListBrands.pending, (state) => {
        state.isFetching = true;
      });
      builder.addCase(ListBrands.fulfilled, (state, action) => {
        state.isFetching = false;      
        state.brands = action.payload;
      });
      builder.addCase(ListBrands.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });
    },
  });
  
  export default brandSlice.reducer;
  