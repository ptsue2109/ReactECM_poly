import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAll, createProducts, removeProduct , updateProduct} from "../../services/product.service";

export const FetchProductList = createAsyncThunk<any, void, { rejectValue: string }>("products/FetchProductList",
  async (_, { rejectWithValue }) => {
    try {
      const { data} = await getAll();
      return data.items;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  });

export const AsyncCreateProduct = createAsyncThunk<any, any, { rejectValue: string }>("products/CreateProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const {data} = await createProducts(productData);
      return data.data;
    } catch (error: any) {
      console.log('errorMessage ',error.response.data.message);
      
      return rejectWithValue(error.response.data.message);
    }
  });


  export const AsyncDeleteProduct = createAsyncThunk<any, string, { rejectValue: string }>
    ("products/AsyncDeleteProduct", async (_id, { rejectWithValue }) => {
    try {
      const {data}  = await removeProduct(_id);
      console.log('item deleted',data);
      return data;
    } catch (error: any) {
      console.log('errorMessage ',error);
      return rejectWithValue(error);
    }
  });

  export const AsyncUpdateProduct = createAsyncThunk<any, any, { rejectValue: string }>("products/AsyncUpdateProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const { data } = await updateProduct(productData);
            return data;
    } catch (error: any) {
      console.log('error',error);
      return rejectWithValue(error.response.data.message);
    }
  });