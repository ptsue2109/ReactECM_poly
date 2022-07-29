import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAll, createCate, removeCate, getProductByCate } from "../../services/cate.service";

export const FetchCateList = createAsyncThunk<any, void, { rejectValue: string }>("categories/FetchCateList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getAll();
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  });


  export const fetchAsyncCategorySelected = createAsyncThunk<{ category: any; products: any[] }, string | undefined,
   { rejectValue: string }>(
    "categories/fetchAsyncCategorySelected",
    async (slug, { rejectWithValue }) => {
        try {
            const { data } = await getProductByCate(slug);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
  );

  export const AsyncCreateCategories = createAsyncThunk<any, any, { rejectValue: string }>("categories/AsyncCreateCategories",
  async (newData, { rejectWithValue }) => {
    try {
      const { data } = await createCate(newData);
      console.log('thunk',data);
      
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  });