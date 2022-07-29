import { createSlice } from "@reduxjs/toolkit";
import { authAsyncLogin } from "../thunks/authThunk";
import { AuthState } from "../../../types/user.type";
import localStorage from "redux-persist/es/storage";

const initialState: AuthState = {
  userInfo: null,
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      state.accessToken = "";
      localStorage.removeItem('authReducer')
    },
    refreshToken: (state, action) => {
      state.accessToken = action.payload;
  },
  },
  extraReducers: (builder) => {
    builder.addCase(authAsyncLogin.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload.user;
      state.accessToken = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    });
  },
});
export const { clearState, refreshToken} = authSlice.actions;
export default authSlice.reducer;
