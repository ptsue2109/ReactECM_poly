import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHomeData } from "../../services/home.service";

interface HomeState {
  categories: any[];
  products: any[];
  newProducts: any[];
  users: any[];
  brands: any[];
  sliders: any[];
  errorMessage: string | undefined;
  isFetching: boolean;
}

const initialState: HomeState = {
  categories: [],
  products: [],
  newProducts: [],
  users: [],
  brands: [],
  sliders: [],
  errorMessage: "",
  isFetching: false,
};

export const fetchHomeData = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("home/fetchHomeData", async (_, { rejectWithValue }) => {
  try {
    const { data } = await getHomeData();
    console.log("homedata", data);

    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.error);
  }
});

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHomeData.fulfilled, (state, action) => {
      state.categories = action.payload.categories;
      state.products = action.payload.products;
      state.newProducts = action.payload.newProducts;
      state.users = action.payload.user;
      state.brands = action.payload.brands;
      state.sliders = action.payload.sliders;
    });
    builder.addCase(fetchHomeData.rejected, (state, action) => {
      state.errorMessage = action.payload;
    });
  },
});

export default homeSlice.reducer;
