import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductByBrands ,createBrands, getAllBrands} from "../../services/brandService";

export const fetchProductByBrand = createAsyncThunk<
  { brand: any; products: any[] },
  string | undefined,
  { rejectValue: string }
>(
  "brands/fetchProductByBrand",
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await getProductByBrands(slug);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const AsyncCreateBrand = createAsyncThunk<any, any, { rejectValue: string }>("brands/CreateBrands",
  async (dataBrand, { rejectWithValue }) => {
    try {
      const { data } = await createBrands(dataBrand);
      console.log('thunk', data);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  });

  export const ListBrands = createAsyncThunk<any, void, { rejectValue: string }>("brands/ListBrands",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getAllBrands();
      return data.brands;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  });