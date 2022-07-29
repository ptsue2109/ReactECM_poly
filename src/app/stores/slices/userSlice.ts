import { AsyncFetchUserList,AsyncDeleteUser } from "../thunks/userThunk";
import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  users: any[];
  isFetching: boolean;
  errorMessage: string | undefined;
};

const initialState: UserState = {
  users: [],
  isFetching: false,
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
    });
    builder.addCase(AsyncFetchUserList.fulfilled, (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    });
    builder.addCase(AsyncFetchUserList.rejected, (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    });

    //delete
    builder.addCase(AsyncDeleteUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(AsyncDeleteUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.users = state.users.filter(item => item._id !== action.payload._id);
    });
    builder.addCase(AsyncDeleteUser.rejected, (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    });
  },
});

export default userSlice.reducer;
