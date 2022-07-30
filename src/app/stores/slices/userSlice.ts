import {
  AsyncFetchUserList,
  AsyncDeleteUser,
  CreateUsers,
  UpdateUser,
} from "../thunks/userThunk";
import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  users: any[];
  isFetching: boolean;
  isSucess: boolean;
  isErr : boolean;
  errorMessage: string | undefined;
};

const initialState: UserState = {
  users: [],
  isFetching: false,
  isSucess: false,
  isErr:false,
  errorMessage: "",
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // lisst
    builder.addCase(AsyncFetchUserList.pending, (state) => {
      state.isFetching = true;
      state.isSucess = false;
    });
    builder.addCase(AsyncFetchUserList.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSucess = false;
      state.users = action.payload;
    });
    builder.addCase(AsyncFetchUserList.rejected, (state, action) => {
      state.isFetching = false;
      state.isSucess = false;
      state.errorMessage = action.payload;
    });

    //delete
    builder.addCase(AsyncDeleteUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(AsyncDeleteUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.users = state.users.filter(
        (item) => item._id !== action.payload._id
      );
    });
    builder.addCase(AsyncDeleteUser.rejected, (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    });

    //create
    builder.addCase(CreateUsers.pending, (state, action) => {
      state.isFetching = true;
      state.isSucess = false;
      state.isErr = false;
    });
    builder.addCase(CreateUsers.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSucess = true;
      state.isErr = false;
      state.users.push(action.payload);
    });
    builder.addCase(CreateUsers.rejected, (state, action) => {
      state.isFetching = false;
      state.isSucess = false;
      state.isErr = true;
      state.errorMessage = action.payload;
    });
    //update
    builder.addCase(UpdateUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(UpdateUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.users = state.users.map((item) =>
        item._id !== action.payload._id ? item : action.payload
      );
    });
    builder.addCase(UpdateUser.rejected, (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    });
  },
});

export default userSlice.reducer;
