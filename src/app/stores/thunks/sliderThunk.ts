import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAll, createSlider, removeSlider, updateSlider } from "../../services/slider.service";

export const AsyncFetchSliders = createAsyncThunk<any[], void, { rejectValue: string }>("sliders/FetchSliderList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getAll();
      return data.sliders;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  });

export const CreateSliders = createAsyncThunk<any, any, { rejectValue: string }>("sliders/CreateSliders",
  async (selectedData, { rejectWithValue }) => {
    try {
      const { data } = await (createSlider(selectedData));
      return data;
    } catch (error: any) {
      console.log('create fayk',error.response.data.message);
      
      return rejectWithValue(error.response.data.message);
    }
  });

export const RemoveSlider = createAsyncThunk<any, string | undefined, { rejectValue: string }>("sliders/RemoveSlider",
  async (_id, { rejectWithValue }) => {
    try {
      const { data } = await removeSlider(_id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  });

export const UpdateSlider = createAsyncThunk<any, any, { rejectValue: string }>("sliders/UpdateSlider",
  async (sliderData, { rejectWithValue }) => {
    try {
      const { data } = await updateSlider(sliderData);
      return data;
    } catch (error: any) {
      console.log('error', error);
      return rejectWithValue(error.response.data.message);
    }
  });