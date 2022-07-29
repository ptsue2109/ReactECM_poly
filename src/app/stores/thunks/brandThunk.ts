import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductByBrands ,createBrands} from "../../services/brandService";

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

export const AsyncCreateBrand = createAsyncThunk<any, any, { rejectValue: string }>("brands/AsyncCreateBrands",
  async (dataBrand, { rejectWithValue }) => {
    try {
      const { data } = await createBrands(dataBrand);
      console.log('thunk', data);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  });