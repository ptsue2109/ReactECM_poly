import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUser, createUser, removeUser, updateUser,changePW } from "../../services/user.service";

export const AsyncFetchUserList = createAsyncThunk<any[], void, { rejectValue: string }>("users/AsyncFetchUserList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getAllUser();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  });

export const CreateUsers = createAsyncThunk<any, any, { rejectValue: string }>("users/CreateUsers",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await (createUser(userData));
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  });

export const AsyncDeleteUser = createAsyncThunk<any, string | undefined, { rejectValue: string }>("user/AsyncRemoveUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await removeUser(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  });

export const UpdateUser = createAsyncThunk<any, any, { rejectValue: string }>("users/UpdateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await updateUser(userData);
      return data;
    } catch (error: any) {
      console.log('error', error);
      return rejectWithValue(error.response.data.message);
    }
  });

  export const UpdatePassword = createAsyncThunk<any, any, { rejectValue: string }>("users/UpdatePassword",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await changePW(userData);
      return data;
    } catch (error: any) {
      console.log('error', error);
      return rejectWithValue(error.response.data.message);
    }
  });