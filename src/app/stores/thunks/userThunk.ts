import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUser, createUser ,removeUser} from "../../services/user.service";

export const AsyncFetchUserList = createAsyncThunk<any[], void, { rejectValue: string }>("users/AsyncFetchUserList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getAllUser();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  });

  // export const AsyncDeleteUser = createAsyncThunk<any[], string | undefined, { rejectValue: string }>("users/AsyncDeleteUser",
  // async (_id, { rejectWithValue }) => {
  //   try {
  //     const { data } = await removeUser(_id);
  //     return data;
  //   } catch (error: any) {
  //     return rejectWithValue(error.response.data.message);
  //   }
  // });

  export const AsyncDeleteUser = createAsyncThunk<any, string | undefined, { rejectValue: string }>("user/AsyncRemoveUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await removeUser(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  });