import {
  FetchCateList,
  fetchAsyncCategorySelected,RemoveCate
} from "../thunks/cateThunk";
import { createSlice } from "@reduxjs/toolkit";

type categoryState = {
  categories: any[];
  category: any | null;
  products: any[];
  isFetching: boolean;
  errorMessage: string | undefined;
};
const initialState: categoryState = {
  categories: [],
  category: null,
  products: [],
  isFetching: false,
  errorMessage: "",
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //list
    builder.addCase(FetchCateList.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(FetchCateList.fulfilled, (state, action) => {
      state.isFetching = false;
      state.categories = action.payload;
    });
    builder.addCase(FetchCateList.rejected, (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    });

    // get product by catename
    builder.addCase(fetchAsyncCategorySelected.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchAsyncCategorySelected.fulfilled, (state, action) => {
      state.isFetching = false;
      state.category = action.payload.category;
      state.products = action.payload.products;
    });
    builder.addCase(fetchAsyncCategorySelected.rejected, (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    });
    
    //remove
    builder.addCase(RemoveCate.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(RemoveCate.fulfilled, (state, action) => {
      state.isFetching = false;
      state.categories = state.categories.filter(item => item._id !== action.payload._id);
    });
    builder.addCase(RemoveCate.rejected, (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    });
  },
});

export default categorySlice.reducer;
