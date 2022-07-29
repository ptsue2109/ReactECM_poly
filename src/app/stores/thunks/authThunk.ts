import { register, signin } from "../../services/auth.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authAsyncRegister = createAsyncThunk<
  { message: string; user: { username: string; email: string; _id: string } },
  any,
  { rejectValue: string }
>("auth/authAsyncRegister", async (registerData, { rejectWithValue }) => {
  try {
    const { data } = await register(registerData);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const authAsyncLogin = createAsyncThunk<
  {
    [x: string]: string | undefined; message: string | undefined; token: string; user: any | null 
},
  any,
  { rejectValue: string }
>("auth/authAsyncLogin", async (loginData, { rejectWithValue }) => {
  try {
    const { data } = await signin(loginData);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
