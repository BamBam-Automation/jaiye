import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("username", action.payload.username);
      sessionStorage.setItem("usermail", action.payload.email);
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("username", action.payload.username);
      sessionStorage.setItem("usermail", action.payload.email);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      sessionStorage.clear();
      state.user = {};
    },
  },
});

export const { login, loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;
