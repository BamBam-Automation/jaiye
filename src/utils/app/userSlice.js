import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: null,
    user: {},
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.data;
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

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
